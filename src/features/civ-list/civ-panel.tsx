import React from "react"

import { CivTechTree, Unit } from "../../models/techs.model"
import { getAllCivUnitLines, hasCivUpgrades } from "../../utils/techs.utils"
import TechComponent from "../tech-tree/tech/tech.component"
import woodenBackground from "../../resources/images/backgrounds/parchment2.jpg"
import './civ-panel.css'
import { Bonus } from "../../models/bonus.model"
import { stopEventPropagation } from "../../utils/utils"


type Props = {
    civ: CivTechTree
    show: boolean
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
    const myRef = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        if (myRef.current) {
            myRef.current.style.left = 'initial'
            myRef.current.style.right = 'initial'
            const rect = myRef.current.getBoundingClientRect()
            if (rect.left < 160) {
                myRef.current.style.left = '120px'
            } else if (rect.right > document.body.clientWidth) {
                myRef.current.style.right = '20px'
            }
        }
    })

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
        <div className="CivPanel" ref={myRef} style={{ background: `url(${woodenBackground})`, visibility: props.show ? 'visible' : 'hidden' }} onClick={stopEventPropagation}>
            <div className="Title"> {props.civ.name} • <a href={wikiUrl} target="_blank" onClick={openWiki}> wiki </a></div>

            <div className="Section">
                <div className="SubTitle"> Bonuses </div>
                <div className="Bonuses"> {
                    bonuses.map(bonus => {
                        return (<li> { bonus.team ? (<span className="TeamBonus"> Team bonus: </span>) : "" } { bonus.description } </li>)
                    })
                } </div>
            </div>
            
            <div className="Section">
                <div className="SubTitle"> Unique technologies </div>
                <div className="Bonuses"> {
                    uniqueTechs.map(uniqueTech => {
                        return (<li> { uniqueTech.name }: { uniqueTech.description } </li>)
                    })
                } </div>
            </div>

            <div className="Section">
                <div className="SubTitle"> {affectedByBonusesUnits.length > 0 ? "Units affected by bonuses or technologies" : "No unit affected by bonuses"} </div>
                <div className="UnitList AffectedByBonusesUnits"> {
                    affectedByBonusesUnits.concat(affectedByUniqueTechsUnits.filter(unit => !affectedByBonusesUnits.find(bonusUnit => bonusUnit.id === unit.id))).map(unit => {
                        return (<TechComponent key={unit.id} tech={unit}></TechComponent>)
                    })
                } </div>
            </div>

            <div className="Section">
                <div className="SubTitle"> {fullyUpgradedUnits.length > 0 ? "Fully upgraded units" : "No fully upgraded unit"} </div>
                <div className="UnitList FullyUpgradedUnits"> {
                    fullyUpgradedUnits.map(unit => {
                        return (<TechComponent key={unit.id} tech={unit}></TechComponent>)
                    })
                } </div>
            </div>
        </div>
    )
}

export default CivPanel