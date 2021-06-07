import { Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface UniversityUpgrades {
    masonry: Upgrade
    fortifiedWall: Upgrade
    ballistics: Upgrade
    guardTower: Upgrade
    heatedShot: Upgrade
    murderHoles: Upgrade
    treadmillCrane: Upgrade
    architecture: Upgrade
    chemistry: Upgrade
    bombardTower: Upgrade
    siegeEngineers: Upgrade
    keep: Upgrade
    arrowslits: Upgrade
}

export const universityUpgrades: UniversityUpgrades = {
    masonry: new Upgrade({
        id: 'masonry',
        age: 3,
        cost: {
            wood: 175,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 50
    }),
    fortifiedWall: new Upgrade({
        id: 'fortifiedWall',
        age: 3,
        cost: {
            wood: 100,
            food: 200,
            gold: 0,
            stone: 0
        },
        duration: 50
    }),
    ballistics: new Upgrade({
        id: 'ballistics',
        age: 3,
        cost: {
            wood: 300,
            food: 0,
            gold: 175,
            stone: 0
        },
        duration: 60
    }),
    guardTower: new Upgrade({
        id: 'guardTower',
        age: 3,
        cost: {
            wood: 250,
            food: 100,
            gold: 0,
            stone: 0
        },
        duration: 30
    }),
    heatedShot: new Upgrade({
        id: 'heatedShot',
        age: 3,
        cost: {
            wood: 350,
            food: 0,
            gold: 100,
            stone: 0
        },
        duration: 30
    }),
    murderHoles: new Upgrade({
        id: 'murderHoles',
        age: 3,
        cost: {
            wood: 0,
            food: 200,
            gold: 0,
            stone: 100
        },
        duration: 60
    }),
    treadmillCrane: new Upgrade({
        id: 'treadmillCrane',
        age: 3,
        cost: {
            wood: 200,
            food: 300,
            gold: 0,
            stone: 0
        },
        duration: 50
    }),
    architecture: new Upgrade({
        id: 'architecture',
        age: 4,
        cost: {
            wood: 200,
            food: 300,
            gold: 0,
            stone: 0
        },
        duration: 70
    }),
    chemistry: new Upgrade({
        id: 'chemistry',
        age: 4,
        cost: {
            wood: 0,
            food: 300,
            gold: 200,
            stone: 0
        },
        duration: 100
    }),
    bombardTower: new Upgrade({
        id: 'bombardTower',
        age: 4,
        cost: {
            wood: 400,
            food: 800,
            gold: 0,
            stone: 0
        },
        duration: 60
    }),
    siegeEngineers: new Upgrade({
        id: 'siegeEngineers',
        age: 4,
        cost: {
            wood: 600,
            food: 500,
            gold: 0,
            stone: 0
        },
        duration: 45
    }),
    keep: new Upgrade({
        id: 'keep',
        age: 4,
        cost: {
            wood: 350,
            food: 500,
            gold: 0,
            stone: 0
        },
        duration: 75
    }),
    arrowslits: new Upgrade({
        id: 'arrowslits',
        age: 4,
        cost: {
            wood: 250,
            food: 250,
            gold: 0,
            stone: 0
        },
        duration: 25
    }),
}

chainTechs([universityUpgrades.masonry, universityUpgrades.architecture])
chainTechs([universityUpgrades.guardTower, universityUpgrades.keep])