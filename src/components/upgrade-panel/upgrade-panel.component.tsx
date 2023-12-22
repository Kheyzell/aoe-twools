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
    shouldShowDetails: boolean
}

const UpgradePanel: React.FC<Props> = ({ upgrade, shouldShowDetails }) => {
    const { t, i18n } = useTranslation()
    const panelRef = React.createRef<HTMLDivElement>();

    const translationKey = `${(upgrade.type === TechType.unit ? 'unit' : upgrade.type === TechType.upgrade ? 'upgrade' : 'unique')}.${upgrade.id}`

    const wikiBaseUrl = 'https://ageofempires.fandom.com/wiki'

    const isUniqueTech = !!upgrade.unique

    const hasDescription = i18n.exists(`${translationKey}.description`)

    let affectedUnits: Unit[] = []
    let affectedUpgrades: Upgrade[] = []

    if (shouldShowDetails) {
        if (isUniqueTech) {
            affectedUnits = (upgrade as UniqueTech).affectedUnits
            affectedUpgrades = (upgrade as UniqueTech).affectedUpgrades
        } else {
            const allGenericUnits: Unit[] = getAllCivUnits(fullTechTree)
            const allUniqueUnits: Unit[] = allCivTechTrees.map(civ => getAllCivUniqueUnits(civ)).reduce((allUnits: Unit[], civUnits: Unit[]) => allUnits.concat(civUnits), [])

            affectedUnits = allGenericUnits.concat(allUniqueUnits).filter(unit => (unit.affectingUpgrades || []).some(u => u.id === upgrade.id))
        }
    }

    return (
        <div className="TechPanel" ref={panelRef} style={{ background: `url(${woodenBackground})` }} onClick={stopEventPropagation}>
            <div className={ shouldShowDetails ? 'Title' : '' }>
                { <span>
                    <span> { t(`${translationKey}.name`) } </span>
                    { isUniqueTech ? <span> ({ t(`civ.${(upgrade as UniqueTech).civ.id}.name`) }) </span> : null }
                    <span className="StatLabel"> </span> <span className="StatValue"> (<CostStat cost={ new CostCompared(upgrade.cost) }></CostStat>) </span>
                </span> }
                {/* { showDetails ? (<span> • <a href={wikiBaseUrl} target="_blank" rel="noreferrer"> wiki </a> </span>): null } */}
            </div>

            { hasDescription &&
                <div className="Section">
                    { shouldShowDetails && <div className="SubTitle"> Description </div> }
                    <div className="Description"> { t(`${translationKey}.description`, upgrade) } </div>
                </div>
            }

            { shouldShowDetails &&
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

            }
        </div>
    )
}

export default UpgradePanel