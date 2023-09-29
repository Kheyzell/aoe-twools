import React from "react"
import { Trans, useTranslation } from "react-i18next"

import { allCivTechTrees, siciliansTechTree } from "../../constants"
import { CostStat } from "../../features/unit-calculator/stats-lines/static-stats-lines"
import UnitCalculatorUnitComponent from "../../features/unit-calculator/unit-calculator-tech/unit-calculator-unit.component"
import { Bonus, UniqueTech } from "../../models/bonus.model"
import { CostCompared } from "../../models/stats-calculation.model"
import { TechType } from "../../models/techs.model"
import { Unit } from "../../models/unit.model"
import woodenBackground from "../../resources/images/backgrounds/parchment2.jpg"
import { roundHundredth, stopEventPropagation } from "../../utils/utils"
import BonusLine from "../bonus/bonus-line/bonus-line.component"
import TechComponent, { BoxSize } from "../tech/tech.component"

import './unit-panel.component.css'
import { Capacity } from '../../models/capacity.model';


type Props = {
    unit: Unit
}

const UnitPanel: React.FC<Props> = (props) => {
    const { t, i18n } = useTranslation()
    const panelRef = React.createRef<HTMLDivElement>();

    const translationKey = `${(props.unit.type === TechType.unit ? 'unit' : props.unit.type === TechType.upgrade ? 'upgrade' : 'unique')}.${props.unit.id}`

    const wikiBaseUrl = 'https://ageofempires.fandom.com/wiki'
    const wikiUrl = props.unit.wikiUrl ? `${wikiBaseUrl}/${props.unit.wikiUrl}` : ''

    const affectingUpgrades = props.unit.affectingUpgrades || []

    const affectingUniqueUpgrades = allCivTechTrees
        .map(civ => civ.uniqueTechs)
        .reduce((allUniqueTechs: UniqueTech[], civUniqueTechs: UniqueTech[]) => allUniqueTechs.concat(civUniqueTechs), [])
        .filter(bonus => bonus.affectedUnits.some(u => u.id === props.unit.id))

    const affectingBonuses = allCivTechTrees
        .map(civ => civ.bonuses)
        .reduce((allBonuses: Bonus[], civBonuses: Bonus[]) => allBonuses.concat(civBonuses), [])
        .filter(bonus => bonus.affectedUnits.some(u => u.id === props.unit.id))

    const openWiki = () => {
        window.open(wikiUrl)
    }

    const StatsSection = () => {
        return (<div className="Section">
            <div className="SubTitle"> Stats </div>
            <div className="Stats">
                <li> <span className="StatLabel"> Cost: </span> <span className="StatValue"> <CostStat cost={ new CostCompared(props.unit.cost) }></CostStat> </span> </li>
                <li> <span className="StatLabel"> Health: </span> <span className="StatValue"> { props.unit.stats.health } </span> </li>
                { props.unit.stats?.attackComponents.length ? <li> <span className="StatLabel"> Attack: </span>
                    <span className="StatValue"> { props.unit.stats?.attackComponents.map((attack, i) => (<span key={i}> {attack.value} ({attack.type}) </span>)) } </span>
                </li> : null }
                <li> <span className="StatLabel"> Armor: </span> 
                    <span className="StatValue"> { props.unit.stats?.armorComponents.map((armor, i) => (<span key={i}> {armor.value} ({armor.type}) </span>)) } </span>
                </li>
                <li> <span className="StatLabel"> Movement Speed: </span> <span className="StatValue"> { props.unit.stats?.movementSpeed } </span> </li>
                { props.unit.stats?.rateOfFire ? <li> <span className="StatLabel"> Attack/s (rate of fire): </span> <span className="StatValue"> { roundHundredth(props.unit.stats?.attackRate) } ({props.unit.stats?.rateOfFire}) </span> </li> : null }
                { props.unit.stats?.range ? <li> <span className="StatLabel"> Range: </span> { props.unit.stats?.range } </li> : null }
                <li> <span className="StatLabel"> Line of sight: </span> <span className="StatValue"> { props.unit.stats?.lineOfSight } </span> </li>
                <li> <span className="StatLabel"> Number of villager for continuous production: </span> <span className="StatValue"> <CostStat cost={ new CostCompared(props.unit.stats?.continuousProductionVillagerCost) }></CostStat> </span> </li>
                <li> <span className="StatLabel"> Training time: </span> <span className="StatValue"> { props.unit.duration } </span> </li>
            </div>
        </div>)
    }

    return (
        <div className="TechPanel" ref={panelRef} style={{ background: `url(${woodenBackground})` }} onClick={stopEventPropagation}>
            <div className="Title"> { t(`${translationKey}.name`) } { wikiUrl ? (<span> • <a href={wikiUrl} target="_blank" rel="noreferrer" onClick={openWiki}> wiki </a> </span>) : null } </div>

            <StatsSection></StatsSection>

            { props.unit.stats?.capacities?.length ?
                <div className="Section">
                    <div className="SubTitle"> Capacities </div>
                    <div className="CapacityList"> {props.unit.stats.capacities.map(capacity => {
                        const hasShortDescription = i18n.exists(`capacities.${capacity.id}.shortDescription`)
                        return (<div key={capacity.id}> • 
                            <span> {t(`capacities.${capacity.id}.title`)} </span>
                            { hasShortDescription ?
                                <span className="ShortDescription">
                                    : <Trans
                                        i18nKey={`capacities.${capacity.id}.shortDescription`}
                                        values={ capacity }
                                        components={{
                                            Units: (capacity as any).units
                                                ? (<span>
                                                    {(capacity as any).units.map((unit: Unit) => <UnitCalculatorUnitComponent unit={unit} size={BoxSize.mini} />)}
                                                </span>)
                                                : <></>
                                        }} />
                                </span>
                            : null }
                        </div>)})
                    } </div>
                </div>
            : null }
            
            <div className="Section">
                <div className="SubTitle"> { affectingUpgrades.length > 0 ? t("Upgrades") : t("No upgrade affects this unit") } </div>
                <div className="TechList"> {
                    affectingUpgrades.map(upgrade => {
                        return (<TechComponent key={upgrade.id} tech={upgrade} size={BoxSize.small}></TechComponent>)
                    })
                } </div>
            </div>
            
            <div className="Section">
                <div className="SubTitle"> { affectingUniqueUpgrades.length > 0 ? t("Unique Upgrades") : t("No unique upgrade affects this unit") } </div>
                <div className="TechList"> {
                    affectingUniqueUpgrades.map(uniqueUpgrade => {
                        return (<TechComponent key={uniqueUpgrade.id} tech={uniqueUpgrade} size={BoxSize.small}></TechComponent>)
                    })
                } </div>
            </div>
            
            <div className="Section">
                <div className="SubTitle"> { affectingBonuses.length > 0 ? t("Bonuses") : t("No bonus affects this unit") } </div>
                <div className="BonusList"> {
                    affectingBonuses.map(bonus => (<li key={bonus.id}> <BonusLine bonus={bonus} displayCivCrest={true}></BonusLine> </li>))
                } </div>
            </div>

        </div>
    )
}

export default UnitPanel