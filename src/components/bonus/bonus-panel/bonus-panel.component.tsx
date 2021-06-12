import React from "react"
import { useTranslation } from "react-i18next"
import TechComponent from "../../../features/civ-filter/tech-tree/tech/tech.component"

import { Bonus } from "../../../models/bonus.model"
import "./bonus-panel.component.css"

export interface BonusPanelProps {
    bonus: Bonus
}

const BonusPanel: React.FC<BonusPanelProps> = (props) => {
    const { t } = useTranslation()

    return (
        <div className="BonusPanel">
            {props.bonus.affectedUnits.length > 0 ? (
                <div className="Section">
                    <span className="Title"> {t('List of affected units')}: </span>
                    <div className="List">
                        {props.bonus.affectedUnits.map(unit => {
                            return (<TechComponent tech={unit}></TechComponent>)
                        })}
                    </div>
                </div>
            ) : ''}
            {props.bonus.affectedUpgrades.length > 0 ? (
                <div className="Section">
                    <span className="Title"> {t('List of affected upgrades')}: </span>
                    <div className="List">
                        {props.bonus.affectedUpgrades.map(upgrade => {
                            return (<TechComponent tech={upgrade}></TechComponent>)
                        })}
                    </div>
                </div>
            ) : ''}
        </div>
    )

}

export default BonusPanel