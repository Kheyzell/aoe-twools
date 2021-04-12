import { Unit, Upgrade } from "../../models/techs.model";

interface CastleUnits {
    uniqueUnit: Unit
    eliteUniqueUnit: Unit
    petard: Unit
    trebuchet: Unit
}

interface CastleUpgrades {
    castleUniqueTech: Upgrade
    imperialUniqueTech: Upgrade
    hoardings: Upgrade
    sappers: Upgrade
    conscription: Upgrade
    spies: Upgrade
}

export const castleUnits: CastleUnits = {
    uniqueUnit: new Unit({
        id: 'uniqueUnit',
        name: 'Unique Unit',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    eliteUniqueUnit: new Unit({
        id: 'eliteUniqueUnit',
        name: 'Elite Unique Unit',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    petard: new Unit({
        id: 'petard',
        name: 'Petard',
        age: 3,
        cost: {
            wood: 0,
            food: 65,
            gold: 20,
            stone: 0
        },
        duration: 25
    }),
    trebuchet: new Unit({
        id: 'trebuchet',
        name: 'Trebuchet',
        age: 4,
        cost: {
            wood: 200,
            food: 0,
            gold: 200,
            stone: 0
        },
        duration: 50
    }),
}

export const castleUpgrades: CastleUpgrades = {
    castleUniqueTech: new Upgrade({
        id: 'castleUniqueTech',
        name: 'Castle Unique Tech',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    imperialUniqueTech: new Upgrade({
        id: 'imperialUniqueTech',
        name: 'Imperial Unique Tech',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    hoardings: new Upgrade({
        id: 'hoardings',
        name: 'Hoardings',
        age: 4,
        cost: {
            wood: 400,
            food: 400,
            gold: 0,
            stone: 0
        },
        duration: 75
    }),
    sappers: new Upgrade({
        id: 'sappers',
        name: 'Sappers',
        age: 4,
        cost: {
            wood: 0,
            food: 400,
            gold: 200,
            stone: 0
        },
        duration: 10
    }),
    conscription: new Upgrade({
        id: 'conscription',
        name: 'Conscription',
        age: 4,
        cost: {
            wood: 0,
            food: 150,
            gold: 150,
            stone: 0
        },
        duration: 60
    }),
    spies: new Upgrade({
        id: 'spies',
        name: 'Spies',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 1
    }),
}