import { Unit, AttackType } from './../../models/unit.model'
import { ArmorType, EffectOrder, UnitType } from "../../models/techs.model";
import { CAPACITIES } from '../../models/capacity.model';
import { Upgrade } from '../../models/upgrade.model';
import { chainTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

interface DockUnits {
    fishingShip: Unit
    transportShip: Unit
    tradeCog: Unit
    galley: Unit
    fireGalley: Unit
    demolitionRaft: Unit
    warGalley: Unit
    fireShip: Unit
    demotionShip: Unit
    galleon: Unit
    fastFireShip: Unit
    heavyDemolitionShip: Unit
    cannonGalleon: Unit
    eliteCannonGalleon: Unit
}

interface DockUpgrades {
    gillnets: Upgrade
    careening: Upgrade
    dryDock: Upgrade
    shipwright: Upgrade
}

export const dockUnits: DockUnits = {
    fishingShip: new Unit({
        id: 'fishingShip',
        wikiUrl: 'Fishing_Ship_(Age_of_Empires_II)',
        age: 1,
        unitType: UnitType.civilian,
        cost: {
            wood: 75,
            food: 0,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 60,
            attackComponents: [],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.fishingShip },
            ],
            movementSpeed: 1.26,
            lineOfSight: 5
        },
        duration: 40
    }),
    transportShip: new Unit({
        id: 'transportShip',
        wikiUrl: 'Transport_Ship_(Age_of_Empires_II)',
        age: 1,
        unitType: UnitType.civilian,
        cost: {
            wood: 125,
            food: 0,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 100,
            attackComponents: [],
            armorComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
            ],
            movementSpeed: 1.45,
            lineOfSight: 5
        },
        duration: 46
    }),
    tradeCog: new Unit({
        id: 'tradeCog',
        wikiUrl: 'Trade_Cog',
        age: 2,
        unitType: UnitType.civilian,
        cost: {
            wood: 100,
            food: 0,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 80,
            attackComponents: [],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
            ],
            movementSpeed: 1.32,
            lineOfSight: 6
        },
        duration: 36
    }),
    galley: new Unit({
        id: 'galley',
        wikiUrl: 'Galley_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 120,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: 1,
            rateOfFire: 3,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 8, type: ArmorType.ship },
                { value: 8, type: ArmorType.fishingShip },
                { value: 6, type: ArmorType.building },
                { value: 3, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
            ],
            movementSpeed: 1.43,
            lineOfSight: 7
        },
        duration: 60
    }),
    fireGalley: new Unit({
        id: 'fireGalley',
        wikiUrl: 'Fire_Galley_(Age_of_Empires_II)',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 100,
            attackType: AttackType.projectile,
            range: 2.49,
            accuracy: 1,
            rateOfFire: .25,
            attackComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 3, type: ArmorType.ship },
                { value: 1, type: ArmorType.turtleShip },
                { value: 1, type: ArmorType.building },
                { value: 1, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 6, type: ArmorType.ship },
            ],
            movementSpeed: 1.3,
            lineOfSight: 5
        },
        duration: 65
    }),
    demolitionRaft: new Unit({
        id: 'demolitionRaft',
        wikiUrl: 'Demolition_Raft',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 70,
            food: 0,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 45,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 90, type: ArmorType.melee },
                { value: 180, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 1, type: ArmorType.ship },
            ],
            movementSpeed: 1.5,
            lineOfSight: 6,
            capacities: [CAPACITIES.selfDestruction]
        },
        duration: 45
    }),
    warGalley: new Unit({
        id: 'warGalley',
        wikiUrl: 'War_Galley_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 135,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            rateOfFire: 3,
            attackComponents: [
                { value: 7, type: ArmorType.pierce },
                { value: 9, type: ArmorType.ship },
                { value: 9, type: ArmorType.fishingShip },
                { value: 7, type: ArmorType.building },
                { value: 4, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
            ],
            movementSpeed: 1.43,
            lineOfSight: 8
        },
        duration: 36
    }),
    fireShip: new Unit({
        id: 'fireShip',
        wikiUrl: 'Fire_Ship_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 120,
            attackType: AttackType.projectile,
            range: 2.49,
            accuracy: 1,
            rateOfFire: .25,
            attackComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 3, type: ArmorType.ship },
                { value: 2, type: ArmorType.turtleShip },
                { value: 2, type: ArmorType.building },
                { value: 3, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 6, type: ArmorType.ship },
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 36
    }),
    demotionShip: new Unit({
        id: 'demolitionShip',
        wikiUrl: 'Demolition_Ship',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 70,
            food: 0,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 60,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 110, type: ArmorType.melee },
                { value: 220, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 3, type: ArmorType.ship },
            ],
            movementSpeed: 1.6,
            lineOfSight: 6,
            capacities: [CAPACITIES.selfDestruction]
        },
        duration: 31
    }),
    galleon: new Unit({
        id: 'galleon',
        wikiUrl: 'Galleon_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 165,
            attackType: AttackType.projectile,
            range: 7,
            accuracy: 1,
            rateOfFire: 3,
            attackComponents: [
                { value: 8, type: ArmorType.pierce },
                { value: 11, type: ArmorType.ship },
                { value: 11, type: ArmorType.fishingShip },
                { value: 8, type: ArmorType.building },
                { value: 4, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
            ],
            movementSpeed: 1.43,
            lineOfSight: 9
        },
        duration: 36
    }),
    fastFireShip: new Unit({
        id: 'fastFireShip',
        wikiUrl: 'Fast_Fire_Ship',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 140,
            attackType: AttackType.projectile,
            range: 2.49,
            accuracy: 1,
            rateOfFire: .25,
            attackComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 4, type: ArmorType.ship },
                { value: 3, type: ArmorType.turtleShip },
                { value: 3, type: ArmorType.building },
                { value: 4, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 9, type: ArmorType.ship },
            ],
            movementSpeed: 1.43,
            lineOfSight: 6
        },
        duration: 36
    }),
    heavyDemolitionShip: new Unit({
        id: 'heavyDemolitionShip',
        wikiUrl: 'Heavy_Demolition_Ship',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 70,
            food: 0,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 70,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 140, type: ArmorType.melee },
                { value: 280, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 5, type: ArmorType.pierce },
                { value: 5, type: ArmorType.ship },
            ],
            movementSpeed: 1.6,
            lineOfSight: 6,
            capacities: [CAPACITIES.selfDestruction]
        },
        duration: 31
    }),
    cannonGalleon: new Unit({
        id: 'cannonGalleon',
        wikiUrl: 'Cannon_Galleon',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 150,
            stone: 0
        },
        stats: {
            health: 120,
            attackType: AttackType.projectile,
            range: 13,
            accuracy: 1,
            rateOfFire: 10,
            attackComponents: [
                { value: 50, type: ArmorType.melee },
                { value: 200, type: ArmorType.building },
                { value: 25, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
                { value: 0, type: ArmorType.gunpowderUnit },
            ],
            capacities: [{ ...CAPACITIES.blastAttack, blastRadius: .25 }],
            movementSpeed: 1.1,
            lineOfSight: 15
        },
        duration: 46
    }),
    eliteCannonGalleon: new Unit({
        id: 'eliteCannonGalleon',
        wikiUrl: 'Elite_Cannon_Galleon',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 150,
            stone: 0
        },
        stats: {
            health: 150,
            attackType: AttackType.projectile,
            range: 15,
            accuracy: 1,
            rateOfFire: 10,
            attackComponents: [
                { value: 60, type: ArmorType.melee },
                { value: 275, type: ArmorType.building },
                { value: 25, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
                { value: 0, type: ArmorType.gunpowderUnit },
            ],
            capacities: [{ ...CAPACITIES.blastAttack, blastRadius: .3 }],
            movementSpeed: 1.1,
            lineOfSight: 17
        },
        duration: 46
    }),
}

chainTechs([dockUnits.fishingShip])
chainTechs([dockUnits.transportShip])
chainTechs([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon])
chainTechs([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip])
chainTechs([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip])
chainTechs([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon])

export const dockUpgrades: DockUpgrades = {
    gillnets: new Upgrade({
        id: 'gillnets',
        wikiUrl: 'Gillnets',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 45
    }),
    careening: new Upgrade({
        id: 'careening',
        wikiUrl: 'Careening',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 250,
            gold: 150,
            stone: 0
        },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.pierce)
            }
        }],
        duration: 50
    }),
    shipwright: new Upgrade({
        id: 'shipwright',
        wikiUrl: 'Shipwright',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 1000,
            gold: 300,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.cost.wood = multiplyNumber(unit.cost.wood, 1 - .2)
                unit.duration = multiplyNumber(unit.duration, 1/1.54)
            }
        }],
        duration: 60
    }),
    dryDock: new Upgrade({
        id: 'dryDock',
        wikiUrl: 'DryDock',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 600,
            gold: 400,
            stone: 0
        },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.15)
            }
        }],
        duration: 60
    }),
}

chainTechs([dockUpgrades.careening, dockUpgrades.dryDock])