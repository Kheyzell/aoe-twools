import { Upgrade } from "../../models/techs.model";

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
        name: 'Forging',
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
        name: 'Iron Casting',
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
        name: 'Blast Furnace',
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
        name: 'Scale Mail Armor',
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
        name: 'Chain Mail Armor',
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
        name: 'Plate Mail Armor',
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
        name: 'Scale Barding Armor',
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
        name: 'Chain Barding Armor',
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
        name: 'Plate Barding Armor',
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
        name: 'Fletching',
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
        name: 'Bodkin Arrow',
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
        name: 'Bracer',
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
        name: 'Padded Archer Armor',
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
        name: 'Leather Archer Armor',
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
        name: 'Ring Archer Armor',
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