import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

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
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    lightCavalry: new Unit({
        id: 'lightCavalry',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    hussar: new Unit({
        id: 'hussar',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    wingedHussar: new Unit({
        id: 'wingedHussar',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    knight: new Unit({
        id: 'knight',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        duration: 30
    }),
    cavalier: new Unit({
        id: 'cavalier',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        duration: 30
    }),
    paladin: new Unit({
        id: 'paladin',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        duration: 30
    }),
    camelRider: new Unit({
        id: 'camelRider',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        duration: 22
    }),
    heavyCamelRider: new Unit({
        id: 'heavyCamelRider',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        duration: 22
    }),
    battleElephant: new Unit({
        id: 'battleElephant',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 120,
            gold: 70,
            stone: 0
        },
        duration: 24
    }),
    eliteBattleElephant: new Unit({
        id: 'eliteBattleElephant',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 120,
            gold: 70,
            stone: 0
        },
        duration: 24
    }),
    steppeLancer: new Unit({
        id: 'steppeLancer',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 45,
            stone: 0
        },
        duration: 24
    }),
    eliteSteppeLancer: new Unit({
        id: 'eliteSteppeLancer',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 45,
            stone: 0
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
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 150,
            gold: 100,
            stone: 0
        },
        duration: 50
    }),
    husbandry: new Upgrade({
        id: 'husbandry',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
}