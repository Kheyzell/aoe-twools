import { Unit, Upgrade } from "../../models/techs.model";

interface BarracksUnits {
    militia: Unit
    manAtArms: Unit
    longSwordsman: Unit
    twoHandedSwordsman: Unit
    champion: Unit
    spearman: Unit
    pikeman: Unit
    halbedier: Unit
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
        name: 'Militia',
        age: 1,
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
        name: 'Man-At-Arms',
        age: 2,
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
        name: 'Long Swordsman',
        age: 3,
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
        name: 'Two Handed Swordsman',
        age: 4,
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
        name: 'Champion',
        age: 4,
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
        name: 'Spearman',
        age: 2,
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
        name: 'Pikeman',
        age: 3,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        duration: 22
    }),
    halbedier: new Unit({
        id: 'halberdier',
        name: 'Halberdier',
        age: 4,
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
        name: 'Eagle Scout',
        age: 2,
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
        name: 'Eagle Warrior',
        age: 3,
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
        name: 'Elite Eagle Warrior',
        age: 4,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        duration: 20
    })
}

export const barracksUpgrade: BarracksUpgrades = {
    supplies: new Upgrade({
        id: 'supplies',
        name: 'supplies',
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
        name: 'squires',
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
        name: 'arson',
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