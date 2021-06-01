import { Cost, TechType, Unit, Upgrade } from "./techs.model";

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
    resourceGold
}

export interface Bonus {
    id: string
    description: string
    effectType: EffectType
    value: number | { age1?: number, age2?: number, age3?: number, age4?: number } | null
    affectedUnits: Unit[]
    affectedUpgrades: Upgrade[]
    hideInUnitRecap?: boolean // some bonuses would not be relevant enough to be taken into account in forming the list of units affected by bonuses
    team?: boolean
}

export class UniqueTech implements Bonus, Upgrade {
    id: string
    name: string
    age: number
    cost: Cost
    duration: number
    type: TechType
    unique?: boolean
    description: string
    effectType: EffectType
    value: number | { age1?: number, age2?: number, age3?: number, age4?: number } | null
    affectedUnits: Unit[]
    affectedUpgrades: Upgrade[]

    constructor(data: any) {
        this.type = TechType.uniqueTech
        this.id = data.id
        this.name = data.name
        this.age = data.age
        this.cost = data.cost
        this.duration = data.duration
        this.unique = true
        this.description = data.description
        this.effectType = data.effectType
        this.value = data.value
        this.affectedUnits = data.affectedUnits
        this.affectedUpgrades = data.affectedUpgrades
    }
}