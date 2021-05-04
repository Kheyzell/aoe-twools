import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Tech, TechType } from "../../../models/techs.model"
import { selectedTechsSelector, selectTech, toggleTechsSelelection } from "../techSlice"

import './tech.component.css'

type Props = {
  tech: Tech
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

  const techClass = props.tech.type === TechType.unit ? 'UnitTech' : 'UpgradeTech'
  return (
    <div className={`Tech ${techClass} ${isSelected() ? 'Selected' : ''}`} onClick={onTechClick}>
      <span className="Name"> {props.tech.name} </span>
      <img src={'./' + process.env.PUBLIC_URL + '/images/techs/' + props.tech.id + '.png'} />
    </div>
  )
};

export default TechComponent