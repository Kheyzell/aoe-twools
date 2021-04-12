import { Upgrade } from "../../models/techs.model";

interface MillUpgrades {
    horseColar: Upgrade
    heavyPlow: Upgrade
    cropRotation: Upgrade
}

export const millUpgrades: MillUpgrades = {
    horseColar: new Upgrade({
        id: 'horseCollar',
        name: 'Horse Collar',
        age: 2,
        cost: {
            wood: 75,
            food: 75,
            gold: 0,
            stone: 0
        },
        duration: 20
    }),
    heavyPlow: new Upgrade({
        id: 'heavyPlow',
        name: 'Heavy Plow',
        age: 3,
        cost: {
            wood: 125,
            food: 125,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
    cropRotation: new Upgrade({
        id: 'cropRotation',
        name: 'Crop Rotation',
        age: 4,
        cost: {
            wood: 250,
            food: 250,
            gold: 0,
            stone: 0
        },
        duration: 70
    }),
}