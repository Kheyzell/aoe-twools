import { Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface LumberCampUpgrades {
    doubleBitAxe: Upgrade
    bowSaw: Upgrade
    twoManSaw: Upgrade
}

export const lumberCampUpgrades: LumberCampUpgrades = {
    doubleBitAxe: new Upgrade({
        id: 'doubleBitAxe',
        age: 2,
        cost: {
            wood: 50,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 25
    }),
    bowSaw: new Upgrade({
        id: 'bowSaw',
        age: 3,
        cost: {
            wood: 100,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 50
    }),
    twoManSaw: new Upgrade({
        id: 'twoManSaw',
        age: 4,
        cost: {
            wood: 200,
            food: 300,
            gold: 0,
            stone: 0
        },
        duration: 100
    }),
}

chainTechs([lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw, lumberCampUpgrades.twoManSaw])