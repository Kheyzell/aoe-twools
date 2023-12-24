import { villagerGatheringRate } from "../constants/game.const"
import { addNumber, multiplyNumber } from "../utils/utils"
import { Capacity, CapacityId } from "./capacity.model"
import { ArmorType, Cost, Tech, TechType, UnitType } from "./techs.model"
import { Upgrade } from "./upgrade.model"

type DecreaseCostByValue = { value: number } & { resource: ResourceType }
type DecreaseCostByPercent = { percent: number } & { resource: ResourceType }
export enum ResourceType { wood = 'wood', food = 'food', gold = 'gold', stone = 'stone', all = 'all' }
type DecreaseCostArg = DecreaseCostByValue | DecreaseCostByPercent

export enum AttackType {
    none = 'None',
    melee = 'Melee',
    projectile = 'Projectile'
}

export interface CombatStat {
    value: number
    type: ArmorType
}

enum ComponentType {
    attack = "attack",
    defence = "defence"
}

export class Unit implements Tech {
    id: string
    wikiUrl: string
    age: number
    cost: Cost
    duration: number
    type: TechType
    unitType: UnitType
    stats: StatList
    unique?: boolean
    previousLineTech?: Unit
    nextLineTech?: Unit
    affectingUpgrades: Tech[]
    isSelected?: boolean

    constructor(data: DataUnit) {
        this.type = TechType.unit
        this.id = data.id ?? ""
        this.wikiUrl = data.wikiUrl ?? ""
        this.age = data.age ?? 1
        this.cost = data.cost ? { ...data.cost } : { wood: 0, food: 0, gold: 0, stone: 0 }
        this.duration = data.duration ?? 0
        this.unitType = data.unitType ?? UnitType.civilian

        if (data.stats) {
            this.stats = {
                health: data.stats.health ?? 0,
                movementSpeed: data.stats.movementSpeed ?? 0,
                lineOfSight: data.stats.lineOfSight ?? 0,
                rateOfFire: data.stats.rateOfFire ?? 0,
                attackType: data.stats.attackType ?? AttackType.none,
                range: data.stats.range,
                accuracy: data.stats.accuracy,
                conversionResistance: data.stats.conversionResistance ?? 0,
                conversionMinCyclesResistance: data.stats.conversionMinCyclesResistance ?? 0,
                conversionMaxCyclesResistance: data.stats.conversionMaxCyclesResistance ?? 0,

                attackComponents: data.stats.attackComponents?.map((attack: CombatStat) => ({ ...attack })) ?? [],
                armorComponents: data.stats.armorComponents?.map((armor: CombatStat) => ({ ...armor })) ?? [],
                secondaryAttack: data.stats.secondaryAttack ? { ...data.stats.secondaryAttack, components: [...data.stats.secondaryAttack.components] } : undefined,
                capacities: (data.stats.capacities || []).map((capacity: Capacity) => ({ ...capacity })),
                continuousProductionVillagerCost: { wood: 0, food: 0, gold: 0, stone: 0 },
                attackRate: data.stats.rateOfFire ? 1 / data.stats.rateOfFire : -1
            }

            this.stats.continuousProductionVillagerCost = {
                wood: this.cost.wood ? Math.ceil(multiplyNumber(this.cost.wood, 1 / multiplyNumber(villagerGatheringRate.wood, this.duration))) : 0,
                food: this.cost.food ? Math.ceil(multiplyNumber(this.cost.food, 1 / multiplyNumber(villagerGatheringRate.food, this.duration))) : 0,
                gold: this.cost.gold ? Math.ceil(multiplyNumber(this.cost.gold, 1 / multiplyNumber(villagerGatheringRate.gold, this.duration))) : 0,
                stone: this.cost.stone ? Math.ceil(multiplyNumber(this.cost.stone, 1 / multiplyNumber(villagerGatheringRate.stone, this.duration))) : 0,
            }
        } else {
            const blankStats = {
                health: null,
                rateOfFire: null,
                attackType: null,
                attackComponents: [],
                armorComponents: [],
                movementSpeed: null,
                lineOfSight: null,
            }
            this.stats = blankStats as any as StatList
        }

        this.unique = data.unique
        this.previousLineTech = data.previousLineTech
        this.nextLineTech = data.nextLineTech
        this.affectingUpgrades = (data.affectingUpgrades || []).map((upgrade: Upgrade) => new Upgrade({ ...upgrade }))
    }

    hasCapacity(capacityId: CapacityId): boolean {
        return !!this.stats.capacities.find(capacity => capacity.id === capacityId)
    }

    getCapacity(capacityId: CapacityId): Capacity | undefined {
        return this.stats.capacities.find(capacity => capacity.id === capacityId)
    }

    addAttackComponent(value: number, type: ArmorType) {
        addCombatStat(this, value, type, ComponentType.attack)
    }

    addArmorComponent(value: number, type: ArmorType) {
        addCombatStat(this, value, type, ComponentType.defence)
    }

    addCapacity(capacity: Capacity) {
        let existingCapacity = this.stats.capacities.find(c => c.id === capacity.id)
        if (existingCapacity) {
            existingCapacity = capacity
        } else {
            this.stats.capacities.push(capacity)
        }
    }

    multiplyAttackRate(value: number) {
        this.stats.attackRate = multiplyNumber(this.stats.attackRate, value)
        this.stats.rateOfFire = 1 / this.stats.attackRate
    }

    decreaseCost(arg: DecreaseCostArg) {
        if (isDecreaseCostByValue(arg)) {
            this.decreaseCostByValue(arg.value, arg.resource)
        } else if (isDecreaseCostByPercent(arg)) {
            this.decreaseCostByPercent(arg.percent, arg.resource)
        }
    }

    private decreaseCostByPercent(percent: number, resource: ResourceType) {
        switch (true) {
            case resource === ResourceType.wood:
                return this.cost.wood = multiplyNumber(this.cost.wood, addNumber(1, -percent))

            case resource === ResourceType.food:
                return this.cost.food = multiplyNumber(this.cost.food, addNumber(1, -percent))

            case resource === ResourceType.gold:
                return this.cost.gold = multiplyNumber(this.cost.gold, addNumber(1, -percent))

            case resource === ResourceType.stone:
                return this.cost.stone = multiplyNumber(this.cost.stone, addNumber(1, -percent))

            case resource === ResourceType.all:
                this.cost.wood = multiplyNumber(this.cost.wood, addNumber(1, -percent))
                this.cost.food = multiplyNumber(this.cost.food, addNumber(1, -percent))
                this.cost.gold = multiplyNumber(this.cost.gold, addNumber(1, -percent))
                this.cost.stone = multiplyNumber(this.cost.stone, addNumber(1, -percent))
        }
    }

    private decreaseCostByValue(value: number, resource: ResourceType) {
        switch (true) {
            case resource === ResourceType.wood:
                return this.cost.wood = this.cost.wood - value

            case resource === ResourceType.food:
                return this.cost.food = this.cost.food - value

            case resource === ResourceType.gold:
                return this.cost.gold = this.cost.gold - value

            case resource === ResourceType.stone:
                return this.cost.stone = this.cost.stone - value

            case resource === ResourceType.all:
                this.cost.wood = this.cost.wood - value
                this.cost.food = this.cost.food - value
                this.cost.gold = this.cost.gold - value
                this.cost.stone = this.cost.stone - value
        }
    }
}

const addCombatStat = (unit: Unit, value: number, type: ArmorType, componentType: ComponentType) => {
    const isAttack = componentType === ComponentType.attack
    const statComponents = isAttack ? unit.stats.attackComponents : unit.stats.armorComponents
    const componentStat = statComponents.find(stat => stat.type === type)
    if (componentStat) {
        componentStat.value += value
    } else {
        statComponents.push({ value, type })
    }
}

type DataUnit = Partial<Omit<Unit, "stats">> & { stats?: Partial<DataStatList> }
type DataStatList = Pick<StatList, "health" | "movementSpeed" | "lineOfSight" | "rateOfFire" | "attackRate" | "attackType" | "range" | "accuracy" | "attackComponents" | "armorComponents" | "secondaryAttack" | "capacities" | "conversionResistance" | "conversionMinCyclesResistance" | "conversionMaxCyclesResistance">
export interface StatList {
    health: number
    movementSpeed: number
    lineOfSight: number
    rateOfFire: number
    attackType: AttackType
    range?: number
    accuracy?: number
    attackComponents: CombatStat[]
    armorComponents: CombatStat[]
    secondaryAttack?: {
        count: number
        components: CombatStat[]
        accuracy: number
    }
    capacities: Capacity[]
    conversionResistance: number
    conversionMinCyclesResistance: number
    conversionMaxCyclesResistance: number

    // calculated
    attackRate: number
    continuousProductionVillagerCost: Cost
}

function isDecreaseCostByValue(arg: DecreaseCostArg): arg is DecreaseCostByValue {
    return 'value' in arg;
}

function isDecreaseCostByPercent(arg: DecreaseCostArg): arg is DecreaseCostByPercent {
    return 'percent' in arg;
}