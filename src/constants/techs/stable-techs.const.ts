import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model";
import { Unit, AttackType } from "../../models/unit.model";
import { Upgrade } from "../../models/upgrade.model";
import { chainTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

interface StableUnits {
    scoutCavalry: Unit
    lightCavalry: Unit
    hussar: Unit
    wingedHussar: Unit
    knight: Unit
    cavalier: Unit
    paladin: Unit
    camelRider: Unit
    heavyCamelRider: Unit
    battleElephant: Unit
    eliteBattleElephant: Unit
    steppeLancer: Unit
    eliteSteppeLancer: Unit
}

interface StableUpgrades {
    bloodlines: Upgrade
    husbandry: Upgrade
}

export const stableUnits: StableUnits = {
    scoutCavalry: new Unit({
        id: 'scoutCavalry',
        wikiUrl: 'Scout_Cavalry_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 45,
            movementSpeed: 1.2,
            lineOfSight: 4,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 6, type: ArmorType.monk }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            conversionResistance: 8
        },
        duration: 30
    }),
    lightCavalry: new Unit({
        id: 'lightCavalry',
        wikiUrl: 'Light_Cavalry_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 10, type: ArmorType.monk }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.5,
            lineOfSight: 8,
            conversionResistance: 8
        },
        duration: 30
    }),
    hussar: new Unit({
        id: 'hussar',
        wikiUrl: 'Hussar_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 75,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 12, type: ArmorType.monk }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.5,
            lineOfSight: 10,
            conversionResistance: 8
        },
        duration: 30
    }),
    wingedHussar: new Unit({
        id: 'wingedHussar',
        wikiUrl: 'Winged_Hussar_(Age_of_Empires_II)',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 9, type: ArmorType.melee },
                { value: 14, type: ArmorType.monk },
                { value: 4, type: ArmorType.gunpowderUnit }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.5,
            lineOfSight: 10,
            conversionResistance: 8
        },
        duration: 30
    }),
    knight: new Unit({
        id: 'knight',
        wikiUrl: 'Knight_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 100,
            rateOfFire: 1.8,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.35,
            lineOfSight: 4
        },
        duration: 30
    }),
    cavalier: new Unit({
        id: 'cavalier',
        wikiUrl: 'Cavalier',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 120,
            rateOfFire: 1.8,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.35,
            lineOfSight: 4
        },
        duration: 30
    }),
    paladin: new Unit({
        id: 'paladin',
        wikiUrl: 'Paladin',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 160,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 30
    }),
    camelRider: new Unit({
        id: 'camelRider',
        wikiUrl: 'Camel_Rider_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 100,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 6, type: ArmorType.melee },
                { value: 9, type: ArmorType.cavalry },
                { value: 5, type: ArmorType.camel },
                { value: 5, type: ArmorType.ship },
                { value: 5, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.camel }
            ],
            movementSpeed: 1.45,
            lineOfSight: 4
        },
        duration: 22
    }),
    heavyCamelRider: new Unit({
        id: 'heavyCamelRider',
        wikiUrl: 'Heavy_Camel_Rider',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 120,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 18, type: ArmorType.cavalry },
                { value: 9, type: ArmorType.camel },
                { value: 9, type: ArmorType.ship },
                { value: 9, type: ArmorType.fishingShip },
                { value: 7, type: ArmorType.mameluke },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.camel }
            ],
            movementSpeed: 1.45,
            lineOfSight: 5
        },
        duration: 22
    }),
    battleElephant: new Unit({
        id: 'battleElephant',
        wikiUrl: 'Battle_Elephant',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 120,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 250,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 4, type: ArmorType.building },
                { value: 4, type: ArmorType.stoneDefense },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.warElephant },
            ],
            movementSpeed: .85,
            lineOfSight: 4
        },
        duration: 24
    }),
    eliteBattleElephant: new Unit({
        id: 'eliteBattleElephant',
        wikiUrl: 'Elite_Battle_Elephant',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 120,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 300,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee },
                { value: 7, type: ArmorType.building },
                { value: 7, type: ArmorType.stoneDefense },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.warElephant },
            ],
            movementSpeed: .85,
            lineOfSight: 5
        },
        duration: 24
    }),
    steppeLancer: new Unit({
        id: 'steppeLancer',
        wikiUrl: 'Steppe_Lancer',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            range: 1,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 9, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
            ],
            movementSpeed: 1.45,
            lineOfSight: 5
        },
        duration: 24
    }),
    eliteSteppeLancer: new Unit({
        id: 'eliteSteppeLancer',
        wikiUrl: 'Elite_Steppe_Lancer',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 2,
            range: 1,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 11, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
            ],
            movementSpeed: 1.45,
            lineOfSight: 5
        },
        duration: 20
    }),
}

chainTechs([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar])
chainTechs([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.wingedHussar])
chainTechs([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin])
chainTechs([stableUnits.camelRider, stableUnits.heavyCamelRider])
chainTechs([stableUnits.battleElephant, stableUnits.eliteBattleElephant])
chainTechs([stableUnits.steppeLancer, stableUnits.eliteSteppeLancer])

export const stableUpgrades: StableUpgrades = {
    bloodlines: new Upgrade({
        id: 'bloodlines',
        wikiUrl: 'Bloodlines_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 150,
            gold: 100,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.health += 20
            }
        }],
        duration: 50
    }),
    husbandry: new Upgrade({
        id: 'husbandry',
        wikiUrl: 'Husbandry_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 150,
            gold: 0,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
            }
        }],
        duration: 40
    }),
}