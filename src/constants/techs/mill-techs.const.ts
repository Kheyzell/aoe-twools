import { Upgrade } from "../../models/upgrade.model";
import { chainTechs } from "../../utils/techs.utils";

interface MillUpgrades {
    horseColar: Upgrade
    heavyPlow: Upgrade
    cropRotation: Upgrade
}

export const millUpgrades: MillUpgrades = {
    horseColar: new Upgrade({
        id: 'horseCollar',
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

chainTechs([millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation])