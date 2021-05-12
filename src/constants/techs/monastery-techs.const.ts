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
        name: 'Monk',
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
        name: 'Redemption',
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
        name: 'Atonement',
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
        name: 'Herbal Medicine',
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
        name: 'Heresy',
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
        name: 'Sanctity',
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
        name: 'Fervor',
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
        name: 'Faith',
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
        name: 'Illumination',
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
        name: 'Block Printing',
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
        name: 'Theocracy',
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