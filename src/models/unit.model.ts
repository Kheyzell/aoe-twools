import { villagerGatheringRate } from "../constants/game.const"
import { multiplyNumber } from "../utils/utils"
import { Capacity, CapacityId } from "./capacity.model"
import { Tech, Cost, TechType, UnitType, ArmorType } from "./techs.model"
import { Upgrade } from "./upgrade.model"

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

    constructor(data: any) {
        this.type = TechType.unit
        this.id = data.id
        this.wikiUrl = data.wikiUrl
        this.age = data.age
        this.cost = { ...data.cost }
        this.duration = data.duration
        this.unitType = data.unitType

        if (data.stats) {
            this.stats = {
                ...data.stats,
                attackComponents: data.stats.attackComponents.map((attack: CombatStat) => ({ ...attack })),
                armorComponents: data.stats.armorComponents.map((armor: CombatStat) => ({ ...armor })),
                capacities: (data.stats.capacities || []).map((capacity: Capacity) => ({ ...capacity })),
            }
            if (data.stats.secondaryAttack) {
                this.stats.secondaryAttack = { ...data.stats.secondaryAttack, components: [...data.stats.secondaryAttack.components] }
            }
            if (!!this.stats.rateOfFire) {
                this.stats.attackRate = 1 / this.stats.rateOfFire
            }
            this.stats.conversionResistance = this.stats.conversionResistance || 0
            this.stats.conversionMinCyclesResistance = this.stats.conversionMinCyclesResistance || 0
            this.stats.conversionMaxCyclesResistance = this.stats.conversionMaxCyclesResistance || 0

            this.stats.continuousProductionVillagerCost = {
                wood: this.cost.wood ? Math.ceil(multiplyNumber(this.cost.wood, 1 / multiplyNumber(villagerGatheringRate.wood, this.duration))): 0,
                food: this.cost.food ? Math.ceil(multiplyNumber(this.cost.food, 1 / multiplyNumber(villagerGatheringRate.food, this.duration))): 0,
                gold: this.cost.gold ? Math.ceil(multiplyNumber(this.cost.gold, 1 / multiplyNumber(villagerGatheringRate.gold, this.duration))): 0,
                stone: this.cost.stone ? Math.ceil(multiplyNumber(this.cost.stone, 1 / multiplyNumber(villagerGatheringRate.stone, this.duration))): 0,
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
        addCombatStat(this, value, type, true)
    }
    
    addArmorComponent(value: number, type: ArmorType) {
        addCombatStat(this, value, type, false)
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
        this.stats.rateOfFire = 1/this.stats.attackRate
    }
}

const addCombatStat = (unit: Unit, value: number, type: ArmorType, isAttack: boolean) => {
    const statComponents = isAttack ? unit.stats.attackComponents : unit.stats.armorComponents
    const componentStat = statComponents.find(stat => stat.type === type)
    if (componentStat) {
        componentStat.value += value
    } else {
        statComponents.push({ value, type })
    }
}


export enum AttackType {
    melee = 'Melee',
    projectile = 'Projectile'
}

export interface CombatStat {
    value: number
    type: ArmorType
}

export interface StatList {
    health: number
    movementSpeed: number
    lineOfSight: number
    rateOfFire: number
    attackRate: number
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
    continuousProductionVillagerCost: Cost
    conversionResistance: number
    conversionMinCyclesResistance: number
    conversionMaxCyclesResistance: number
}
