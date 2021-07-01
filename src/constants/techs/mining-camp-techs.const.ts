import { Upgrade } from './../../models/upgrade.model'
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