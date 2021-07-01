import React from "react"

import TechComponent, { BoxSize } from "../../../components/tech/tech.component"
import { UniqueTech } from "../../../models/bonus.model"
import { Upgrade } from "../../../models/upgrade.model"

import './unit-calculator-upgrade.component.css'

type Props = {
  upgrade: Upgrade
  size?: BoxSize
  isSelected: boolean
  onClick(upgrade: Upgrade): void
}

const UnitCalculatorUpgradeComponent: React.FC<Props> = (props) => {

  const isUniqueTech = !!props.upgrade.unique

  const onUpgradeClick = () => {
    props.onClick(props.upgrade)
  }

  const uniqueTechClasses = [isUniqueTech ? 'UniqueTech' : '']
  if (props.upgrade.age === 4) {
    uniqueTechClasses.push('Imperial')
  }

  return (
    <div className="UnitCalculatorUpgrade">
      <TechComponent tech={props.upgrade} size={props.size} isSelected={props.isSelected} showTooltip={true} imageSrc={(props.upgrade as UniqueTech).civ?.crest} classes={uniqueTechClasses}
        onClick={onUpgradeClick}></TechComponent>
    </div>
  )
  
};

export default UnitCalculatorUpgradeComponent