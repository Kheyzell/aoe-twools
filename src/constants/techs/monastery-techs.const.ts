import { Unit, UnitType, Upgrade } from "../../models/techs.model";

interface MonasteryUnits {
    monk: Unit
}

interface MonasteryUpgrades {
    redemption: Upgrade,
    atonement: Upgrade,
    herbalMedecine: Upgrade,
    heresy: Upgrade,
    sanctity: Upgrade,
    fervor: Upgrade,
    faith: Upgrade,
    illumination: Upgrade,
    blockPrinting: Upgrade,
    theocracy: Upgrade,
}

export const monasteryUnits: MonasteryUnits = {
    monk: new Unit({
        id: 'monk',
        age: 3,
        unitType: UnitType.civilian,
        cost: {
            wood: 0,
            food: 0,
            gold: 100,
            stone: 0
        },
        duration: 51
    })
}

export const monasteryUpgrade: MonasteryUpgrades = {
    redemption: new Upgrade({
        id: 'redemption',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 475,
            stone: 0
        },
        duration: 50
    }),
    atonement: new Upgrade({
        id: 'atonement',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 325,
            stone: 0
        },
        duration: 40
    }),
    herbalMedecine: new Upgrade({
        id: 'herbalMedicine',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 350,
            stone: 0
        },
        duration: 35
    }),
    heresy: new Upgrade({
        id: 'heresy',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 1000,
            stone: 0
        },
        duration: 60
    }),
    sanctity: new Upgrade({
        id: 'sanctity',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 120,
            stone: 0
        },
        duration: 60
    }),
    fervor: new Upgrade({
        id: 'fervor',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 140,
            stone: 0
        },
        duration: 50
    }),
    faith: new Upgrade({
        id: 'faith',
        age: 4,
        cost: {
            wood: 0,
            food: 750,
            gold: 1000,
            stone: 0
        },
        duration: 60
    }),
    illumination: new Upgrade({
        id: 'illumination',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 120,
            stone: 0
        },
        duration: 65
    }),
    blockPrinting: new Upgrade({
        id: 'blockPrinting',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 200,
            stone: 0
        },
        duration: 45
    }),
    theocracy: new Upgrade({
        id: 'theocracy',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 200,
            stone: 0
        },
        duration: 75
    }),
}