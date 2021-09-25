import { siciliansTechTree } from "../../constants";
import { conversionCycleTime } from "../../constants/game.const";
import { monasteryUnits, monasteryUpgrade } from "../../constants/techs/monastery-techs.const";
import { Bonus } from "../../models/bonus.model";
import { CapacityId, ConvertionCapacity } from "../../models/capacity.model";
import { CalculatedStats, CombatStatCompared, StatCompared } from "../../models/stats-calculation.model";
import { ArmorType, Effect } from "../../models/techs.model";
import { Unit, AttackType, CombatStat } from "../../models/unit.model";
import { Upgrade } from "../../models/upgrade.model";
import { multiplyNumber, roundHundredth } from "../../utils/utils";

const monkHealingSpeed = 2.5 // in HP/s

class UnitCalculatorService {

    calculateStats(unit1: Unit, unit2: Unit, upgrades1: Upgrade[], upgrades2: Upgrade[], bonuses1: Bonus[], bonuses2: Bonus[]): CalculatedStats {
        this.applyUpgrades(unit1, unit2, upgrades1, upgrades2)
        this.applyBonus(unit1, unit2, upgrades1, upgrades2, bonuses1, bonuses2)

        const totalCost1 = unit1.cost.wood + unit1.cost.food + unit1.cost.gold + unit1.cost.stone
        const totalCost2 = unit2.cost.wood + unit2.cost.food + unit2.cost.gold + unit2.cost.stone

        const secondaryAttackCount1 = unit1.stats.secondaryAttack?.count || 0
        const secondaryAttackCount2 = unit2.stats.secondaryAttack?.count || 0

        const composedDamageDealtPerHit1 = this.calculateDamageDealtComponentsPerHit(unit1.stats.attackComponents, unit2.stats.armorComponents)
        const composedDamageDealtPerHit2 = this.calculateDamageDealtComponentsPerHit(unit2.stats.attackComponents, unit1.stats.armorComponents)
        const composedSecondaryDamageDealtPerHit1 = this.calculateDamageDealtComponentsPerHit(unit1.stats.secondaryAttack?.components || [], unit2.stats.armorComponents)
        const composedSecondaryDamageDealtPerHit2 = this.calculateDamageDealtComponentsPerHit(unit2.stats.secondaryAttack?.components || [], unit1.stats.armorComponents)
        const damageDealtPerHit1 = unit1.stats.attackComponents.length ? this.calculateDamageDealtPerHit(composedDamageDealtPerHit1, { count: secondaryAttackCount1, composedSecondaryDamageDealtPerHit: composedSecondaryDamageDealtPerHit1}) : 0
        const damageDealtPerHit2 = unit2.stats.attackComponents.length ? this.calculateDamageDealtPerHit(composedDamageDealtPerHit2, { count: secondaryAttackCount2, composedSecondaryDamageDealtPerHit: composedSecondaryDamageDealtPerHit2}) : 0

        const damagePerSecond1 = unit1.stats.attackRate ? unit1.stats.attackRate * damageDealtPerHit1 : 0
        const damagePerSecond2 = unit2.stats.attackRate ? unit2.stats.attackRate * damageDealtPerHit2 : 0

        const damagePerSecondWithAccuracyHigh1 = unit1.stats.attackType === AttackType.projectile ? damagePerSecond1 * (unit1.stats.accuracy || 1) + damagePerSecond1 / 2 * (1 - (unit1.stats.accuracy || 1)) : damagePerSecond1
        const damagePerSecondWithAccuracyHigh2 = unit2.stats.attackType === AttackType.projectile ? damagePerSecond2 * (unit2.stats.accuracy || 1) + damagePerSecond2 / 2 * (1 - (unit2.stats.accuracy || 1)) : damagePerSecond2

        const damagePerSecondWithAccuracyLow1 = unit1.stats.attackType === AttackType.projectile ? damagePerSecond1 * (unit1.stats.accuracy || 1) : damagePerSecond1
        const damagePerSecondWithAccuracyLow2 = unit2.stats.attackType === AttackType.projectile ? damagePerSecond2 * (unit2.stats.accuracy || 1) : damagePerSecond2

        const numberOfHitToKill1 = Math.ceil(unit2.stats.health / damageDealtPerHit1)
        const numberOfHitToKill2 = Math.ceil(unit1.stats.health / damageDealtPerHit2)

        const timeNeededToKill1 = (unit1.stats.rateOfFire && numberOfHitToKill1 !== Infinity) ? roundHundredth((numberOfHitToKill1 - 1) * unit1.stats.rateOfFire) : Infinity
        const timeNeededToKill2 = (unit1.stats.rateOfFire && numberOfHitToKill2 !== Infinity) ? roundHundredth((numberOfHitToKill2 - 1) * unit2.stats.rateOfFire) : Infinity

        const fightingTime = Math.min(timeNeededToKill1, timeNeededToKill2)
        const numberOfHitDuringFight1 = Math.floor(unit1.stats.attackRate ? unit1.stats.attackRate * fightingTime + 1 : 0)
        const numberOfHitDuringFight2 = Math.floor(unit2.stats.attackRate ? unit2.stats.attackRate * fightingTime + 1 : 0)
        let healthRemaining1 = Math.max(unit1.stats.health - numberOfHitDuringFight2 * damageDealtPerHit2, 0)
        let healthRemaining2 = Math.max(unit2.stats.health - numberOfHitDuringFight1 * damageDealtPerHit1, 0)

        const monkHealingPercentSpeed1 = monkHealingSpeed / unit1.stats.health // in %HP/s
        const monkHealingPercentSpeed2 = monkHealingSpeed / unit2.stats.health // in %HP/s

        const monkHealingResource1 = monkHealingPercentSpeed1 * totalCost1
        const monkHealingResource2 = monkHealingPercentSpeed2 * totalCost2

        let calculatedStats: CalculatedStats = { totalCost1, totalCost2, composedDamageDealtPerHit1, composedDamageDealtPerHit2, secondaryAttackCount1, secondaryAttackCount2, composedSecondaryDamageDealtPerHit1, composedSecondaryDamageDealtPerHit2, damageDealtPerHit1, damageDealtPerHit2, damagePerSecond1, damagePerSecond2, numberOfHitToKill1, numberOfHitToKill2, timeNeededToKill1, timeNeededToKill2, damagePerSecondWithAccuracyHight1: damagePerSecondWithAccuracyHigh1, damagePerSecondWithAccuracyHight2: damagePerSecondWithAccuracyHigh2, damagePerSecondWithAccuracyLow1, damagePerSecondWithAccuracyLow2, healthRemaining1, healthRemaining2, monkHealingPercentSpeed1, monkHealingPercentSpeed2, monkHealingResource1, monkHealingResource2 }

        calculatedStats = this.applyCapacities(calculatedStats, unit1, unit2)
        calculatedStats = this.applyCapacities(calculatedStats, unit2, unit1)

        this.addUnitsRelatedUpgrades(unit1, unit2)

        return calculatedStats
    }

    compareCombatStats(stats1: CombatStat[], stats2: CombatStat[]): [CombatStatCompared[], CombatStatCompared[]] {
        const meleeStat1 = stats1.find(stat => stat.type === ArmorType.melee)
        const meleeStat2 = stats2.find(stat => stat.type === ArmorType.melee)
        const meleeComparison = StatCompared.build2Comparisons(meleeStat1?.value || 0, meleeStat2?.value || 0)
        const meleeCompared1 = { value: meleeStat1?.value, type: ArmorType.melee, comparison: meleeComparison[0].comparison }
        const meleeCompared2 = { value: meleeStat2?.value, type: ArmorType.melee, comparison: meleeComparison[1].comparison }

        const pierceStat1 = stats1.find(stat => stat.type === ArmorType.pierce)
        const pierceStat2 = stats2.find(stat => stat.type === ArmorType.pierce)
        const pierceComparison = StatCompared.build2Comparisons(pierceStat1?.value || 0, pierceStat2?.value || 0)
        const pierceCompared1 = { value: pierceStat1?.value, type: ArmorType.pierce, comparison: pierceComparison[0].comparison }
        const pierceCompared2 = { value: pierceStat2?.value, type: ArmorType.pierce, comparison: pierceComparison[1].comparison }

        const statBonuses1 = stats1.filter(stat => stat.type !== ArmorType.melee && stat.type !== ArmorType.pierce)
        const statBonuses2 = stats2.filter(stat => stat.type !== ArmorType.melee && stat.type !== ArmorType.pierce)

        let statBonusesCompared1: CombatStatCompared[] = []
        let statBonusesCompared2: CombatStatCompared[] = []
        const allBonusTypes = statBonuses1.concat(statBonuses2.filter(bonus2 => !statBonuses1.find(bonus1 => bonus1.type === bonus2.type))).map(bonus => bonus.type)
        allBonusTypes.forEach(type => {
            const bonus1 = (statBonuses1.find(bonus => bonus.type === type) || { value: null, type }) as CombatStat
            const bonus2 = (statBonuses2.find(bonus => bonus.type === type) || { value: null, type }) as CombatStat
            const comparedStats = StatCompared.build2Comparisons(bonus1?.value || 0, bonus2?.value || 0)

            statBonusesCompared1.push({ value: bonus1.value, type: bonus1.type, comparison: comparedStats[0].comparison })
            statBonusesCompared2.push({ value: bonus2.value, type: bonus2.type, comparison: comparedStats[1].comparison })
        })

        const statComparedList1: CombatStatCompared[] = []
        const statComparedList2: CombatStatCompared[] = []
        if (meleeStat1?.value !== undefined || meleeStat2?.value !== undefined) {
            statComparedList1.push(meleeCompared1 as CombatStatCompared)
            statComparedList2.push(meleeCompared2 as CombatStatCompared)
        }
        if (pierceStat1?.value !== undefined || pierceStat2?.value !== undefined) {
            statComparedList1.push(pierceCompared1 as CombatStatCompared)
            statComparedList2.push(pierceCompared2 as CombatStatCompared)
        }
        statComparedList1.push(...statBonusesCompared1)
        statComparedList2.push(...statBonusesCompared2)

        return [statComparedList1, statComparedList2]
    }

    private applyUpgrades = (unit1: Unit, unit2: Unit, upgrades1: Upgrade[], upgrades2: Upgrade[]) => {
        const unit1Effects = upgrades1.reduce((effects: Effect[], upgrade: Upgrade) => {
            return effects.concat(upgrade.effects || [])
        }, [] as Effect[])
        unit1Effects.sort((e1, e2) => e1.order - e2.order).forEach(effect => effect.apply(unit1, upgrades1, unit2, upgrades2))

        const unit2Effects = upgrades2.reduce((effects: Effect[], upgrade: Upgrade) => {
            return effects.concat(upgrade.effects || [])
        }, [] as Effect[])
        unit2Effects.sort((e1, e2) => e1.order - e2.order).forEach(effect => effect.apply(unit2, upgrades2, unit1, upgrades1))
    }

    private applyBonus = (unit1: Unit, unit2: Unit, upgrades1: Upgrade[], upgrades2: Upgrade[], bonuses1: Bonus[], bonuses2: Bonus[]) => {
        const unit1Effects = bonuses1.reduce((effects: Effect[], bonus: Bonus) => {
            return effects.concat(bonus.effects || [])
        }, [] as Effect[])
        unit1Effects.sort((e1, e2) => e1.order - e2.order).forEach(effect => effect.apply(unit1, upgrades1, unit2, upgrades2))

        const unit2Effects = bonuses2.reduce((effects: Effect[], bonus: Bonus) => {
            return effects.concat(bonus.effects || [])
        }, [] as Effect[])
        unit2Effects.sort((e1, e2) => e1.order - e2.order).forEach(effect => effect.apply(unit2, upgrades2, unit1, upgrades1))
    }

    private applyCapacities = (calculatedStats: CalculatedStats, unit: Unit, targetedUnit: Unit): CalculatedStats => {
        if (unit.hasCapacity(CapacityId.selfDestruction)) {
            calculatedStats.healthRemaining1 = 0
            calculatedStats.healthRemaining2 = Math.min(Math.max(targetedUnit.stats.health - calculatedStats.damageDealtPerHit1, 0), calculatedStats.healthRemaining2)
        }
        if (unit.hasCapacity(CapacityId.conversion)) {
            const conversion = unit.getCapacity(CapacityId.conversion) as ConvertionCapacity
            calculatedStats.minimumConversionTime1 = multiplyNumber(conversion.conversionCyclesMin + targetedUnit.stats.conversionMinCyclesResistance, conversionCycleTime)
            calculatedStats.maximumConversionTime1 = multiplyNumber(conversion.conversionCyclesMax + targetedUnit.stats.conversionMaxCyclesResistance, conversionCycleTime)
            
            const cycles = Array.from({ length: conversion.conversionCyclesMax - conversion.conversionCyclesMin + 1 }, (_, i) => i + conversion.conversionCyclesMin)
            let remainingProbability = 1
            const conversionProbabilityPerCycle = Array.from({ length: cycles.length }, (_, i) => i).map((_, index, array) => {
                if (index === array.length - 1) {
                    return remainingProbability
                }
                const conversionProbability = remainingProbability * (unit.stats.accuracy || 0)/(targetedUnit.stats.conversionResistance || 1)
                remainingProbability = remainingProbability - conversionProbability
                return conversionProbability
            })

            const averageConversionCycle1 = cycles.reduce((acc, value, index) => {
                return acc + value * conversionProbabilityPerCycle[index]
            }, 0)
            calculatedStats.averageConversionTime1 = averageConversionCycle1 * conversionCycleTime
        }

        return calculatedStats
    }

    private addUnitsRelatedUpgrades = (unit1: Unit, unit2: Unit) => {
        const firstCrusade = siciliansTechTree.uniqueTechs[0]
        if (unit1.id === monasteryUnits.monk.id) {
            unit2.affectingUpgrades.push(monasteryUpgrade.faith)
            unit2.affectingUpgrades.push(firstCrusade)
        }
        if (unit2.id === monasteryUnits.monk.id) {
            unit1.affectingUpgrades.push(monasteryUpgrade.faith)
            unit1.affectingUpgrades.push(firstCrusade)
        }
    }

    private calculateDamageDealtComponentsPerHit =  (attackingUnitAttacks: CombatStat[], defendingUnitArmors: CombatStat[]): CombatStat[] => {
        const attacks = attackingUnitAttacks
        const armors = defendingUnitArmors

        return attacks
            .filter(attack => armors.find(armor => armor.type === attack.type) || attack.type === ArmorType.trueDamage)
            .map(attack => {
                const value = attack.value - (armors.find(armor => armor.type === attack.type)?.value || 0)
                return { ...attack, value: Math.max(value, 0) }
            })
    }

    private calculateDamageDealtPerHit = (composedDamageDealtPerHit1: CombatStat[], { count, composedSecondaryDamageDealtPerHit }: { count: number, composedSecondaryDamageDealtPerHit: CombatStat[] }) => {
        const mainAttackDamage = Math.max(composedDamageDealtPerHit1.map(damage => damage.value).reduce((total: number, value: number) => total + value, 0), 1)
        const secondaryAttacksDamage = multiplyNumber(Math.max(composedSecondaryDamageDealtPerHit.map(damage => damage.value).reduce((total: number, value: number) => total + value, 0), 1), count)
        return mainAttackDamage + secondaryAttacksDamage
    }

}

export default new UnitCalculatorService()