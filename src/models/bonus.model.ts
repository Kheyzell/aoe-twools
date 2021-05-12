import { Cost, Unit, Upgrade } from "./techs.model";

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

export interface UniqueTech extends Bonus {
    name: string,
    cost: Cost,
    duration: number
}