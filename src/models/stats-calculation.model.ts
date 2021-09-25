import { Cost } from "./techs.model"
import { CombatStat } from "./unit.model"


export type CalculatedStats = {
    totalCost1: number,
    totalCost2: number,
    composedDamageDealtPerHit1: CombatStat[],
    composedDamageDealtPerHit2: CombatStat[],
    secondaryAttackCount1: number,
    secondaryAttackCount2: number,
    composedSecondaryDamageDealtPerHit1: CombatStat[],
    composedSecondaryDamageDealtPerHit2: CombatStat[],
    damageDealtPerHit1: number,
    damageDealtPerHit2: number,
    damagePerSecond1: number,
    damagePerSecond2: number,
    damagePerSecondWithAccuracyHight1: number,
    damagePerSecondWithAccuracyHight2: number,
    damagePerSecondWithAccuracyLow1: number,
    damagePerSecondWithAccuracyLow2: number,
    numberOfHitToKill1: number,
    numberOfHitToKill2: number,
    timeNeededToKill1: number,
    timeNeededToKill2: number,
    healthRemaining1: number,
    healthRemaining2: number,
    monkHealingPercentSpeed1: number,
    monkHealingPercentSpeed2: number,
    monkHealingResource1: number,
    monkHealingResource2: number,
    minimumConversionTime1?: number,
    maximumConversionTime1?: number,
    minimumConversionTime2?: number,
    maximumConversionTime2?: number,
    averageConversionTime1?: number,
    averageConversionTime2?: number,
}

export enum Comparison { good = 'Good', equal = 'Equal', bad = 'Bad' }

export class StatCompared {
    value: number = 0
    comparison: Comparison = Comparison.equal

    constructor(value: number) {
        this.value = value
    }

    static build2Comparisons(value1: number, value2: number, inversed?: boolean): [StatCompared, StatCompared] {
        const [stat1, stat2] = [new StatCompared(value1), new StatCompared(value2)]
        if ((inversed && stat1.value > stat2.value) || (!inversed && stat1.value < stat2.value)) {
            stat1.comparison = Comparison.bad
            stat2.comparison = Comparison.good
        } else if ((inversed && stat1.value < stat2.value) || (!inversed && stat1.value > stat2.value)) {
            stat1.comparison = Comparison.good
            stat2.comparison = Comparison.bad
        }
        return [stat1, stat2]
    }
}

export class CostCompared {
    wood: StatCompared
    food: StatCompared
    gold: StatCompared
    stone: StatCompared
    total: StatCompared

    constructor(cost: Cost) {
        this.wood = { value: cost.wood, comparison: Comparison.equal }
        this.food = { value: cost.food, comparison: Comparison.equal }
        this.gold = { value: cost.gold, comparison: Comparison.equal }
        this.stone = { value: cost.stone, comparison: Comparison.equal }
        this.total = { value: cost.wood + cost.food + cost.gold + cost.stone, comparison: Comparison.equal }
    }

    static build2Comparisons(cost1: Cost, cost2: Cost): [CostCompared, CostCompared] {
        const comp1 = new CostCompared(cost1)
        const comp2 = new CostCompared(cost2)
        comp1.wood.comparison = (!comp1.wood.value || !comp2.wood.value || comp1.wood.value === comp2.wood.value) ? Comparison.equal : cost1.wood < cost2.wood ? Comparison.good : Comparison.bad
        comp1.food.comparison = (!comp1.food.value || !comp2.food.value || comp1.food.value === comp2.food.value) ? Comparison.equal : cost1.food < cost2.food ? Comparison.good : Comparison.bad
        comp1.gold.comparison = (!comp1.gold.value || !comp2.gold.value || comp1.gold.value === comp2.gold.value) ? Comparison.equal : cost1.gold < cost2.gold ? Comparison.good : Comparison.bad
        comp1.stone.comparison = (!comp1.stone.value || !comp2.stone.value || comp1.stone.value === comp2.stone.value) ? Comparison.equal : cost1.stone < cost2.stone ? Comparison.good : Comparison.bad
        comp1.total.comparison = (!comp1.total.value || !comp2.total.value || comp1.total.value === comp2.total.value) ? Comparison.equal : comp1.total.value < comp2.total.value ? Comparison.good : Comparison.bad
        comp2.wood.comparison = (!comp1.wood.value || !comp2.wood.value || comp1.wood.value === comp2.wood.value) ? Comparison.equal : cost2.wood < cost1.wood ? Comparison.good : Comparison.bad
        comp2.food.comparison = (!comp1.food.value || !comp2.food.value || comp1.food.value === comp2.food.value) ? Comparison.equal : cost2.food < cost1.food ? Comparison.good : Comparison.bad
        comp2.gold.comparison = (!comp1.gold.value || !comp2.gold.value || comp1.gold.value === comp2.gold.value) ? Comparison.equal : cost2.gold < cost1.gold ? Comparison.good : Comparison.bad
        comp2.stone.comparison = (!comp1.stone.value || !comp2.stone.value || comp1.stone.value === comp2.stone.value) ? Comparison.equal : cost2.stone < cost1.stone ? Comparison.good : Comparison.bad
        comp2.total.comparison = (!comp1.total.value || !comp2.total.value || comp1.total.value === comp2.total.value) ? Comparison.equal : comp2.total.value < comp1.total.value ? Comparison.good : Comparison.bad
        return [comp1, comp2]
    }
}

export interface CombatStatCompared extends CombatStat, StatCompared {

}