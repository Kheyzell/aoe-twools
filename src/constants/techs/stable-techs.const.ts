import { Unit, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface StableUnits {
    scoutCavalry: Unit
    lightCavalry: Unit
    hussar: Unit
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
        name: 'Scout Cavalry',
        age: 2,
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
        name: 'Light Cavalry',
        age: 3,
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
        name: 'Hussar',
        age: 4,
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
        name: 'Knight',
        age: 3,
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
        name: 'Cavalier',
        age: 4,
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
        name: 'Paladin',
        age: 4,
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
        name: 'Camel Rider',
        age: 3,
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
        name: 'Heavy Camel Rider',
        age: 4,
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
        name: 'Battle Elephant',
        age: 3,
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
        name: 'Elite Battle Elephant',
        age: 4,
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
        name: 'Steppe Lancer',
        age: 3,
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
        name: 'Elite Steppe Lancer',
        age: 4,
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
chainTechs([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin])
chainTechs([stableUnits.camelRider, stableUnits.heavyCamelRider])
chainTechs([stableUnits.battleElephant, stableUnits.eliteBattleElephant])
chainTechs([stableUnits.steppeLancer, stableUnits.eliteSteppeLancer])

export const stableUpgrades: StableUpgrades = {
    bloodlines: new Upgrade({
        id: 'bloodlines',
        name: 'Bloodlines',
        age: 2,
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
        name: 'Husbandry',
        age: 3,
        cost: {
            wood: 0,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
}