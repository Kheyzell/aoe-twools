import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Tech, TechType } from "../../../models/techs.model"
import { selectedTechsSelector, toggleTechsSelelection } from "../techSlice"

import './tech.component.css'

export enum BoxSize {
  mini = 'mini',
  normal = 'normal'
} 

type Props = {
  tech: Tech
  size?: BoxSize
  onTechSelected?(tech: Tech): void
}
type State = {}

const TechComponent: React.FC<Props> = (props, state: State) => {
  const dispatch = useDispatch();
  const selectedTechs = useSelector(selectedTechsSelector)

  const isSelected = () => !!selectedTechs.find(selectedTech => selectedTech.id === props.tech.id)

  const onTechClick = () => {
    dispatch(toggleTechsSelelection({ ...props.tech }))
  }

  const size = props.size || BoxSize.normal

  const techClass = props.tech.type === TechType.unit ? 'UnitTech' : 'UpgradeTech'
  const sizeClass = size === BoxSize.normal ? 'Normal' : size === BoxSize.mini ? 'Mini' : ''
  return (
    <div className={`Tech ${techClass} ${sizeClass} ${isSelected() ? 'Selected' : ''} ${props.tech.unique ? 'Unique' : ''}`} onClick={onTechClick}>
      <span className="Name"> {props.tech.name} </span>
      <img src={'./' + process.env.PUBLIC_URL + '/images/techs/' + props.tech.id + '.png'} />
    </div>
  )
};

export default TechComponent