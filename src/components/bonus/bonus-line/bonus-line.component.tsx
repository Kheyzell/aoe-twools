import React from "react"
import { useTranslation } from "react-i18next"

import { Bonus, UniqueTech } from "../../../models/bonus.model"
import WideTooltip from "../../wide-tooltip.component"
import BonusPanel from "../bonus-panel/bonus-panel.component"
import "./bonus-line.component.css"

export interface BonusLineProps {
    civId: string
    bonus: Bonus | UniqueTech
}

const BonusLine: React.FC<BonusLineProps> = (props) => {
    const { t } = useTranslation()

    const isUniqueTech = props.bonus instanceof UniqueTech
    const hasTooltip = props.bonus.affectedUnits.length > 0 || props.bonus.affectedUpgrades.length > 0

    const bonusDescriptionDisplay = (bonus: Bonus) => (
        <span className={hasTooltip ? 'HasTooltip' : ''}>
            {bonus.team ? (<span className="TeamBonus"> {t('Team bonus')}: </span>) : ""} {t(`civ.${props.civId}.bonus.${bonus.id}.description`)}
        </span>
    )

    const uniqueTechDescriptionDisplay = (uniqueTech: UniqueTech) => (
        <span className={hasTooltip ? 'HasTooltip' : ''}>
            {t(`upgrade.${uniqueTech.id}.name`)}: {t(`upgrade.${uniqueTech.id}.description`)}
        </span>
    )

    return (
        <div className="BonusLine">
            <WideTooltip title={hasTooltip ? <BonusPanel bonus={props.bonus}></BonusPanel> : ''} placement="right-start" arrow>
                {isUniqueTech ? (
                    uniqueTechDescriptionDisplay(props.bonus as UniqueTech)
                ) : (
                    bonusDescriptionDisplay(props.bonus as Bonus)
                )}
            </WideTooltip>
        </div>
    )

}

export default BonusLine