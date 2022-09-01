import { Unit } from "./unit.model";

export enum CapacityId {
    selfDestruction = "selfDestruction", conversion = "conversion", ballistics = "ballistics",
    trampleDruzhina = "trampleDruzhina", madrasahRefund = "madrasahRefund",
    redemption = "redemption",
    atonement = "atonement",
    theocracy = "theocracy",
    heresy = "heresy",
    aztecsMonkHealthBonus = "aztecsMonkHealthBonus",
    regen = "regen",
    healing = "healing",
    chargedAttack = "chargedAttack",
    fullMissedShot = "fullMissedShot",
    trampleLogistica = "trampleLogistica",
    projectileProtection = "projectileProtection",
    dismountOnDeath = "dismountOnDeath",
    ignoreArmor = "ignoreArmor",
    halfPopulation = "halfPopulation",
    reduceArmor = "reduceArmor",
    projectilePassesThroughUnits = "projectilePassesThroughUnits",
    generateGoldWhenFighting = "generateGoldWhenFighting",
    attackPassThrough = "attackPassThrough",
    swapUnit = "swapUnit",
    blastAttack = "blastAttack"
}

export const CAPACITIES = {
    selfDestruction: { id: CapacityId.selfDestruction },
    conversion: { id: CapacityId.conversion, conversionCyclesMin: 4, conversionCyclesMax: 10 } as ConvertionCapacity,
    healing: { id: CapacityId.healing, healthPerMinute: 150, range: 4 } as HealingCapacity,
    redemption: { id: CapacityId.redemption },
    atonement: { id: CapacityId.atonement },
    theocracy: { id: CapacityId.theocracy },
    heresy: { id: CapacityId.heresy },
    ballistics: { id: CapacityId.ballistics },
    trampleDruzhina: { id: CapacityId.trampleDruzhina },
    trampleLogistica: { id: CapacityId.trampleLogistica },
    madrasahRefund: { id: CapacityId.madrasahRefund, percentValue: 33 } as RefundAfterDeathCapacity,
    aztecsMonkHealthBonus: { id: CapacityId.aztecsMonkHealthBonus },
    regen: { id: CapacityId.regen, healthPerMinute: 0 } as RegenCapacity,
    chargedAttack: { id: CapacityId.chargedAttack, reloadTime: 0, damage: 0 } as ChargedAttackCapacity,
    blastAttack: { id: CapacityId.blastAttack, reloadTime: 0, damage: 0, blastRadius: 0 } as BlastAttackCapacity,
    fullMissedShot: { id: CapacityId.fullMissedShot },
    projectileProtection: { id: CapacityId.projectileProtection },
    dismountOnDeath: { id: CapacityId.dismountOnDeath, unit: new Unit({}) } as SpawnUnitOnDeathCapacity,
    ignoreArmor: { id: CapacityId.ignoreArmor },
    halfPopulation: { id: CapacityId.halfPopulation },
    reduceArmor: { id: CapacityId.reduceArmor, melee: 1, pierce: 1 } as ReduceArmorCapacity,
    projectilePassesThroughUnits: { id: CapacityId.projectilePassesThroughUnits },
    generateGoldWhenFighting: { id: CapacityId.generateGoldWhenFighting, goldPerSecond: 0 } as GenerateGoldWhenFightingCapacity,
    attackPassThrough: { id: CapacityId.attackPassThrough, range: 1 } as AttackPassThrough,
    swapUnit: { id: CapacityId.swapUnit, unit: new Unit({}) } as SwapUnit,
}

export interface Capacity {
    id: CapacityId
}

export interface ConvertionCapacity extends Capacity {
    conversionCyclesMin: number
    conversionCyclesMax: number
}

export interface RegenCapacity extends Capacity {
    healthPerMinute: number
}

export interface HealingCapacity extends Capacity {
    healthPerMinute: number
    range: number
}

export interface RefundAfterDeathCapacity extends Capacity {
    percentValue: number
}

export interface ChargedAttackCapacity extends Capacity {
    reloadTime: number
    damage: number
}

export interface BlastAttackCapacity extends ChargedAttackCapacity {
    blastRadius: number
    blastDamagePercent: number
}

export interface SpawnUnitOnDeathCapacity extends Capacity {
    unit: Unit
}

export interface ReduceArmorCapacity extends Capacity {
    melee: number
    pierce: number
}

export interface GenerateGoldWhenFightingCapacity extends Capacity {
    goldPerSecond: number
}

export interface AttackPassThrough extends Capacity {
    range: number
}

export interface SwapUnit extends Capacity {
    id: CapacityId
    unit: Unit
}