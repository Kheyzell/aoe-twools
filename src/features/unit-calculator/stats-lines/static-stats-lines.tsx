import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Capacity } from "../../../models/capacity.model"

import { CombatStatCompared, CostCompared, StatCompared } from "../../../models/stats-calculation.model"
import { AttackType } from "../../../models/unit.model"
import foodIcon from "../../../resources/icons/food.png"
import goldIcon from "../../../resources/icons/gold.png"
import stoneIcon from "../../../resources/icons/stone.png"
import woodIcon from "../../../resources/icons/wood.png"
import {  roundHundredth } from "../../../utils/utils"
import unitCalculatorService from "../unit-calculator.service"
import { selectedUnitsSelector } from "../unit-calculator.slice"
import { GenericStatLine, StatDisplay, StatLine } from "./basic-stats-components/basic-stats-components"

import './static-stats-lines.css'


export const CostStat = (props: { cost: CostCompared }) => (
    <span className="CostStat">
        {props.cost.wood.value ? (<StatDisplay comparison={props.cost.wood.comparison}> {props.cost.wood.value} <img src={woodIcon} alt="wood" /> </StatDisplay>) : ''}
        {props.cost.food.value ? (<StatDisplay comparison={props.cost.food.comparison}> {props.cost.food.value} <img src={foodIcon} alt="food" /> </StatDisplay>) : ''}
        {props.cost.gold.value ? (<StatDisplay comparison={props.cost.gold.comparison}> {props.cost.gold.value} <img src={goldIcon} alt="gold" /> </StatDisplay>) : ''}
        {props.cost.stone.value ? (<StatDisplay comparison={props.cost.stone.comparison}> {props.cost.stone.value} <img src={stoneIcon} alt="stone" /> </StatDisplay>) : ''}
        <StatDisplay comparison={props.cost.total.comparison}> (Total: {props.cost.total.value}) </StatDisplay>
    </span>
)

export const CostLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const [cost1, cost2] = CostCompared.build2Comparisons(unit1.cost, unit2.cost)
    const stat1 = (<CostStat cost={cost1}></CostStat>)
    const stat2 = (<CostStat cost={cost2}></CostStat>)
    return (<StatLine title="Cost" stat1={stat1} stat2={stat2}></StatLine>)
}

export const ContinuousProductionLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const numberOfVillagerPerResource1 = unit1.stats.continuousProductionVillagerCost
    const numberOfVillagerPerResource2 = unit2.stats.continuousProductionVillagerCost

    const [numberOfVillagerPerResourceCompared1, numberOfVillagerPerResourceCompared2] = CostCompared.build2Comparisons(numberOfVillagerPerResource1, numberOfVillagerPerResource2)

    const stat1 = (<CostStat cost={numberOfVillagerPerResourceCompared1}></CostStat>)
    const stat2 = (<CostStat cost={numberOfVillagerPerResourceCompared2}></CostStat>)
    return (<StatLine title="Number of villager for continuous production" stat1={stat1} stat2={stat2}></StatLine>)
}

export const HealthLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    return (<GenericStatLine title="health" value1={unit1.stats.health} value2={unit2.stats.health}></GenericStatLine>)
}

export const MovementSpeedLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    return (<GenericStatLine title="Movement speed" value1={roundHundredth(unit1.stats.movementSpeed)} value2={roundHundredth(unit2.stats.movementSpeed)}></GenericStatLine>)
}

export const LineOfSightLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    return (<GenericStatLine title="Line of sight" value1={unit1.stats.lineOfSight} value2={unit2.stats.lineOfSight}></GenericStatLine>)
}

export const TrainingTimeLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    return (<GenericStatLine title="Training time" value1={roundHundredth(unit1.duration)} value2={roundHundredth(unit2.duration)} comparisonInversed={true}></GenericStatLine>)
}

export const AttackRateLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    return (<GenericStatLine title="Attack per second" value1={roundHundredth(unit1.stats.attackRate)} value2={roundHundredth(unit2.stats.attackRate)}></GenericStatLine>)
}

export const RangeLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const [range1, range2] = StatCompared.build2Comparisons(unit1.stats.range || 0, unit2.stats.range || 0)
    const rangeComponent1 = (<StatDisplay comparison={range1.comparison}> {range1.value} ({unit1.stats.attackType === AttackType.melee ? 'melee' : 'projectile'}) </StatDisplay>)
    const rangeComponent2 = (<StatDisplay comparison={range2.comparison}> {range2.value} ({unit2.stats.attackType === AttackType.melee ? 'melee' : 'projectile'}) </StatDisplay>)
    return (<StatLine title="Range" stat1={rangeComponent1} stat2={rangeComponent2}></StatLine>)
}

export const AccuracyLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const [accuracy1, accuracy2] = StatCompared.build2Comparisons(unit1.stats.accuracy || 1, unit2.stats.accuracy || 1)
    const rangeComponent1 = (<StatDisplay comparison={accuracy1.comparison}> {unit1.stats.attackType === AttackType.projectile ? `${accuracy1.value * 100} %` : ''} </StatDisplay>)
    const rangeComponent2 = (<StatDisplay comparison={accuracy2.comparison}> {unit2.stats.attackType === AttackType.projectile ? `${accuracy2.value * 100} %` : ''} </StatDisplay>)

    if (unit1.stats.attackType === AttackType.projectile || unit2.stats.attackType === AttackType.projectile) {
        return (<StatLine title="Accuracy" stat1={rangeComponent1} stat2={rangeComponent2}></StatLine>)
    } else {
        return null
    }
}

export const CapacitiesLine = () => {
    const { t, i18n } = useTranslation()
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)

    const CapacitiesDisplay = (capactities: Capacity[]) => {
        return (<div className="Capacity"> {capactities.map(capacity => {
            const hasShortDescription = i18n.exists(`capacities.${capacity.id}.shortDescription`)
            return (<div> • 
                <span> {t(`capacities.${capacity.id}.title`)} </span>
                { hasShortDescription ? <span className="ShortDescription"> {t(`capacities.${capacity.id}.shortDescription`, capacity)} </span> : null }
            </div>)})
        } </div>)
    }

    if (unit1.stats.capacities.length || unit2.stats.capacities.length) {
        return (<StatLine title="Capacities" stat1={CapacitiesDisplay(unit1.stats.capacities)} stat2={CapacitiesDisplay(unit2.stats.capacities)}></StatLine>)
    }
    return null
}

export const CombatValueStat = (props: { statComparedList: CombatStatCompared[] }) => {
    return (
        <span className="CombatValueStat">
            {
                props.statComparedList.map((bonusStatCompared, i) => (
                    <div key={i}>
                        <StatDisplay comparison={bonusStatCompared.comparison}>
                            {bonusStatCompared.value} ({bonusStatCompared.type})
                        </StatDisplay>
                    </div>
                ))
            }
        </span>
    )
}

export const AttackDamageLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)

    const attacks1 = unit1.stats.attackComponents
    const attacks2 = unit2.stats.attackComponents

    const [damageComparedList1, damageComparedList2] = unitCalculatorService.compareCombatStats(attacks1, attacks2)

    return (
        <StatLine title="Attack Damage" stat1={(<CombatValueStat statComparedList={damageComparedList1} />)} stat2={(<CombatValueStat statComparedList={damageComparedList2} />)}></StatLine>
    )
}

export const SecondaryAttackDamageLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)

    const secondaryAttacks1 = unit1.stats.secondaryAttack?.components || []
    const secondaryAttacks2 = unit2.stats.secondaryAttack?.components || []

    const [numberCompared1, numberCompared2] = StatCompared.build2Comparisons(unit1.stats.secondaryAttack?.count || 0, unit2.stats.secondaryAttack?.count || 0)
    const [damageComparedList1, damageComparedList2] = unitCalculatorService.compareCombatStats(secondaryAttacks1, secondaryAttacks2)

    const stat1 = (
        <div>
            <StatDisplay comparison={numberCompared1.comparison}> count: {`${numberCompared1.value}`} </StatDisplay>
            <CombatValueStat statComparedList={damageComparedList1} />
        </div>
    )
    const stat2 = (
        <div>
            <StatDisplay comparison={numberCompared2.comparison}> count: {`${numberCompared2.value}`} </StatDisplay>
            <CombatValueStat statComparedList={damageComparedList2} />
        </div>
    )

    if (unit1.stats.secondaryAttack || unit2.stats.secondaryAttack) {
        return (
            <StatLine title="Secondary Attack" stat1={stat1} stat2={stat2}></StatLine>
        )
    }
    return null
}

export const ArmorLine = () => {
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)

    const armors1 = unit1.stats.armorComponents
    const armors2 = unit2.stats.armorComponents

    const [armorComparedList1, armorComparedList2] = unitCalculatorService.compareCombatStats(armors1, armors2)

    return (
        <StatLine title="Armor" stat1={(<CombatValueStat statComparedList={armorComparedList1} />)} stat2={(<CombatValueStat statComparedList={armorComparedList2} />)}></StatLine>
    )
}