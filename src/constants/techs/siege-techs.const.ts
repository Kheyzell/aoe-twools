import { CAPACITIES } from "../../models/capacity.model";
import { ArmorType, UnitType } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import { chainTechs } from "../../utils/techs.utils";

interface SiegeUnits {
    batteringRam: Unit
    cappedRam: Unit
    siegeRam: Unit
    armoredElephant: Unit
    siegeElephant: Unit
    mangonel: Unit
    onager: Unit
    siegeOnager: Unit
    scorpion: Unit
    heavyScorpion: Unit
    siegeTower: Unit
    bombardCannon: Unit
}

export const siegeUnits: SiegeUnits = {
    batteringRam: new Unit({
        id: 'batteringRam',
        wikiUrl: 'Battering_Ram_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 175,
            rateOfFire: 5,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 125, type: ArmorType.building },
                { value: 40, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: -3, type: ArmorType.melee },
                { value: 180, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.ram }
            ],
            movementSpeed: .5,
            lineOfSight: 3
        },
        duration: 36
    }),
    cappedRam: new Unit({
        id: 'cappedRam',
        wikiUrl: 'Capped_Ram',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 200,
            rateOfFire: 5,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 150, type: ArmorType.building },
                { value: 50, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: -3, type: ArmorType.melee },
                { value: 190, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 1, type: ArmorType.ram }
            ],
            movementSpeed: .5,
            lineOfSight: 3
        },
        duration: 36
    }),
    siegeRam: new Unit({
        id: 'siegeRam',
        wikiUrl: 'Siege_Ram',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 270,
            rateOfFire: 5,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 200, type: ArmorType.building },
                { value: 65, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: -3, type: ArmorType.melee },
                { value: 195, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 2, type: ArmorType.ram }
            ],
            movementSpeed: .6,
            lineOfSight: 3
        },
        duration: 36
    }),
    armoredElephant: new Unit({
        id: 'armoredElephant',
        wikiUrl: 'Armored_Elephant_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 130,
            gold: 95,
            stone: 0
        },
        stats: {
            health: 200,
            rateOfFire: 3,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 75, type: ArmorType.building },
                { value: 25, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: -2, type: ArmorType.melee },
                { value: 140, type: ArmorType.pierce },
                { value: 7, type: ArmorType.cavalry },
                { value: 17, type: ArmorType.warElephant },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.ram }
            ],
            movementSpeed: .6,
            lineOfSight: 4
        },
        duration: 36
    }),
    siegeElephant: new Unit({
        id: 'siegeElephant',
        wikiUrl: 'Siege_Elephant_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 130,
            gold: 95,
            stone: 0
        },
        stats: {
            health: 250,
            rateOfFire: 3,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 105, type: ArmorType.building },
                { value: 35, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: -2, type: ArmorType.melee },
                { value: 150, type: ArmorType.pierce },
                { value: 8, type: ArmorType.cavalry },
                { value: 18, type: ArmorType.warElephant },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 2, type: ArmorType.ram }
            ],
            movementSpeed: .6,
            lineOfSight: 4
        },
        duration: 36
    }),
    mangonel: new Unit({
        id: 'mangonel',
        wikiUrl: 'Mangonel_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 135,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 6,
            range: 7,
            accuracy: 1,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 40, type: ArmorType.melee },
                { value: 35, type: ArmorType.building },
                { value: 12, type: ArmorType.siegeWeapon },
                { value: 40, type: ArmorType.hussiteWagon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
            ],
            movementSpeed: .6,
            lineOfSight: 9
        },
        duration: 46
    }),
    onager: new Unit({
        id: 'onager',
        wikiUrl: 'Onager_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 135,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 6,
            range: 8,
            accuracy: 1,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 50, type: ArmorType.melee },
                { value: 45, type: ArmorType.building },
                { value: 12, type: ArmorType.siegeWeapon },
                { value: 50, type: ArmorType.hussiteWagon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 7, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
            ],
            movementSpeed: .6,
            lineOfSight: 10
        },
        duration: 46
    }),
    siegeOnager: new Unit({
        id: 'siegeOnager',
        wikiUrl: 'Siege_Onager',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 135,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 6,
            range: 8,
            accuracy: 1,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 75, type: ArmorType.melee },
                { value: 60, type: ArmorType.building },
                { value: 12, type: ArmorType.siegeWeapon },
                { value: 75, type: ArmorType.hussiteWagon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
            ],
            movementSpeed: .6,
            lineOfSight: 10
        },
        duration: 46
    }),
    scorpion: new Unit({
        id: 'scorpion',
        wikiUrl: 'Scorpion',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 3.6,
            range: 7,
            accuracy: 1,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 12, type: ArmorType.pierce },
                { value: 6, type: ArmorType.warElephant },
                { value: 2, type: ArmorType.building },
                { value: 1, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 7, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
            ],
            capacities: [CAPACITIES.projectilePassThrough],
            movementSpeed: .65,
            lineOfSight: 9
        },
        duration: 30
    }),
    heavyScorpion: new Unit({
        id: 'heavyScorpion',
        wikiUrl: 'Heavy_Scorpion',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 3.6,
            range: 7,
            accuracy: 1,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 16, type: ArmorType.pierce },
                { value: 8, type: ArmorType.warElephant },
                { value: 4, type: ArmorType.building },
                { value: 2, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
            ],
            capacities: [CAPACITIES.projectilePassThrough],
            movementSpeed: .65,
            lineOfSight: 9
        },
        duration: 30
    }),
    siegeTower: new Unit({
        id: 'siegeTower',
        wikiUrl: 'Siege_Tower_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 160,
            stone: 0
        },
        stats: {
            health: 220,
            attackComponents: [],
            armorComponents: [
                { value: -2, type: ArmorType.melee },
                { value: 100, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.ram },
            ],
            movementSpeed: .8,
            lineOfSight: 8
        },
        duration: 36
    }),
    bombardCannon: new Unit({
        id: 'bombardCannon',
        wikiUrl: 'Bombard_Cannon',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 225,
            food: 0,
            gold: 225,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 6.5,
            range: 12,
            accuracy: 1,
            attackType: AttackType.projectile,
            attackComponents: [
                { value: 40, type: ArmorType.melee },
                { value: 200, type: ArmorType.building },
                { value: 40, type: ArmorType.ship },
                { value: 40, type: ArmorType.fishingShip },
                { value: 40, type: ArmorType.stoneDefense },
                { value: 20, type: ArmorType.siegeWeapon },
                { value: 40, type: ArmorType.hussiteWagon },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 5, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.gunpowderUnit },
            ],
            movementSpeed: .7,
            lineOfSight: 14
        },
        duration: 56
    }),
}

chainTechs([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam])
chainTechs([siegeUnits.armoredElephant, siegeUnits.siegeElephant])
chainTechs([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager])
chainTechs([siegeUnits.scorpion, siegeUnits.heavyScorpion])
chainTechs([siegeUnits.siegeTower])
chainTechs([siegeUnits.bombardCannon])