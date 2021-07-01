export enum CapacityId {
    selfDestruction = "selfDestruction", conversion = "conversion", ballistics = "ballistics",
    trampleDruzhina = "trampleDruzhina", maghrebiRegen = "maghrebiRegen", madrasahRefund = "madrasahRefund",
    redemption = "redemption",
    atonement = "atonement",
    theocracy = "theocracy",
    heresy = "heresy",
    aztecsMonkHealthBonus = "aztecsMonkHealthBonus",
    regen = "regen",
    healing = "healing"
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
    maghrebiRegen: { id: CapacityId.maghrebiRegen, healthPerMinute: 15 } as RegenCapacity,
    madrasahRefund: { id: CapacityId.madrasahRefund, percentValue: 33 } as RefundAfterDeath,
    aztecsMonkHealthBonus: { id: CapacityId.aztecsMonkHealthBonus },
    regen: { id: CapacityId.regen, healthPerMinute: 0 } as RegenCapacity
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

export interface RefundAfterDeath extends Capacity {
    id: CapacityId
    percentValue: number
}