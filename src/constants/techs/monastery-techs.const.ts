import { AttackType, Unit } from './../../models/unit.model'
import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model";
import { CAPACITIES } from '../../models/capacity.model';
import { Upgrade } from '../../models/upgrade.model';
import { chainTechs } from "../../utils/techs.utils";
import { addNumber, multiplyNumber } from "../../utils/utils";

interface MonasteryUnits {
    monk: Unit
}

interface MonasteryUpgrades {
    redemption: Upgrade,
    atonement: Upgrade,
    herbalMedecine: Upgrade,
    devotion: Upgrade,
    heresy: Upgrade,
    sanctity: Upgrade,
    fervor: Upgrade,
    faith: Upgrade,
    illumination: Upgrade,
    blockPrinting: Upgrade,
    theocracy: Upgrade
}

export const monasteryUnits: MonasteryUnits = {
    monk: new Unit({
        id: 'monk',
        wikiUrl: 'Monk_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.civilian,
        cost: {
            wood: 0,
            food: 0,
            gold: 100,
            stone: 0
        },
        stats: {
            health: 30,
            range: 9,
            rateOfFire: 62,
            accuracy: .26,
            attackType: AttackType.melee,
            attackComponents: [],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.monk },
            ],
            movementSpeed: .7,
            lineOfSight: 11,
            capacities: [CAPACITIES.conversion, CAPACITIES.healing]
        },
        duration: 51
    })
}

export const monasteryUpgrade: MonasteryUpgrades = {
    redemption: new Upgrade({
        id: 'redemption',
        wikiUrl: 'Redemption',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 475,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.capacities.push(CAPACITIES.redemption)
            }
        }],
        duration: 50
    }),
    atonement: new Upgrade({
        id: 'atonement',
        wikiUrl: 'Atonement',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 325,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.capacities.push(CAPACITIES.atonement)
            }
        }],
        duration: 40
    }),
    herbalMedecine: new Upgrade({
        id: 'herbalMedicine',
        wikiUrl: 'HerbalMedicine',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 200,
            stone: 0
        },
        duration: 35
    }),
    devotion: new Upgrade({
        id: 'devotion',
        wikiUrl: 'Devotion',
        age: 3,
        cost: {
            wood: 0,
            food: 100,
            gold: 150,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.conversionMinCyclesResistance = unit.stats.conversionMinCyclesResistance + 1
                unit.stats.conversionMaxCyclesResistance = unit.stats.conversionMaxCyclesResistance + 1
            }
        }],
        duration: 40
    }),
    heresy: new Upgrade({
        id: 'heresy',
        wikiUrl: 'Heresy',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 1000,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.capacities.push(CAPACITIES.heresy)
            }
        }],
        duration: 60
    }),
    sanctity: new Upgrade({
        id: 'sanctity',
        wikiUrl: 'Sanctity',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 120,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.health += 15
            }
        }],
        duration: 60
    }),
    fervor: new Upgrade({
        id: 'fervor',
        wikiUrl: 'Fervor',
        age: 3,
        cost: {
            wood: 0,
            food: 0,
            gold: 140,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.15)
            }
        }],
        duration: 50
    }),
    faith: new Upgrade({
        id: 'faith',
        wikiUrl: 'Faith',
        age: 4,
        cost: {
            wood: 0,
            food: 550,
            gold: 750,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.conversionResistance = (unit.stats.conversionResistance || 0) + 4
                unit.stats.conversionMinCyclesResistance = unit.stats.conversionMinCyclesResistance + 4
                unit.stats.conversionMaxCyclesResistance = unit.stats.conversionMaxCyclesResistance + 4
            }
        }],
        duration: 60
    }),
    illumination: new Upgrade({
        id: 'illumination',
        wikiUrl: 'Illumination',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 120,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.rateOfFire = multiplyNumber(unit.stats.rateOfFire, addNumber(1, -.46))
                unit.stats.attackRate = 1/unit.stats.rateOfFire
            }
        }],
        duration: 65
    }),
    blockPrinting: new Upgrade({
        id: 'blockPrinting',
        wikiUrl: 'BlockPrinting',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 200,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.range! += 3
                unit.stats.lineOfSight += 3
            }
        }],
        duration: 45
    }),
    theocracy: new Upgrade({
        id: 'theocracy',
        wikiUrl: 'Theocracy',
        age: 4,
        cost: {
            wood: 0,
            food: 0,
            gold: 200,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.capacities.push(CAPACITIES.theocracy)
            }
        }],
        duration: 75
    }),
}

export const relicsUpgrade = {
    relic1: new Upgrade({ id: 'relic1' }),
    relic2: new Upgrade({ id: 'relic2' }),
    relic3: new Upgrade({ id: 'relic3' }),
    relic4: new Upgrade({ id: 'relic4' }),
}

chainTechs([relicsUpgrade.relic1, relicsUpgrade.relic2, relicsUpgrade.relic3, relicsUpgrade.relic4])