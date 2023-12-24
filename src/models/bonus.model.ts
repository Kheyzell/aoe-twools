import { fullTechTree } from "../constants/tech-trees/_full-tech-tree.const";
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
    value: number | { age1?: number, age2?: number, age3?: number, age4?: number } | { [key: string]: number } | null
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
    effectType: EffectType
    value: number | { [key: string]: number } | null
    affectedUnits: Unit[]
    affectedUpgrades: Upgrade[]

    constructor(data: Partial<UniqueTech>) {
        this.type = TechType.upgrade
        this.id = data.id ?? ""
        this.wikiUrl = data.wikiUrl ?? ""
        this.civ = data.civ ?? fullTechTree
        this.age = data.age ?? 3
        this.cost = data.cost ?? { wood: 0, food: 0, gold: 0, stone: 0 }
        this.effects = data.effects
        this.duration = data.duration ?? 0
        this.unique = true
        this.effectType = data.effectType ?? EffectType.miscallenous
        this.value = data.value ?? null
        this.affectedUnits = data.affectedUnits ?? []
        this.affectedUpgrades = data.affectedUpgrades ?? []
    }
}