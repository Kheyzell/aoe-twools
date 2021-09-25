import React from "react"
import { useTranslation } from "react-i18next"

import { allCivTechTrees } from "../../constants"
import { fullTechTree } from "../../constants/tech-trees/_full-tech-tree.const"
import { UniqueTech } from "../../models/bonus.model"
import { TechType } from "../../models/techs.model"
import { getAllCivUniqueUnits, getAllCivUnits } from "../../utils/techs.utils"
import { stopEventPropagation } from "../../utils/utils"
import TechComponent, { BoxSize } from "../tech/tech.component"
import { Unit } from "../../models/unit.model"
import { Upgrade } from "../../models/upgrade.model"
import { CostStat } from "../../features/unit-calculator/stats-lines/static-stats-lines"
import { CostCompared } from "../../models/stats-calculation.model"

import woodenBackground from "../../resources/images/backgrounds/parchment2.jpg"

import './upgrade-panel.component.css'


type Props = {
    upgrade: Upgrade
    showDetails: boolean
}

const UpgradePanel: React.FC<Props> = (props) => {
    const { t, i18n } = useTranslation()
    const panelRef = React.createRef<HTMLDivElement>();

    const showDetails = props.showDetails

    const translationKey = `${(props.upgrade.type === TechType.unit ? 'unit' : props.upgrade.type === TechType.upgrade ? 'upgrade' : 'unique')}.${props.upgrade.id}`

    const wikiBaseUrl = 'https://ageofempires.fandom.com/wiki'
    // const wikiUrl = `${wikiBaseUrl}/${props.tech.wikiUrl}/Tree`

    const isUniqueTech = !!props.upgrade.unique

    const hasDescription = i18n.exists(`${translationKey}.description`)

    let affectedUnits: Unit[] = []
    let affectedUpgrades: Upgrade[] = []
    if (showDetails) {
        if (isUniqueTech) {
            affectedUnits = (props.upgrade as UniqueTech).affectedUnits
            affectedUpgrades = (props.upgrade as UniqueTech).affectedUpgrades
        } else {
            const allGenericUnits: Unit[] = getAllCivUnits(fullTechTree)
            const allUniqueUnits: Unit[] = allCivTechTrees.map(civ => getAllCivUniqueUnits(civ)).reduce((allUnits: Unit[], civUnits: Unit[]) => allUnits.concat(civUnits), [])
            
            affectedUnits = allGenericUnits.concat(allUniqueUnits).filter(unit => (unit.affectingUpgrades || []).some(u => u.id === props.upgrade.id))
        }
    }

    return (
        <div className="TechPanel" ref={panelRef} style={{ background: `url(${woodenBackground})` }} onClick={stopEventPropagation}>
            <div className={ showDetails ? 'Title' : '' }>
                { <span>
                    <span> { t(`${translationKey}.name`) } </span>
                    { isUniqueTech ? <span> ({ t(`civ.${(props.upgrade as UniqueTech).civ.id}.name`) }) </span> : null }
                    <span className="StatLabel"> </span> <span className="StatValue"> (<CostStat cost={ new CostCompared(props.upgrade.cost) }></CostStat>) </span>
                </span> }
                {/* { showDetails ? (<span> • <a href={wikiBaseUrl} target="_blank" rel="noreferrer"> wiki </a> </span>): null } */}
            </div>

            { hasDescription ? 
                <div className="Section">
                    { showDetails ? <div className="SubTitle"> Description </div> : null }
                    <div className="Description"> { t(`${translationKey}.description`) } </div>
                </div>
            : null }
            
            {
                showDetails ?

                <div className="Details">

                    <div className="Section">
                        <div className="SubTitle"> { affectedUnits.length > 0 ? t("Affected unit(s)") : t("No unit is affected by this upgrade") } </div>
                        <div className="TechList"> {
                            affectedUnits.map(unit => {
                                return (<TechComponent key={unit.id} tech={unit} size={BoxSize.small}></TechComponent>)
                            })
                        } </div>
                    </div>
                    
                    { isUniqueTech ?
                        <div className="Section">
                            <div className="SubTitle"> { affectedUpgrades.length > 0 ? t("Affected upgrade(s)") : t("No upgrade is affected by this upgrade") } </div>
                            <div className="TechList"> {
                                affectedUpgrades.map(upgrade => {
                                    return (<TechComponent key={upgrade.id} tech={upgrade} size={BoxSize.small}></TechComponent>)
                                })
                            } </div>
                        </div>
                    : null }

                </div>

            : null }
        </div>
    )
}

export default UpgradePanel