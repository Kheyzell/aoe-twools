import { Unit, Upgrade } from "../../models/techs.model";

interface TownCenterUnits {
    villager: Unit
}

interface TownCenterUpgrades {
    feudalAge: Upgrade,
    loom: Upgrade,
    casteAge: Upgrade,
    wheelbarrow: Upgrade,
    townWatch: Upgrade,
    imperialAge: Upgrade,
    handCart: Upgrade,
    townPatrol: Upgrade,
}

export const townCenterUnits: TownCenterUnits = {
    villager: new Unit({
        id: 'villager',
        name: 'Villager',
        age: 1,
        cost: {
            wood: 0,
            food: 50,
            gold: 0,
            stone: 0
        },
        duration: 25
    })
}

export const townCenterUpgrade: TownCenterUpgrades = {
    feudalAge: new Upgrade({
        id: 'feudalAge',
        name: 'Feudal Age',
        age: 1,
        cost: {
            wood: 0,
            food: 500,
            gold: 0,
            stone: 0
        },
        duration: 130
    }),
    loom: new Upgrade({
        id: 'loom',
        name: 'Loom',
        age: 1,
        cost: {
            wood: 0,
            food: 0,
            gold: 50,
            stone: 0
        },
        duration: 25
    }),
    casteAge: new Upgrade({
        id: 'castleAge',
        name: 'Castle Age',
        age: 2,
        cost: {
            wood: 0,
            food: 800,
            gold: 200,
            stone: 0
        },
        duration: 160
    }),
    wheelbarrow: new Upgrade({
        id: 'wheelbarrow',
        name: 'Wheelbarrow',
        age: 2,
        cost: {
            wood: 50,
            food: 175,
            gold: 0,
            stone: 0
        },
        duration: 75
    }),
    townWatch: new Upgrade({
        id: 'townWatch',
        name: 'Town Watch',
        age: 2,
        cost: {
            wood: 0,
            food: 75,
            gold: 0,
            stone: 0
        },
        duration: 25
    }),
    imperialAge: new Upgrade({
        id: 'imperialAge',
        name: 'Imperial Age',
        age: 3,
        cost: {
            wood: 0,
            food: 1000,
            gold: 800,
            stone: 0
        },
        duration: 190
    }),
    handCart: new Upgrade({
        id: 'handCart',
        name: 'Hand Cart',
        age: 3,
        cost: {
            wood: 200,
            food: 300,
            gold: 475,
            stone: 0
        },
        duration: 55
    }),
    townPatrol: new Upgrade({
        id: 'townPatrol',
        name: 'Town Patrol',
        age: 3,
        cost: {
            wood: 0,
            food: 300,
            gold: 100,
            stone: 0
        },
        duration: 40
    }),
}