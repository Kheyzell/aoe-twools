import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model"
import { Unit, AttackType } from "../../models/unit.model"
import { Upgrade } from "../../models/upgrade.model"
import { chainTechs } from "../../utils/techs.utils"

interface ArcheryUnits {
    archer: Unit
    crossbowman: Unit
    arbalester: Unit
    skirmisher: Unit
    eliteSkirmisher: Unit
    handCannoneer: Unit
    cavalryArcher: Unit
    heavyCavalryArcher: Unit
}

interface ArcheryUpgrades {
    thumbRing: Upgrade
    parthianTactis: Upgrade
}

export const archeryUnits: ArcheryUnits = {
    archer: new Unit({
        id: 'archer',
        wikiUrl: 'Archer_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 30,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .8,
            attackComponents: [
                { value: 4, type: ArmorType.pierce },
                { value: 3, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer }
            ],
            movementSpeed: .96,
            lineOfSight: 6,
        },
        duration: 35
    }),
    crossbowman: new Unit({
        id: 'crossbowman',
        wikiUrl: 'Crossbowman_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 35,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .85,
            attackComponents: [
                { value: 5, type: ArmorType.pierce },
                { value: 3, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer }
            ],
            movementSpeed: .96,
            lineOfSight: 7,
        },
        duration: 27
    }),
    arbalester: new Unit({
        id: 'arbalester',
        wikiUrl: 'Arbalester',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .9,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 3, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer }
            ],
            movementSpeed: .96,
            lineOfSight: 7,
        },
        duration: 27
    }),
    skirmisher: new Unit({
        id: 'skirmisher',
        wikiUrl: 'Skirmisher_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 25,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 30,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .9,
            attackComponents: [
                { value: 2, type: ArmorType.pierce },
                { value: 3, type: ArmorType.archer },
                { value: 3, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer }
            ],
            movementSpeed: .96,
            lineOfSight: 6,
        },
        duration: 22
    }),
    eliteSkirmisher: new Unit({
        id: 'eliteSkirmisher',
        wikiUrl: 'Elite_Skirmisher',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 25,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 35,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .9,
            attackComponents: [
                { value: 3, type: ArmorType.pierce },
                { value: 4, type: ArmorType.archer },
                { value: 3, type: ArmorType.spearman },
                { value: 2, type: ArmorType.cavalryArcher }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer }
            ],
            movementSpeed: .96,
            lineOfSight: 7,
        },
        duration: 22
    }),
    handCannoneer: new Unit({
        id: 'handCannoneer',
        wikiUrl: 'Hand_Cannoneer',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 45,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 7,
            accuracy: .75,
            attackComponents: [
                { value: 17, type: ArmorType.pierce },
                { value: 10, type: ArmorType.infantry },
                { value: 2, type: ArmorType.ram },
                { value: 1, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.gunpowderUnit },
            ],
            movementSpeed: .96,
            lineOfSight: 9,
        },
        duration: 34
    }),
    cavalryArcher: new Unit({
        id: 'cavalryArcher',
        wikiUrl: 'Cavalry_Archer_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 40,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .5,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.4,
            lineOfSight: 5,
        },
        duration: 34
    }),
    heavyCavalryArcher: new Unit({
        id: 'heavyCavalryArcher',
        wikiUrl: 'Heavy_Cavalry_Archer',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 40,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .5,
            attackComponents: [
                { value: 7, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.4,
            lineOfSight: 6,
        },
        duration: 27
    }),
}

chainTechs([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester])
chainTechs([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher])
chainTechs([archeryUnits.handCannoneer])
chainTechs([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher])

export const archeryUpgrades: ArcheryUpgrades = {
    thumbRing: new Upgrade({
        id: 'thumbRing',
        wikiUrl: 'ThumbRing_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 250,
            food: 300,
            gold: 0,
            stone: 0
        },
        effects: [],
        duration: 45
    }),
    parthianTactis: new Upgrade({
        id: 'parthianTactics',
        wikiUrl: 'ParthianTactics_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 200,
            gold: 250,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(2, ArmorType.pierce)

                if (unit.id === archeryUnits.cavalryArcher.id || unit.id === archeryUnits.heavyCavalryArcher.id) {
                    unit.addAttackComponent(4, ArmorType.spearman)
                } else {
                    unit.addAttackComponent(2, ArmorType.spearman)
                }
            }
        }],
        duration: 65
    }),
}