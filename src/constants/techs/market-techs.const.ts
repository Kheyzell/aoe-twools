import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface MarketUnits {
    tradeCart: Unit
}

interface MarketUpgrades {
    coinage: Upgrade,
    caravan: Upgrade,
    banking: Upgrade,
    guilds: Upgrade,
}

export const marketUnits: MarketUnits = {
    tradeCart: new Unit({
        id: 'tradeCart',
        age: 2,
        unitType: UnitType.civilian,
        cost: {
            wood: 100,
            food: 0,
            gold: 50,
            stone: 0
        },
        duration: 51
    })
}

export const marketUpgrade: MarketUpgrades = {
    coinage: new Upgrade({
        id: 'coinage',
        age: 3,
        cost: {
            wood: 0,
            food: 200,
            gold: 100,
            stone: 0
        },
        duration: 70
    }),
    caravan: new Upgrade({
        id: 'caravan',
        age: 3,
        cost: {
            wood: 0,
            food: 200,
            gold: 200,
            stone: 0
        },
        duration: 40
    }),
    banking: new Upgrade({
        id: 'banking',
        age: 4,
        cost: {
            wood: 0,
            food: 300,
            gold: 200,
            stone: 0
        },
        duration: 70
    }),
    guilds: new Upgrade({
        id: 'guilds',
        age: 4,
        cost: {
            wood: 0,
            food: 300,
            gold: 200,
            stone: 0
        },
        duration: 50
    }),
}

chainTechs([marketUpgrade.coinage, marketUpgrade.banking])