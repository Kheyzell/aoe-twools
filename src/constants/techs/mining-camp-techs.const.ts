import { Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface MiningCampUpgrades {
    goldMining: Upgrade
    stoneMining: Upgrade
    goldShaftMining: Upgrade
    stoneShaftMining: Upgrade
}

export const miningCampUpgrades: MiningCampUpgrades = {
    goldMining: new Upgrade({
        id: 'goldMining',
        name: 'Gold Mining',
        age: 2,
        cost: {
            wood: 75,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    stoneMining: new Upgrade({
        id: 'stoneMining',
        name: 'Stone Mining',
        age: 2,
        cost: {
            wood: 75,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    goldShaftMining: new Upgrade({
        id: 'goldShaftMining',
        name: 'Gold Shaft Mining',
        age: 3,
        cost: {
            wood: 150,
            food: 200,
            gold: 0,
            stone: 0
        },
        duration: 75
    }),
    stoneShaftMining: new Upgrade({
        id: 'stoneShaftMining',
        name: 'Stone Shaft Mining',
        age: 3,
        cost: {
            wood: 150,
            food: 200,
            gold: 0,
            stone: 0
        },
        duration: 75
    }),
}

chainTechs([miningCampUpgrades.goldMining, miningCampUpgrades.goldShaftMining])
chainTechs([miningCampUpgrades.stoneMining, miningCampUpgrades.stoneShaftMining])