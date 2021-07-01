import { CivTechTree, Cost, Effect, TechType } from "./techs.model";
import { Unit } from "./unit.model";
import { Upgrade } from "./upgrade.model";


export enum EffectType {
    miscallenous,
    uniqueUnit,
    uniqueBuilding,
    constructionSpeed,
    freeUpgrade,
    discount,
    discoutWood,
    discoutFood,
    discoutGold,
    discoutStone,
    discoutWoodValue,
    health,
    healthPercent,
    regen,
    armor,
    meleeArmor,
    pierceArmor,
    damage,
    damagePercent,
    fireRate,
    range,
    rangePercent,
    minimumRange,
    accuracy,
    lineOfSight,
    lineOfSightPercent,
    movementSpeed,
    creationSpeed,
    convertionResistance,
    resourceGold,
    resourceStone
}

export interface Bonus {
    id: string
    civ?: CivTechTree
    effectType: EffectType
    value: number | { age1?: number, age2?: number, age3?: number, age4?: number } | null
    effects?: Effect[]
    affectedUnits: Unit[]
    affectedUpgrades: Upgrade[]
    hideInUnitRecap?: boolean // some bonuses would not be relevant enough to be taken into account in forming the list of units affected by bonuses
    team?: boolean
}

export class UniqueTech implements Bonus, Upgrade {
    id: string
    wikiUrl: string
    civ: CivTechTree
    age: number
    cost: Cost
    effects?: Effect[]
    duration: number
    type: TechType
    unique?: boolean
    description: string
    effectType: EffectType
    value: number | { age1?: number, age2?: number, age3?: number, age4?: number } | null
    affectedUnits: Unit[]
    affectedUpgrades: Upgrade[]

    constructor(data: any) {
        this.type = TechType.upgrade
        this.id = data.id
        this.wikiUrl = data.wikiUrl
        this.civ = data.civId
        this.age = data.age
        this.cost = data.cost
        this.effects = data.effects
        this.duration = data.duration
        this.unique = true
        this.description = data.description
        this.effectType = data.effectType
        this.value = data.value
        this.affectedUnits = data.affectedUnits
        this.affectedUpgrades = data.affectedUpgrades
    }
}