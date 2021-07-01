import React from "react"
import { useTranslation } from "react-i18next"
import CivFilterTechComponent from "../../../features/civ-filter/tech-tree/civ-filter-tech/civ-filter-tech.component"

import { Bonus } from "../../../models/bonus.model"
import "./bonus-panel.component.css"
import woodenBackground from "../../../resources/images/backgrounds/parchment2.jpg"

export interface BonusPanelProps {
    bonus: Bonus
}

const BonusPanel: React.FC<BonusPanelProps> = (props) => {
    const { t } = useTranslation()

    return (
        <div className="BonusPanel" style={{ background: `url(${woodenBackground})` }}>
            {props.bonus.affectedUnits.length > 0 ? (
                <div className="Section">
                    <span className="Title"> {t('List of affected units')}: </span>
                    <div className="List">
                        {props.bonus.affectedUnits.map(unit => {
                            return (<CivFilterTechComponent key={unit.id} tech={unit}></CivFilterTechComponent>)
                        })}
                    </div>
                </div>
            ) : ''}
            {props.bonus.affectedUpgrades.length > 0 ? (
                <div className="Section">
                    <span className="Title"> {t('List of affected upgrades')}: </span>
                    <div className="List">
                        {props.bonus.affectedUpgrades.map(upgrade => {
                            return (<CivFilterTechComponent key={upgrade.id} tech={upgrade}></CivFilterTechComponent>)
                        })}
                    </div>
                </div>
            ) : ''}
        </div>
    )

}

export default BonusPanel