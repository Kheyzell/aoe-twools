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
  showTooltipDetails?: boolean
  isTooltipInteractive?: boolean
  onClick?(tech: Tech): void
  onRightClick?(tech: Tech): void
}

const TechComponent: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  const uniqueTech = props.tech.type === TechType.upgrade && props.tech.unique
  const size = props.size || BoxSize.normal
  
  let imageId = props.tech.id
  if (uniqueTech) {
    if (props.tech.age === 3) {
      imageId = castleUpgrades.castleUniqueTech.id
    }
    if (props.tech.age === 4) {
      imageId = castleUpgrades.imperialUniqueTech.id
    }
  }

  const onTechClick = () => {
    if (props.onClick) {
      props.onClick(props.tech)
    }
  }
  
  const onTechRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.onRightClick) {
      e.preventDefault()
      props.onRightClick(props.tech)
    }
  }

  const imgSrc = './' + process.env.PUBLIC_URL + '/images/techs/' + imageId + '.png'

  const techClass = props.tech.type === TechType.unit ? 'UnitTech' : 'UpgradeTech'
  const sizeClass = size === BoxSize.normal ? 'Normal' : size === BoxSize.small ? 'Small' : size === BoxSize.mini ? 'Mini' : ''
  const selectedClass = props.isSelected ? 'Selected' : ''
  const translationKey = `${(props.tech.type === TechType.unit ? 'unit' : props.tech.type === TechType.upgrade ? 'upgrade' : 'unique')}.${props.tech.id}`
  const unavailableClass = props.isUnavailable ? 'Unavailable' : ''
  const uniqueClass = props.tech.unique ? 'Unique' : ''

  const addedClasses = props.classes?.reduce((addedClasses: string, c: string) => addedClasses + ' ' + c, '') || ''

  const isMini = size === BoxSize.mini
  const showTooltipDetails = !!props.showTooltipDetails && (isUpgrade(props.tech) || (isUnit(props.tech) && !!props.tech.stats))

  const tooltipContent = props.showTooltip && (props.tech.type === TechType.upgrade || !!(props.tech as Unit).stats.health) ? (isMini ?
                          (props.tech.type === TechType.unit ? <div className="TooltipName"> {t(`${translationKey}.name`)} </div> : <UpgradePanel upgrade={props.tech as Upgrade} showDetails={showTooltipDetails} />) :
                          (props.tech.type === TechType.unit ? (<UnitPanel unit={props.tech as Unit} />) : (<UpgradePanel upgrade={props.tech as Upgrade} showDetails={showTooltipDetails} />))) : ''
  const isTooltipInteractive = props.isTooltipInteractive !== undefined ? props.isTooltipInteractive : size !== BoxSize.mini

  return (
    <WideTooltip title={tooltipContent} interactive={isTooltipInteractive} arrow placement={showTooltipDetails ? 'right' : 'bottom'}>
      <div
        className={`Tech ${techClass} ${sizeClass} ${selectedClass} ${unavailableClass} ${uniqueClass} ${addedClasses}`}
        onClick={onTechClick} onContextMenu={e => onTechRightClick(e)}>
        <div className="Gray-Overlay"></div>
        <span className="Name"> {t(`${translationKey}.name`)} </span>
        <img src={props.imageSrc ? props.imageSrc : imgSrc} alt="Tech" />
      </div>
    </WideTooltip>
  )
};

export default TechComponent