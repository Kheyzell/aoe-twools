import { siciliansUniqueUnits } from "..";
import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model";
import { Unit, AttackType } from "../../models/unit.model";
import { Upgrade } from "../../models/upgrade.model";
import { chainTechs } from "../../utils/techs.utils";
import { addNumber, multiplyNumber } from "../../utils/utils";
import { barracksUnits } from "./barracks-techs.const";
import { stableUnits } from "./stable-techs.const";

interface TownCenterUnits {
    villager: Unit
}

interface TownCenterUpgrades {
    feudalAge: Upgrade,
    loom: Upgrade,
    castleAge: Upgrade,
    wheelbarrow: Upgrade,
    townWatch: Upgrade,
    imperialAge: Upgrade,
    handCart: Upgrade,
    townPatrol: Upgrade,
}

export const townCenterUnits: TownCenterUnits = {
    villager: new Unit({
        id: 'villager',
        wikiUrl: 'Villager_(Age_of_Empires_II)',
        age: 1,
        unitType: UnitType.civilian,
        cost: {
            wood: 0,
            food: 50,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 25,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 6, type: ArmorType.stoneDefense },
                { value: 3, type: ArmorType.building }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce }
            ],
            movementSpeed: .8,
            lineOfSight: 4,
        },
        duration: 25
    })
}

export const townCenterUpgrade: TownCenterUpgrades = {
    feudalAge: new Upgrade({
        id: 'feudalAge',
        wikiUrl: 'FeudalAge',
        age: 1,
        cost: {
            wood: 0,
            food: 500,
            gold: 0,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                if (unit.id === stableUnits.scoutCavalry.id) {
                    unit.stats.attackComponents.find(attack => attack.type === ArmorType.melee)!.value += 2
                    unit.stats.movementSpeed = addNumber(unit.stats.movementSpeed, .35)
                    unit.stats.lineOfSight += 2
                }
                if (unit.id === barracksUnits.eagleScout.id) {
                    unit.stats.attackComponents.find(attack => attack.type === ArmorType.melee)!.value += 3
                }
            }
        }],
        duration: 130
    }),
    loom: new Upgrade({
        id: 'loom',
        wikiUrl: 'Loom',
        age: 1,
        cost: {
            wood: 0,
            food: 0,
            gold: 50,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.health += 15
                unit.stats.armorComponents.find(armor => armor.type === ArmorType.melee)!.value += 1
                unit.stats.armorComponents.find(armor => armor.type === ArmorType.pierce)!.value += 2
            }
        }],
        duration: 25
    }),
    castleAge: new Upgrade({
        id: 'castleAge',
        wikiUrl: 'CastleAge',
        age: 2,
        cost: {
            wood: 0,
            food: 800,
            gold: 200,
            stone: 0
        },
        duration: 160
    }),
    wheelbarrow: new Upgrade({
        id: 'wheelbarrow',
        wikiUrl: 'Wheelbarrow',
        age: 2,
        cost: {
            wood: 50,
            food: 175,
            gold: 0,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
            }
        }],
        duration: 75
    }),
    townWatch: new Upgrade({
        id: 'townWatch',
        wikiUrl: 'TownWatch',
        age: 2,
        cost: {
            wood: 0,
            food: 75,
            gold: 0,
            stone: 0
        },
        duration: 25
    }),
    imperialAge: new Upgrade({
        id: 'imperialAge',
        wikiUrl: 'ImperialAge',
        age: 3,
        cost: {
            wood: 0,
            food: 1000,
            gold: 800,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                if (unit.id === stableUnits.lightCavalry.id) {
                    unit.stats.lineOfSight += 2
                }
            }
        }],
        duration: 190
    }),
    handCart: new Upgrade({
        id: 'handCart',
        wikiUrl: 'HandCart',
        age: 3,
        cost: {
            wood: 200,
            food: 300,
            gold: 475,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
            }
        }],
        duration: 55
    }),
    townPatrol: new Upgrade({
        id: 'townPatrol',
        wikiUrl: 'TownPatrol',
        age: 3,
        cost: {
            wood: 0,
            food: 300,
            gold: 100,
            stone: 0
        },
        duration: 40
    }),
}

chainTechs([townCenterUpgrade.feudalAge, townCenterUpgrade.castleAge, townCenterUpgrade.imperialAge])
chainTechs([townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart])
chainTechs([townCenterUpgrade.townWatch, townCenterUpgrade.townPatrol])