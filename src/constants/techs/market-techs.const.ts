import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model";
import { Unit } from "../../models/unit.model";
import { Upgrade } from "../../models/upgrade.model";
import { chainTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

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
        wikiUrl: 'Trade_Cart',
        age: 2,
        unitType: UnitType.civilian,
        cost: {
            wood: 100,
            food: 0,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 70,
            attackComponents: [],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
            ],
            movementSpeed: 1,
            lineOfSight: 7
        },
        duration: 51
    })
}

export const marketUpgrade: MarketUpgrades = {
    coinage: new Upgrade({
        id: 'coinage',
        wikiUrl: 'Coinage',
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
        wikiUrl: 'Caravan',
        age: 3,
        cost: {
            wood: 0,
            food: 200,
            gold: 200,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.5)
            }
        }],
        duration: 40
    }),
    banking: new Upgrade({
        id: 'banking',
        wikiUrl: 'Banking',
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
        wikiUrl: 'Guilds',
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