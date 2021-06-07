import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

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
        age: 3,
        unique: true,
        unitType: UnitType.military,
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
        age: 4,
        unique: true,
        unitType: UnitType.military,
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
        age: 3,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 200,
            stone: 0
        },
        duration: 50
    }),
}

chainTechs([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit])

export const castleUpgrades: CastleUpgrades = {
    castleUniqueTech: new Upgrade({
        id: 'castleUniqueTech',
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