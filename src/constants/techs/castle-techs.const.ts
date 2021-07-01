import { AttackType, Unit } from './../../models/unit.model'
import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";
import { CAPACITIES } from '../../models/capacity.model';
import { Upgrade } from '../../models/upgrade.model';

interface CastleUnits {
    uniqueUnit: Unit
    eliteUniqueUnit: Unit
    petard: Unit
    trebuchet: Unit
}

interface CastleUpgrades {
    castleUniqueTech: Upgrade
    imperialUniqueTech: Upgrade
    hoardings: Upgrade
    sappers: Upgrade
    conscription: Upgrade
    spies: Upgrade
}

export const castleUnits: CastleUnits = {
    uniqueUnit: new Unit({
        id: 'uniqueUnit',
        age: 3,
        unique: true,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    eliteUniqueUnit: new Unit({
        id: 'eliteUniqueUnit',
        age: 4,
        unique: true,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    petard: new Unit({
        id: 'petard',
        wikiUrl: 'Petard_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 50,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 25, type: ArmorType.melee },
                { value: 900, type: ArmorType.wallAndGate },
                { value: 500, type: ArmorType.building },
                { value: 100, type: ArmorType.castle },
                { value: 60, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
            ],
            movementSpeed: .8,
            lineOfSight: 4,
            capacities: [CAPACITIES.selfDestruction]
        },
        duration: 25
    }),
    trebuchet: new Unit({
        id: 'trebuchet',
        wikiUrl: 'Trebuchet',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 200,
            stone: 0
        },
        stats: {
            health: 150,
            rateOfFire: 10,
            range: 16,
            accuracy: .8,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 200, type: ArmorType.pierce },
                { value: 250, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 150, type: ArmorType.pierce },
            ],
            movementSpeed: .8,
            lineOfSight: 19
        },
        duration: 50
    }),
}

chainTechs([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit])

export const castleUpgrades: CastleUpgrades = {
    castleUniqueTech: new Upgrade({
        id: 'castleUniqueTech',
        wikiUrl: 'CastleUniqueTech',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    imperialUniqueTech: new Upgrade({
        id: 'imperialUniqueTech',
        wikiUrl: 'ImperialUniqueTech',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    }),
    hoardings: new Upgrade({
        id: 'hoardings',
        wikiUrl: 'Hoardings',
        age: 4,
        cost: {
            wood: 400,
            food: 400,
            gold: 0,
            stone: 0
        },
        duration: 75
    }),
    sappers: new Upgrade({
        id: 'sappers',
        wikiUrl: 'Sappers',
        age: 4,
        cost: {
            wood: 0,
            food: 400,
            gold: 200,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(15, ArmorType.building)
                unit.addAttackComponent(15, ArmorType.stoneDefense)
            }
        }],
        duration: 10
    }),
    conscription: new Upgrade({
        id: 'conscription',
        wikiUrl: 'Conscription',
        age: 4,
        cost: {
            wood: 0,
            food: 150,
            gold: 150,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.duration = multiplyNumber(unit.duration, 1/1.33)
            }
        }],
        duration: 60
    }),
    spies: new Upgrade({
        id: 'spies',
        wikiUrl: 'Spies',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 1
    }),
}