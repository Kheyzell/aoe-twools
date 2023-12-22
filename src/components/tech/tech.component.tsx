import React from "react"
import { useTranslation } from "react-i18next"

import { castleUpgrades } from "../../constants/techs/castle-techs.const"
import { isUnit, isUpgrade, Tech, TechType } from "../../models/techs.model"
import { Unit } from "../../models/unit.model"
import { Upgrade } from "../../models/upgrade.model"
import UnitPanel from "../unit-panel/unit-panel.component"
import UpgradePanel from "../upgrade-panel/upgrade-panel.component"
import WideTooltip from "../wide-tooltip.component"

import './tech.component.css'

export enum BoxSize {
  mini = 'mini',
  small = 'small',
  normal = 'normal'
}

type Props = {
  tech: Tech
  size?: BoxSize
  isSelected?: boolean
  isUnavailable?: boolean
  classes?: string[]
  imageSrc?: string
  showTooltip?: boolean
  shouldShowTooltipDetails?: boolean
  isTooltipInteractive?: boolean
  onClick?(tech: Tech): void
  onRightClick?(tech: Tech): void
}

const TechComponent: React.FC<Props> = ({
  tech,
  size = BoxSize.normal,
  isSelected,
  isUnavailable,
  classes,
  imageSrc,
  showTooltip,
  shouldShowTooltipDetails = false,
  isTooltipInteractive = size !== BoxSize.mini,
  onClick,
  onRightClick,
}) => {
  const { t } = useTranslation()

  const uniqueTech = tech.type === TechType.upgrade && tech.unique

  let imageId = tech.id
  if (uniqueTech) {
    if (tech.age === 3) {
      imageId = castleUpgrades.castleUniqueTech.id
    }
    if (tech.age === 4) {
      imageId = castleUpgrades.imperialUniqueTech.id
    }
  }

  const onTechClick = () => {
    if (onClick) {
      onClick(tech)
    }
  }

  const onTechRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onRightClick) {
      e.preventDefault()
      onRightClick(tech)
    }
  }

  const imgSrc = './' + process.env.PUBLIC_URL + '/images/techs/' + imageId + '.png'

  const techClass = tech.type === TechType.unit ? 'UnitTech' : 'UpgradeTech'
  const sizeClass = size === BoxSize.normal ? 'Normal' : size === BoxSize.small ? 'Small' : size === BoxSize.mini ? 'Mini' : ''
  const selectedClass = isSelected ? 'Selected' : ''
  const translationKey = `${(tech.type === TechType.unit ? 'unit' : tech.type === TechType.upgrade ? 'upgrade' : 'unique')}.${tech.id}`
  const unavailableClass = isUnavailable ? 'Unavailable' : ''
  const uniqueClass = tech.unique ? 'Unique' : ''

  const addedClasses = classes?.reduce((addedClasses: string, c: string) => addedClasses + ' ' + c, '') || ''

  const isMini = size === BoxSize.mini
  const showTooltipDetails = !!shouldShowTooltipDetails && (isUpgrade(tech) || (isUnit(tech) && !!tech.stats))

  const tooltipContent = showTooltip && (tech.type === TechType.upgrade || !!(tech as Unit).stats.health) ? (isMini ?
    (tech.type === TechType.unit ? <div className="TooltipName"> {t(`${translationKey}.name`)} </div> : <UpgradePanel upgrade={tech as Upgrade} shouldShowDetails={shouldShowTooltipDetails} />) :
    (tech.type === TechType.unit ? (<UnitPanel unit={tech as Unit} />) : (<UpgradePanel upgrade={tech as Upgrade} shouldShowDetails={shouldShowTooltipDetails} />))) : ''

  return (
    <WideTooltip title={tooltipContent} interactive={isTooltipInteractive} arrow placement={showTooltipDetails ? 'right' : 'bottom'}>
      <div
        className={`Tech ${techClass} ${sizeClass} ${selectedClass} ${unavailableClass} ${uniqueClass} ${addedClasses}`}
        onClick={onTechClick} onContextMenu={e => onTechRightClick(e)}>
        <div className="Gray-Overlay"></div>
        <span className="Name"> {t(`${translationKey}.name`)} </span>
        <img src={imageSrc ? imageSrc : imgSrc} alt="Tech" />
      </div>
    </WideTooltip>
  )
};

export default TechComponent