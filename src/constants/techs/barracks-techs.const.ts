import { UnitType, ArmorType, EffectOrder } from "../../models/techs.model";
import { Unit, AttackType } from "../../models/unit.model";
import { Upgrade } from "../../models/upgrade.model";
import { chainTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

interface BarracksUnits {
    militia: Unit
    manAtArms: Unit
    longSwordsman: Unit
    twoHandedSwordsman: Unit
    champion: Unit
    spearman: Unit
    pikeman: Unit
    halberdier: Unit
    eagleScout: Unit
    eagleWarrior: Unit
    eliteEagleWarrior: Unit
}

interface BarracksUpgrades {
    supplies: Upgrade,
    squires: Upgrade,
    arson: Upgrade
}

export const barracksUnits: BarracksUnits = {
    militia: new Unit({
        id: 'militia',
        wikiUrl: 'Militia_(Age_of_Empires_II)',
        age: 1,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 4, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry }
            ],
            movementSpeed: .9,
            lineOfSight: 4,
        },
        duration: 21
    }),
    manAtArms: new Unit({
        id: 'manAtArms',
        wikiUrl: 'Man-At-Arms_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 6, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry }
            ],
            movementSpeed: .9,
            lineOfSight: 4,
        },
        duration: 21
    }),
    longSwordsman: new Unit({
        id: 'longSwordsman',
        wikiUrl: 'Long_Swordsman_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 9, type: ArmorType.melee },
                { value: 6, type: ArmorType.eagleWarrior },
                { value: 3, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry }
            ],
            movementSpeed: .9,
            lineOfSight: 4,
        },
        duration: 21
    }),
    twoHandedSwordsman: new Unit({
        id: 'twoHandedSwordsman',
        wikiUrl: 'Two-Handed_Swordsman',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 8, type: ArmorType.eagleWarrior },
                { value: 4, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry }
            ],
            movementSpeed: .9,
            lineOfSight: 5,
        },
        duration: 21
    }),
    champion: new Unit({
        id: 'champion',
        wikiUrl: 'Champion',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 13, type: ArmorType.melee },
                { value: 8, type: ArmorType.eagleWarrior },
                { value: 4, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry }
            ],
            movementSpeed: .9,
            lineOfSight: 5,
        },
        duration: 21
    }),
    spearman: new Unit({
        id: 'spearman',
        wikiUrl: 'Spearman_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 3,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 15, type: ArmorType.cavalry },
                { value: 15, type: ArmorType.warElephant },
                { value: 12, type: ArmorType.camel },
                { value: 9, type: ArmorType.ship },
                { value: 9, type: ArmorType.fishingShip },
                { value: 4, type: ArmorType.mameluke },
                { value: 1, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.spearman }
            ],
            movementSpeed: 1,
            lineOfSight: 4,
        },
        duration: 22
    }),
    pikeman: new Unit({
        id: 'pikeman',
        wikiUrl: 'Pikeman_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 3,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 22, type: ArmorType.cavalry },
                { value: 25, type: ArmorType.warElephant },
                { value: 18, type: ArmorType.camel },
                { value: 16, type: ArmorType.ship },
                { value: 16, type: ArmorType.fishingShip },
                { value: 11, type: ArmorType.mameluke },
                { value: 1, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.spearman }
            ],
            movementSpeed: 1,
            lineOfSight: 4
        },
        duration: 22
    }),
    halberdier: new Unit({
        id: 'halberdier',
        wikiUrl: 'Halberdier_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 35,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 3,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 6, type: ArmorType.melee },
                { value: 32, type: ArmorType.cavalry },
                { value: 28, type: ArmorType.warElephant },
                { value: 26, type: ArmorType.camel },
                { value: 17, type: ArmorType.ship },
                { value: 17, type: ArmorType.fishingShip },
                { value: 11, type: ArmorType.mameluke },
                { value: 1, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.spearman }
            ],
            movementSpeed: 1,
            lineOfSight: 4
        },
        duration: 22
    }),
    eagleScout: new Unit({
        id: 'eagleScout',
        wikiUrl: 'Eagle_Scout_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 8, type: ArmorType.monk },
                { value: 3, type: ArmorType.siegeWeapon },
                { value: 2, type: ArmorType.cavalry },
                { value: 1, type: ArmorType.camel },
                { value: 1, type: ArmorType.ship },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.eagleWarrior }
            ],
            movementSpeed: 1.1,
            lineOfSight: 5
        },
        duration: 35
    }),
    eagleWarrior: new Unit({
        id: 'eagleWarrior',
        wikiUrl: 'Eagle_Warrior',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 8, type: ArmorType.monk },
                { value: 3, type: ArmorType.siegeWeapon },
                { value: 3, type: ArmorType.cavalry },
                { value: 1, type: ArmorType.camel },
                { value: 1, type: ArmorType.ship },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.eagleWarrior }
            ],
            movementSpeed: 1.15,
            lineOfSight: 6
        },
        duration: 35
    }),
    eliteEagleWarrior: new Unit({
        id: 'eliteEagleWarrior',
        wikiUrl: 'Elite_Eagle_Warrior',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 20,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 9, type: ArmorType.melee },
                { value: 10, type: ArmorType.monk },
                { value: 5, type: ArmorType.siegeWeapon },
                { value: 4, type: ArmorType.cavalry },
                { value: 3, type: ArmorType.camel },
                { value: 2, type: ArmorType.ship },
                { value: 2, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.eagleWarrior }
            ],
            movementSpeed: 1.3,
            lineOfSight: 6
        },
        duration: 20
    })
}

chainTechs([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion])
chainTechs([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier])
chainTechs([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior])

export const barracksUpgrade: BarracksUpgrades = {
    supplies: new Upgrade({
        id: 'supplies',
        wikiUrl: 'Supplies_(Age_of_Empires_II)',
        age: 2,
        cost: {
            wood: 0,
            food: 75,
            gold: 75,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.cost.food -= 15
            }
        }],
        duration: 35
    }),
    squires: new Upgrade({
        id: 'squires',
        wikiUrl: 'Squires_(Age_of_Empires_II)',
        age: 3,
        cost: {
            wood: 0,
            food: 100,
            gold: 0,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
            }
        }],
        duration: 40
    }),
    arson: new Upgrade({
        id: 'arson',
        wikiUrl: 'arson_(Age_of_Empires_II)',
        age: 3,
        cost: {
            wood: 0,
            food: 150,
            gold: 50,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(2, ArmorType.standardBuilding)
            }
        }],
        duration: 25
    }),
}