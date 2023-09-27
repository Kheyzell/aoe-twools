import { Bonus, UniqueTech } from "./bonus.model"
import { Unit } from "./unit.model"
import { Upgrade } from "./upgrade.model"

export enum TechType {
    unit = 'unit',
    upgrade = 'upgrade'
}

export enum UnitType { civilian, military }

export enum ArmorType {
    discarded = 'discarded',
    melee = 'Melee',
    pierce = 'Pierce',
    infantry = 'Infantry',
    spearman = 'Spearman',
    cavalry = 'Cavalry',
    archer = 'Archer',
    cavalryArcher = 'Cavalry Archer',
    gunpowderUnit = 'Gunpowder Unit',
    warElephant = 'War elephant',
    camel = 'Camel',
    ship = 'Ship',
    fishingShip = 'Fishing Ship',
    turtleShip = 'Turtle Ship',
    mameluke = 'Mameluke',
    eagleWarrior = 'Eagle warrior',
    monk = 'Monk',
    siegeWeapon = 'Siege Weapon',
    ram = 'Ram',
    hussiteWagon = 'Hussite Wagon',
    standardBuilding = 'Standard building',
    building = 'Building',
    castle = 'Castle',
    stoneDefense = 'Stone Defense',
    wallAndGate = 'Wall And Gate',
    condottiero = 'condottiero',
    uniqueUnit = 'Unique Unit',
    trueDamage = "True Damage",
    skirmisher = "Skirmisher",
}

export interface Tech {
    id: string
    wikiUrl: string
    age: number
    cost: Cost
    unique?: boolean
    duration: number
    previousLineTech?: Tech
    nextLineTech?: Tech
    type: TechType
}

export interface Cost {
    wood: number
    food: number
    gold: number
    stone: number
}

export interface CivTechTree {
    id: string;
    crest?: string;
    wikiUrl?: string;
    bonuses: Bonus[]
    uniqueTechs: UniqueTech[]
    barracks: GroupTechTree,
    archery: GroupTechTree,
    stable: GroupTechTree,
    siege: GroupTechTree,
    castle: GroupTechTree,
    blacksmith: GroupTechTree,
    monastery: GroupTechTree,
    university: GroupTechTree,
    townCenter: GroupTechTree,
    lumberCamp: GroupTechTree,
    mill: GroupTechTree,
    miningCamp: GroupTechTree,
    market: GroupTechTree,
    dock: GroupTechTree,
}

export interface GroupTechTree {
    name?: string
    unitLines: UnitLine[]
    upgrades: UpgradePerAgeGroup
}

export interface LineTechTree {
    age1: Tech[]
    age2: Tech[]
    age3: Tech[]
    age4: Tech[]
}

export class UnitLine implements LineTechTree {
    age1: Unit[] = []
    age2: Unit[] = []
    age3: Unit[] = []
    age4: Unit[] = []
    list: Unit[] = []

    constructor(units: Unit[]) {
        this.list = units
        units.forEach(unit => {
            switch (unit.age) {
                case 1:
                    this.age1.push(unit)
                    break;
                case 2:
                    this.age2.push(unit)
                    break;
                case 3:
                    this.age3.push(unit)
                    break;
                case 4:
                    this.age4.push(unit)
                    break;
            }
        })
    }
}

export class UpgradePerAgeGroup implements LineTechTree {
    age1: Upgrade[] = []
    age2: Upgrade[] = []
    age3: Upgrade[] = []
    age4: Upgrade[] = []
    list: Upgrade[] = []

    constructor(upgrades: Upgrade[]) {
        this.list = upgrades
        upgrades.forEach(upgrade => {
            switch (upgrade.age) {
                case 1:
                    this.age1.push(upgrade)
                    break;
                case 2:
                    this.age2.push(upgrade)
                    break;
                case 3:
                    this.age3.push(upgrade)
                    break;
                case 4:
                    this.age4.push(upgrade)
                    break;
            }
        })
    }
}

export type Effect = {
    order: EffectOrder
    apply: (unit: Unit, upgrades?: Upgrade[], targetedUnit?: Unit, targetUpgrades?: Upgrade[]) => void
}

export enum EffectOrder { first, last }

export function isUnit(tech: Tech): tech is Unit  {
    return tech.type === TechType.unit;
}

export function isUpgrade(tech: Tech): tech is Unit  {
    return tech.type === TechType.upgrade;
}