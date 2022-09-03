import React from "react"
import { Trans, useTranslation } from "react-i18next"

import { Bonus, UniqueTech } from "../../../models/bonus.model"
import CivCrest from "../../civ-crest/civ-crest.component"
import WideTooltip from "../../wide-tooltip.component"
import BonusPanel from "../bonus-panel/bonus-panel.component"
import "./bonus-line.component.css"

export interface BonusLineProps {
    bonus: Bonus | UniqueTech
    displayTeamBonus?: boolean
    displayCivCrest?: boolean
    hideTooltip?: boolean
}

const BonusLine: React.FC<BonusLineProps> = (props) => {
    const { t } = useTranslation()

    const isUniqueTech = props.bonus instanceof UniqueTech
    const hasTooltip = !props.hideTooltip && (props.bonus.affectedUnits.length > 0 || props.bonus.affectedUpgrades.length > 0)

    const bonusDescriptionDisplay = (bonus: Bonus) => (
        <span className={hasTooltip ? 'HasTooltip' : ''}>
            { props.displayCivCrest ? <CivCrest civ={props.bonus.civ} mini={true}></CivCrest> : '' }
            { bonus.team && props.displayTeamBonus ? (<span className="TeamBonus"> {t('Team bonus')}: </span>) : '' }
            <Trans
                i18nKey={`civ.${props.bonus.civ?.id}.bonus.${bonus.id}.description`}
                values={ bonus } />
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