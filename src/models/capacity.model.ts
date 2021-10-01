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
    dismountOnDeath = "dismountOnDeath"
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
    fullMissedShot: { id: CapacityId.fullMissedShot },
    projectileProtection: { id: CapacityId.projectileProtection },
    dismountOnDeath: { id: CapacityId.dismountOnDeath, unit: new Unit({}) } as SpawnUnitOnDeathCapacity,
}

export interface Capacity {
    id: CapacityId
}

export interface ConvertionCapacity extends Capacity {
    conversionCyclesMin: number
    conversionCyclesMax: number
}

export interface RegenCapacity extends Capacity {
    id: CapacityId
    healthPerMinute: number
}

export interface HealingCapacity extends Capacity {
    id: CapacityId
    healthPerMinute: number
    range: number
}

export interface RefundAfterDeathCapacity extends Capacity {
    id: CapacityId
    percentValue: number
}

export interface ChargedAttackCapacity extends Capacity {
    id: CapacityId
    reloadTime: number
    damage: number
}

export interface SpawnUnitOnDeathCapacity extends Capacity {
    id: CapacityId
    unit: Unit
}