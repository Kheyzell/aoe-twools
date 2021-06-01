import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { castleUpgrades } from "../../../constants/techs/castle-techs.const"

import { Tech, TechType } from "../../../models/techs.model"
import { civHasTech } from "../../../utils/tech-tree.utils"
import { selectedCivSelector, selectedTechsSelector, toggleTechsSelelection } from "../civFilterSlice"

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
  const dispatch = useDispatch()
  const selectedCiv = useSelector(selectedCivSelector)
  const selectedTechs = useSelector(selectedTechsSelector)

  const isSelected = () => !!selectedTechs.find(selectedTech => selectedTech.id === props.tech.id)
  const isTechInSelectedCivTree = () => {
    if (selectedCiv) {
      return civHasTech(selectedCiv, props.tech)
    }
  }

  const onTechClick = () => {
    dispatch(toggleTechsSelelection({ ...props.tech }))
  }

  const uniqueTech = props.tech.type === TechType.uniqueTech
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

  const techClass = props.tech.type === TechType.unit ? 'UnitTech' : 'UpgradeTech'
  const sizeClass = size === BoxSize.normal ? 'Normal' : size === BoxSize.mini ? 'Mini' : ''
  return (
    <div className={`Tech ${techClass} ${sizeClass} ${isSelected() ? 'Selected' : ''} ${!selectedCiv || isTechInSelectedCivTree() ? '' : 'Unavailable'} ${props.tech.unique ? 'Unique' : ''}`} onClick={onTechClick}>
      <div className="Gray-Overlay"></div>
      <span className="Name"> {props.tech.name} </span>
      <img src={'./' + process.env.PUBLIC_URL + '/images/techs/' + imageId + '.png'} />
    </div>
  )
};

export default TechComponent