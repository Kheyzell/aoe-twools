import React from "react"
import { useTranslation } from "react-i18next"

import { CivTechTree, Unit } from "../../models/techs.model"
import { getAllCivUnitLines, hasCivUpgrades } from "../../utils/techs.utils"
import TechComponent from "../../features/civ-filter/tech-tree/tech/tech.component"
import woodenBackground from "../../resources/images/backgrounds/parchment2.jpg"
import './civ-panel.component.css'
import { Bonus } from "../../models/bonus.model"
import { stopEventPropagation } from "../../utils/utils"
import BonusLine from "../bonus/bonus-line/bonus-line.component"


type Props = {
    civ: CivTechTree
}
type State = {}

const getUnitsAffectedByBonuses = (civ: CivTechTree): Unit[] => {
    return civ.bonuses.reduce((previousAffectedUnits: Unit[], bonus: Bonus) => {
        if (bonus.hideInUnitRecap) {
            return previousAffectedUnits
        }
        return [...previousAffectedUnits, ...bonus.affectedUnits.filter(unit => !previousAffectedUnits.find(previousUnit => previousUnit.id === unit.id))]
    }, [])
}

const getUnitsAffectedByUniqueTechs = (civ: CivTechTree): Unit[] => {
    return (civ.uniqueTechs || []).reduce((previousAffectedUnits: Unit[], bonus: Bonus) => {
        if (bonus.hideInUnitRecap) {
            return previousAffectedUnits
        }
        return [...previousAffectedUnits, ...bonus.affectedUnits.filter(unit => !previousAffectedUnits.find(previousUnit => previousUnit.id === unit.id))]
    }, [])
}

const getFullyUpgradedUnits = (civ: CivTechTree): Unit[] => {
    const fullyUpgradedUnits: Unit[] = []
    const civUnitLines = getAllCivUnitLines(civ)
    civUnitLines.forEach(unitLine => {
        const lastUnit = unitLine.list[unitLine.list.length - 1]
        if (!!lastUnit.nextLineTech || !lastUnit.affectingUpgrades) {
            return;
        }
        const affectingUpgrades = lastUnit.affectingUpgrades
        if (hasCivUpgrades(civ, affectingUpgrades)) {
            fullyUpgradedUnits.push(lastUnit)
        }
    })

    return fullyUpgradedUnits
}

const CivPanel: React.FC<Props> = (props) => {
    const { t } = useTranslation()
    const myRef = React.createRef<HTMLDivElement>();

    const fullyUpgradedUnits = getFullyUpgradedUnits(props.civ)
    const affectedByBonusesUnits = getUnitsAffectedByBonuses(props.civ)
    const affectedByUniqueTechsUnits = getUnitsAffectedByUniqueTechs(props.civ)

    const bonuses = props.civ.bonuses
    const uniqueTechs = props.civ.uniqueTechs

    const wikiBaseUrl = 'https://ageofempires.fandom.com/wiki'
    const wikiUrl = `${wikiBaseUrl}/${props.civ.wikiUrl}/Tree`

    const openWiki = () => {
        window.open(wikiUrl)
    }

    return (
        <div className="CivPanel" ref={myRef} style={{ background: `url(${woodenBackground})` }} onClick={stopEventPropagation}>
            <div className="Title"> { t(`civ.${props.civ.id}.name`) } • <a href={wikiUrl} target="_blank" onClick={openWiki}> wiki </a></div>

            <div className="Section">
                <div className="SubTitle"> { t('Bonuses') } </div>
                <div className="Bonuses"> {
                    bonuses.map(bonus => (<li> <BonusLine key={bonus.id} civId={props.civ.id} bonus={bonus}></BonusLine> </li>))
                } </div>
            </div>
            
            <div className="Section">
                <div className="SubTitle"> { t('Unique technologies') } </div>
                <div className="Bonuses"> {
                    uniqueTechs.map(uniqueTech => (<li> <BonusLine key={uniqueTech.id} civId={props.civ.id} bonus={uniqueTech}></BonusLine> </li>))
                } </div>
            </div>

            <div className="Section">
                <div className="SubTitle"> { affectedByBonusesUnits.length > 0 ? t("Units affected by bonuses or technologies") : t("No unit affected by bonuses") } </div>
                <div className="UnitList AffectedByBonusesUnits"> {
                    affectedByBonusesUnits.concat(affectedByUniqueTechsUnits.filter(unit => !affectedByBonusesUnits.find(bonusUnit => bonusUnit.id === unit.id))).map(unit => {
                        return (<TechComponent key={unit.id} tech={unit}></TechComponent>)
                    })
                } </div>
            </div>

            <div className="Section">
                <div className="SubTitle"> { fullyUpgradedUnits.length > 0 ? t("Fully upgraded units") : t("No fully upgraded unit") } </div>
                <div className="UnitList FullyUpgradedUnits"> {
                    fullyUpgradedUnits.map(unit => (<TechComponent key={unit.id} tech={unit}></TechComponent>))
                } </div>
            </div>
        </div>
    )
}

export default CivPanel