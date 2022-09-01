import React from "react"
import { useSelector } from "react-redux"

import { CapacityId, ChargedAttackCapacity } from "../../../models/capacity.model"
import { Comparison, StatCompared } from "../../../models/stats-calculation.model"
import { AttackType, CombatStat, Unit } from "../../../models/unit.model"
import { roundHundredth } from "../../../utils/utils"
import { calculatedStatsSelector, selectedUnitsSelector } from "../unit-calculator.slice"
import { StatDisplay, StatLine } from "./basic-stats-components/basic-stats-components"

const DamagePerHitStat = (props: { unit: Unit, damagePerHit: CombatStat[], secondaryDamagePerHit: CombatStat[], secondaryAttackCount: number, totalDamageCompared: StatCompared }) => {
    const chargedAttack = props.unit.stats.capacities.find(capacity => capacity.id === CapacityId.chargedAttack || capacity.id === CapacityId.blastAttack) as ChargedAttackCapacity

    return (
        <span className="DamagePerHitStat">
            { props.damagePerHit.map((damage, i) => (<span key={i}> {damage.value} ({damage.type}) </span>)) }
            { props.secondaryAttackCount ? <span> ( secondary: {  props.secondaryDamagePerHit.map((damage, i) => (<span key={i}> {damage.value} ({damage.type}) </span>)) }) x { props.secondaryAttackCount } </span> : null }
            <StatDisplay comparison={props.totalDamageCompared.comparison}> {props.totalDamageCompared.value} </StatDisplay>
            { chargedAttack ? `(+ ${chargedAttack.damage}) every ${chargedAttack.reloadTime} s` : null }
        </span>
    )
}

export const DamagePerHitLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const { composedDamageDealtPerHit1, composedDamageDealtPerHit2, secondaryAttackCount1, secondaryAttackCount2, composedSecondaryDamageDealtPerHit1, composedSecondaryDamageDealtPerHit2, totalDamageDealtPerHit1: damageDealtPerHit1, totalDamageDealtPerHit2: damageDealtPerHit2 } = useSelector(calculatedStatsSelector)

    const [totalDamageCompared1, totalDamageCompared2] = StatCompared.build2Comparisons(damageDealtPerHit1, damageDealtPerHit2)

    const statComponent1 = (<DamagePerHitStat unit={unit1} damagePerHit={composedDamageDealtPerHit1} secondaryDamagePerHit={composedSecondaryDamageDealtPerHit1} secondaryAttackCount={secondaryAttackCount1} totalDamageCompared={totalDamageCompared1}></DamagePerHitStat>)
    const statComponent2 = (<DamagePerHitStat unit={unit2} damagePerHit={composedDamageDealtPerHit2} secondaryDamagePerHit={composedSecondaryDamageDealtPerHit2} secondaryAttackCount={secondaryAttackCount2} totalDamageCompared={totalDamageCompared2}></DamagePerHitStat>)

    return (<StatLine title={"Damage per hit"} stat1={statComponent1} stat2={statComponent2}></StatLine>)
}

export const DamagePerSecondLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const { mainDamagePerSecond1, mainDamagePerSecond2, secondaryDamagePerSecond1, secondaryDamagePerSecond2 } = useSelector(calculatedStatsSelector)

    const hasSecondaryAttack1 = !!unit1.stats.secondaryAttack
    const hasSecondaryAttack2 = !!unit2.stats.secondaryAttack

    const totalDps1 = mainDamagePerSecond1 + secondaryDamagePerSecond1
    const totalDps2 = mainDamagePerSecond2 + secondaryDamagePerSecond2
    const [damagePerSecondCompared1, damagePerSecondCompared2] = StatCompared.build2Comparisons(totalDps1, totalDps2)
    const component1 = (
        <span>
            <StatDisplay comparison={damagePerSecondCompared1.comparison}> {roundHundredth(damagePerSecondCompared1.value)} </StatDisplay>

            {
                hasSecondaryAttack1 ? (
                    <span>
                        <div> (main: {roundHundredth(mainDamagePerSecond1)}) </div>
                        <div> (secondary: {roundHundredth(secondaryDamagePerSecond1)}) </div>
                    </span>
                ) : null
            }
        </span>
    )
    const component2 = (
        <span>
            <StatDisplay comparison={damagePerSecondCompared2.comparison}> {roundHundredth(damagePerSecondCompared2.value)} </StatDisplay>

            {
                hasSecondaryAttack2 ? (
                    <span>
                        <div> (main: {roundHundredth(mainDamagePerSecond2)}) </div>
                        <div> (secondary: {roundHundredth(secondaryDamagePerSecond2)}) </div>
                    </span>
                ) : null
            }
        </span>
    )
    return (<StatLine title="DPS" stat1={component1} stat2={component2}></StatLine>)
}

export const DamagePerSecondWithAccuratyLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const {
        mainDamagePerSecond1,
        mainDamagePerSecond2,
        mainDamagePerSecondWithAccuracyHigh1,
        mainDamagePerSecondWithAccuracyHigh2,
        mainDamagePerSecondWithAccuracyLow1,
        mainDamagePerSecondWithAccuracyLow2,
        secondaryDamagePerSecond1,
        secondaryDamagePerSecond2,
        secondaryDamagePerSecondWithAccuracyHigh1,
        secondaryDamagePerSecondWithAccuracyHigh2,
        secondaryDamagePerSecondWithAccuracyLow1,
        secondaryDamagePerSecondWithAccuracyLow2
    } = useSelector(calculatedStatsSelector)

    const hasSecondaryAttack1 = !!unit1.stats.secondaryAttack
    const hasSecondaryAttack2 = !!unit2.stats.secondaryAttack

    if ((unit1.stats.accuracy === 1 || unit1.stats.attackType !== AttackType.projectile) && (unit2.stats.accuracy === 1 || unit2.stats.attackType !== AttackType.projectile)
        && !hasSecondaryAttack1 && !hasSecondaryAttack2) {
        return null
    }

    const totalDps1 = mainDamagePerSecond1 + secondaryDamagePerSecond1
    const totalDps2 = mainDamagePerSecond2 + secondaryDamagePerSecond2
    const totalHighDps1 = mainDamagePerSecondWithAccuracyHigh1 + secondaryDamagePerSecondWithAccuracyHigh1
    const totalHighDps2 = mainDamagePerSecondWithAccuracyHigh2 + secondaryDamagePerSecondWithAccuracyHigh2
    const totalLowDps1 = mainDamagePerSecondWithAccuracyLow1 + secondaryDamagePerSecondWithAccuracyLow1
    const totalLowDps2 = mainDamagePerSecondWithAccuracyLow2 + secondaryDamagePerSecondWithAccuracyLow2
    const [dpsCompared1, dpsCompared2] = StatCompared.build2Comparisons(totalDps1, totalDps2)
    const [dpsHightCompared1, dpsHightCompared2] = StatCompared.build2Comparisons(totalHighDps1, totalHighDps2)
    const [dpsLowCompared1, dpsLowCompared2] = StatCompared.build2Comparisons(totalLowDps1, totalLowDps2)
    const component1 = unit1.stats.attackType === AttackType.projectile ? (
            <span>
                <StatDisplay comparison={dpsHightCompared1.comparison}> {roundHundredth(dpsHightCompared1.value)} </StatDisplay>
                { unit1.stats.accuracy !== 1 ? <span> - <StatDisplay comparison={dpsLowCompared1.comparison}> {roundHundredth(dpsLowCompared1.value)} </StatDisplay> </span> : null }

                { hasSecondaryAttack1 ? 
                    <span>
                        <div> (main: {roundHundredth(mainDamagePerSecondWithAccuracyHigh1)} { unit1.stats.accuracy !== 1 ? <span> - {roundHundredth(mainDamagePerSecondWithAccuracyLow1)} </span> : null }) </div>
                        <div> (secondary: {roundHundredth(secondaryDamagePerSecondWithAccuracyHigh1)} { unit1.stats.secondaryAttack?.accuracy !== 1 ? <span> - {roundHundredth(secondaryDamagePerSecondWithAccuracyLow1)} </span> : null }) </div>
                    </span> : null }
            </span>
        ) : (<StatDisplay comparison={dpsCompared1.comparison}> {roundHundredth(dpsCompared1.value)} </StatDisplay>)
    const component2 = unit2.stats.attackType === AttackType.projectile ? (
            <span>
                <StatDisplay comparison={dpsHightCompared2.comparison}> {roundHundredth(dpsHightCompared2.value)} </StatDisplay>
                { unit2.stats.accuracy !== 1 ? <span> - <StatDisplay comparison={dpsLowCompared2.comparison}> {roundHundredth(dpsLowCompared2.value)} </StatDisplay> </span> : null }

                { hasSecondaryAttack2 ? 
                    <span>
                        <div> (main: {roundHundredth(mainDamagePerSecondWithAccuracyHigh2)} { unit2.stats.accuracy !== 1 ? <span> - {roundHundredth(mainDamagePerSecondWithAccuracyLow2)} </span> : null }) </div>
                        <div> (secondary: {roundHundredth(secondaryDamagePerSecondWithAccuracyHigh2)} { unit2.stats.secondaryAttack?.accuracy !== 1 ? <span> - {roundHundredth(secondaryDamagePerSecondWithAccuracyLow2)} </span> : null }) </div>
                    </span> : null }
            </span>
        ) : (<StatDisplay comparison={dpsCompared2.comparison}> {roundHundredth(dpsCompared2.value)} </StatDisplay>)
    
    return (<StatLine title="DPS with accuracy" stat1={component1} stat2={component2}></StatLine>)
}

export const ResourcesPerHitLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const { numberOfHitToKill1, numberOfHitToKill2 } = useSelector(calculatedStatsSelector)

    const ressourcePerHit1 = (unit2.cost.wood + unit2.cost.food + unit2.cost.gold + unit2.cost.stone) / numberOfHitToKill1
    const ressourcePerHit2 = (unit1.cost.wood + unit1.cost.food + unit1.cost.gold + unit1.cost.stone) / numberOfHitToKill2

    const [ressourcePerHitCompared1, ressourcePerHitCompared2] = StatCompared.build2Comparisons(ressourcePerHit1, ressourcePerHit2)
    const component1 = (<StatDisplay comparison={ressourcePerHitCompared1.comparison}> {roundHundredth(ressourcePerHitCompared1.value)} </StatDisplay>)
    const component2 = (<StatDisplay comparison={ressourcePerHitCompared2.comparison}> {roundHundredth(ressourcePerHitCompared2.value)} </StatDisplay>)
    return (<StatLine title="Ressource per hit" stat1={component1} stat2={component2}></StatLine>)
}

export const ResourcesPerSecondLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const { timeNeededToKill1, timeNeededToKill2 } = useSelector(calculatedStatsSelector)

    const resourcesPerSecond1 = (unit2.cost.wood + unit2.cost.food + unit2.cost.gold + unit2.cost.stone) / timeNeededToKill1
    const resourcesPerSecond2 = (unit1.cost.wood + unit1.cost.food + unit1.cost.gold + unit1.cost.stone) / timeNeededToKill2

    const [resourcesPerSecondCompared1, resourcesPerSecondCompared2] = StatCompared.build2Comparisons(resourcesPerSecond1, resourcesPerSecond2)
    const component1 = (<StatDisplay comparison={resourcesPerSecondCompared1.comparison}> {timeNeededToKill1 ? roundHundredth(resourcesPerSecondCompared1.value) : null} </StatDisplay>)
    const component2 = (<StatDisplay comparison={resourcesPerSecondCompared2.comparison}> {timeNeededToKill2 ? roundHundredth(resourcesPerSecondCompared2.value) : null} </StatDisplay>)
    return (<StatLine title="Ressource/s" stat1={component1} stat2={component2}></StatLine>)
}

export const ResourcesLostLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const { healthRemaining1, healthRemaining2 } = useSelector(calculatedStatsSelector)

    const resourcesLost1 = (unit1.cost.wood + unit1.cost.food + unit1.cost.gold + unit1.cost.stone) * (unit1.stats.health - healthRemaining1) / unit1.stats.health
    const resourcesLost2 = (unit2.cost.wood + unit2.cost.food + unit2.cost.gold + unit2.cost.stone) * (unit2.stats.health - healthRemaining2) / unit2.stats.health

    const [resourcesLostCompared1, resourcesLostCompared2] = StatCompared.build2Comparisons(resourcesLost1, resourcesLost2, true)
    const component1 = (<StatDisplay comparison={resourcesLostCompared1.comparison}> {roundHundredth(resourcesLostCompared1.value)} </StatDisplay>)
    const component2 = (<StatDisplay comparison={resourcesLostCompared2.comparison}> {roundHundredth(resourcesLostCompared2.value)} </StatDisplay>)
    return (<StatLine title="Resources Lost" stat1={component1} stat2={component2}></StatLine>)
}

export const NumberOfHitToKillLine = () => {
    const { numberOfHitToKill1, numberOfHitToKill2 } = useSelector(calculatedStatsSelector)

    const [numberOfHitToKillCompared1, numberOfHitToKillCompared2] = StatCompared.build2Comparisons(numberOfHitToKill1, numberOfHitToKill2, true)
    const component1 = (<StatDisplay comparison={numberOfHitToKillCompared1.comparison}> {(numberOfHitToKillCompared1.value)} </StatDisplay>)
    const component2 = (<StatDisplay comparison={numberOfHitToKillCompared2.comparison}> {(numberOfHitToKillCompared2.value)} </StatDisplay>)
    return (<StatLine title="Number of hits to kill" stat1={component1} stat2={component2}></StatLine>)
}

export const TimeNeededToKillLine = () => {
    const { timeNeededToKill1, timeNeededToKill2 } = useSelector(calculatedStatsSelector)

    const [timeNeededToKillCompared1, timeNeededToKillCompared2] = StatCompared.build2Comparisons(timeNeededToKill1, timeNeededToKill2, true)
    const component1 = (<StatDisplay comparison={timeNeededToKillCompared1.comparison}> {(timeNeededToKillCompared1.value)} </StatDisplay>)
    const component2 = (<StatDisplay comparison={timeNeededToKillCompared2.comparison}> {(timeNeededToKillCompared2.value)} </StatDisplay>)
    return (<StatLine title="Time needed to kill (s)" stat1={component1} stat2={component2}></StatLine>)
}

export const HealthRemainingLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const { healthRemaining1, healthRemaining2 } = useSelector(calculatedStatsSelector)

    const [healthRemaingCompared1, healthRemaingCompared2] = StatCompared.build2Comparisons(healthRemaining1, healthRemaining2)
    const component1 = (<StatDisplay comparison={healthRemaingCompared1.comparison}> {Math.floor(healthRemaingCompared1.value)} ({Math.round(100 * healthRemaingCompared1.value / unit1.stats.health)}%) </StatDisplay>)
    const component2 = (<StatDisplay comparison={healthRemaingCompared2.comparison}> {Math.floor(healthRemaingCompared2.value)} ({Math.round(100 * healthRemaingCompared2.value / unit2.stats.health)}%) </StatDisplay>)
    return (<StatLine title="Health Remaining" stat1={component1} stat2={component2}></StatLine>)
}

export const MonkHealingLine = () => {
    const { monkHealingResource1, monkHealingResource2 } = useSelector(calculatedStatsSelector)

    const [monkHealingResourceCompared1, monkHealingResourceCompared2] = StatCompared.build2Comparisons(monkHealingResource1, monkHealingResource2)
    const component1 = (<StatDisplay comparison={monkHealingResourceCompared1.comparison}> { roundHundredth(monkHealingResourceCompared1.value) } resources/min </StatDisplay>)
    const component2 = (<StatDisplay comparison={monkHealingResourceCompared2.comparison}> { roundHundredth(monkHealingResourceCompared2.value) } resources/min </StatDisplay>)
    return (<StatLine title="Resources generated when healed by monks" stat1={component1} stat2={component2}></StatLine>)
}

export const ConversionLine = () => {
    const { minimumConversionTime1, maximumConversionTime1, averageConversionTime1, averageConversionTime2, minimumConversionTime2, maximumConversionTime2 } = useSelector(calculatedStatsSelector)

    if (!minimumConversionTime1 && !maximumConversionTime1 && !minimumConversionTime2 && !maximumConversionTime2) {
        return null
    }

    let minimumConversionTimeCompared1 = { value: minimumConversionTime1, comparison: Comparison.equal }
    let minimumConversionTimeCompared2 = { value: minimumConversionTime2, comparison: Comparison.equal }
    if (minimumConversionTime1 && minimumConversionTime2) {
        [minimumConversionTimeCompared1, minimumConversionTimeCompared2] = StatCompared.build2Comparisons(minimumConversionTime1, minimumConversionTime2, true)
    }

    let averageConversionTimeCompared1 = { value: averageConversionTime1, comparison: Comparison.equal }
    let averageConversionTimeCompared2 = { value: averageConversionTime2, comparison: Comparison.equal }
    if (averageConversionTime1 && averageConversionTime2) {
        [averageConversionTimeCompared1, averageConversionTimeCompared2] = StatCompared.build2Comparisons(averageConversionTime1, averageConversionTime2, true)
    }

    let maximumConversionTimeCompared1 = { value: maximumConversionTime1, comparison: Comparison.equal }
    let maximumConversionTimeCompared2 = { value: maximumConversionTime2, comparison: Comparison.equal }
    if (maximumConversionTime1 && maximumConversionTime2) {
        [maximumConversionTimeCompared1, maximumConversionTimeCompared2] = StatCompared.build2Comparisons(maximumConversionTime1, maximumConversionTime2, true)
    }
    const component1 = (
        <div>
            <div> <StatDisplay comparison={minimumConversionTimeCompared1.comparison}> { minimumConversionTimeCompared1.value ? `min: ~ ${minimumConversionTimeCompared1.value} s` : '' } </StatDisplay> </div>
            <div> <StatDisplay comparison={averageConversionTimeCompared1.comparison}> { averageConversionTimeCompared1.value ? `average: ~ ${roundHundredth(averageConversionTimeCompared1.value)} s` : '' } </StatDisplay> </div>
            <div> <StatDisplay comparison={maximumConversionTimeCompared1.comparison}> { maximumConversionTimeCompared1.value ? `max: ~ ${maximumConversionTimeCompared1.value} s` : '' } </StatDisplay> </div>
        </div>
    )
    const component2 = (
        <div>
            <div> <StatDisplay comparison={minimumConversionTimeCompared2.comparison}> { minimumConversionTimeCompared2.value ? `min: ~ ${minimumConversionTimeCompared2.value} s` : '' } </StatDisplay> </div>
            <div> <StatDisplay comparison={averageConversionTimeCompared2.comparison}> { averageConversionTimeCompared2.value ? `average: ~ ${roundHundredth(averageConversionTimeCompared2.value)} s` : '' } </StatDisplay> </div>
            <div> <StatDisplay comparison={maximumConversionTimeCompared2.comparison}> { maximumConversionTimeCompared2.value ? `max: ~ ${maximumConversionTimeCompared2.value} s` : '' } </StatDisplay> </div>
        </div>
    )
    return (<StatLine title="Conversion" stat1={component1} stat2={component2}></StatLine>)
}