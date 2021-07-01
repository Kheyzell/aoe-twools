import React from "react"
import { useSelector } from "react-redux"

import TechComponent, { BoxSize } from "../../../components/tech/tech.component"
import { Tech } from "../../../models/techs.model"
import { Unit } from "../../../models/unit.model"
import { selectedUnitsSelector } from "../unit-calculator.slice"

import './unit-calculator-unit.component.css'


type Props = {
  unit: Unit
  size?: BoxSize
  onClick?(tech: Tech): void
  onRightClick?(tech: Tech): void
}

const UnitCalculatorUnitComponent: React.FC<Props> = (props) => {
  const selectedUnit = useSelector(selectedUnitsSelector)
  
  const isSelected1 = props.unit.id === selectedUnit.unit1.id
  const isSelected2 = props.unit.id === selectedUnit.unit2.id

  const onTechClick = () => {
    if (props.onClick) {
      props.onClick(props.unit)
    }
  }
  
  const onTechRightClick = () => {
    if (props.onRightClick) {
      props.onRightClick(props.unit)
    }
  }

  const selected1Class = isSelected1 ? 'Selected1' : ''
  const selected2Class = isSelected2 ? 'Selected2' : ''

  return (
    <div className="UnitCalculatorUnit">
      <TechComponent tech={props.unit} size={props.size} isSelected={isSelected1 || isSelected2} classes={[selected1Class, selected2Class]} showTooltip={true}
        onClick={onTechClick} onRightClick={onTechRightClick}></TechComponent>
    </div>
  )
};

export default UnitCalculatorUnitComponent