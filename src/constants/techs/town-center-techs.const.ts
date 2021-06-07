import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

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
        age: 1,
        unitType: UnitType.civilian,
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

chainTechs([townCenterUpgrade.feudalAge, townCenterUpgrade.casteAge, townCenterUpgrade.imperialAge])
chainTechs([townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart])
chainTechs([townCenterUpgrade.townWatch, townCenterUpgrade.townPatrol])