import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface BarracksUnits {
    militia: Unit
    manAtArms: Unit
    longSwordsman: Unit
    twoHandedSwordsman: Unit
    champion: Unit
    spearman: Unit
    pikeman: Unit
    halberdier: Unit
    eagleScout: Unit
    eagleWarrior: Unit
    eliteEagleWarrior: Unit
}

interface BarracksUpgrades {
    supplies: Upgrade,
    squires: Upgrade,
    arson: Upgrade
}

export const barracksUnits: BarracksUnits = {
    militia: new Unit({
        id: 'militia',
        age: 1,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        duration: 21
    }),
    manAtArms: new Unit({
        id: 'manAtArms',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        duration: 21
    }),
    longSwordsman: new Unit({
        id: 'longSwordsman',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        duration: 21
    }),
    twoHandedSwordsman: new Unit({
        id: 'twoHandedSwordsman',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        duration: 21
    }),
    champion: new Unit({
        id: 'champion',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        duration: 21
    }),
    spearman: new Unit({
        id: 'spearman',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        duration: 22
    }),
    pikeman: new Unit({
        id: 'pikeman',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        duration: 22
    }),
    halberdier: new Unit({
        id: 'halberdier',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        duration: 22
    }),
    eagleScout: new Unit({
        id: 'eagleScout',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        duration: 35
    }),
    eagleWarrior: new Unit({
        id: 'eagleWarrior',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        duration: 35
    }),
    eliteEagleWarrior: new Unit({
        id: 'eliteEagleWarrior',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        duration: 20
    })
}

chainTechs([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion])
chainTechs([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier])
chainTechs([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior])

export const barracksUpgrade: BarracksUpgrades = {
    supplies: new Upgrade({
        id: 'supplies',
        age: 2,
        cost: {
            wood: 0,
            food: 150,
            gold: 100,
            stone: 0
        },
        duration: 35
    }),
    squires: new Upgrade({
        id: 'squires',
        age: 3,
        cost: {
            wood: 0,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
    arson: new Upgrade({
        id: 'arson',
        age: 3,
        cost: {
            wood: 0,
            food: 150,
            gold: 50,
            stone: 0
        },
        duration: 25
    }),
}