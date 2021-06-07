import { Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface BlacksmithUpgrades {
    forging: Upgrade
    ironCasting: Upgrade
    blastFurnace: Upgrade
    scaleMailArmor: Upgrade
    chainMailArmor: Upgrade
    plateMailArmor: Upgrade
    scaleBardingArmor: Upgrade
    chainBardingArmor: Upgrade
    plateBardingArmor: Upgrade
    fletching: Upgrade
    bodkinArrow: Upgrade
    bracer: Upgrade
    paddedArcherArmor: Upgrade
    leatherArcherArmor: Upgrade
    ringArcherArmor: Upgrade
}

export const blacksmithUpgrades: BlacksmithUpgrades = {
    forging: new Upgrade({
        id: 'forging',
        age: 2,
        cost: {
            wood: 0,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 50
    }),
    ironCasting: new Upgrade({
        id: 'ironCasting',
        age: 3,
        cost: {
            wood: 0,
            food: 220,
            gold: 120,
            stone: 0
        },
        duration: 75
    }),
    blastFurnace: new Upgrade({
        id: 'blastFurnace',
        age: 4,
        cost: {
            wood: 0,
            food: 275,
            gold: 225,
            stone: 0
        },
        duration: 100
    }),
    scaleMailArmor: new Upgrade({
        id: 'scaleMailArmor',
        age: 2,
        cost: {
            wood: 0,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
    chainMailArmor: new Upgrade({
        id: 'chainMailArmor',
        age: 3,
        cost: {
            wood: 0,
            food: 200,
            gold: 100,
            stone: 0
        },
        duration: 55
    }),
    plateMailArmor: new Upgrade({
        id: 'plateMailArmor',
        age: 4,
        cost: {
            wood: 0,
            food: 300,
            gold: 150,
            stone: 0
        },
        duration: 70
    }),
    scaleBardingArmor: new Upgrade({
        id: 'scaleBardingArmor',
        age: 2,
        cost: {
            wood: 0,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 45
    }),
    chainBardingArmor: new Upgrade({
        id: 'chainBardingArmor',
        age: 3,
        cost: {
            wood: 0,
            food: 250,
            gold: 150,
            stone: 0
        },
        duration: 60
    }),
    plateBardingArmor: new Upgrade({
        id: 'plateBardingArmor',
        age: 4,
        cost: {
            wood: 0,
            food: 350,
            gold: 200,
            stone: 0
        },
        duration: 75
    }),
    fletching: new Upgrade({
        id: 'fletching',
        age: 2,
        cost: {
            wood: 0,
            food: 100,
            gold: 50,
            stone: 0
        },
        duration: 30
    }),
    bodkinArrow: new Upgrade({
        id: 'bodkinArrow',
        age: 3,
        cost: {
            wood: 0,
            food: 200,
            gold: 100,
            stone: 0
        },
        duration: 35
    }),
    bracer: new Upgrade({
        id: 'bracer',
        age: 4,
        cost: {
            wood: 0,
            food: 300,
            gold: 200,
            stone: 0
        },
        duration: 40
    }),
    paddedArcherArmor: new Upgrade({
        id: 'paddedArcherArmor',
        age: 2,
        cost: {
            wood: 0,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
    leatherArcherArmor: new Upgrade({
        id: 'leatherArcherArmor',
        age: 3,
        cost: {
            wood: 0,
            food: 150,
            gold: 150,
            stone: 0
        },
        duration: 55
    }),
    ringArcherArmor: new Upgrade({
        id: 'ringArcherArmor',
        age: 4,
        cost: {
            wood: 0,
            food: 250,
            gold: 250,
            stone: 0
        },
        duration: 70
    }),
}

chainTechs([blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,])
chainTechs([blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,])
chainTechs([blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,])
chainTechs([blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,])
chainTechs([blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor])