import React from "react"
import { useDispatch, useSelector } from "react-redux"

import TechComponent, { BoxSize } from "../../../../components/tech/tech.component"
import { CivTechTree, Tech } from "../../../../models/techs.model"
import civFilterService from "../../civ-filter.service"
import { techTooltipInteractivitySelector, selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleTechsSelection, TooltipInteractivity } from "../../civ-filter.slice"

import './civ-filter-tech.component.css'


type Props = {
  tech: Tech
  size?: BoxSize
}

const CivFilterTechComponent: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const selectedCiv = useSelector(selectedCivSelector)
  const selectedCiv2 = useSelector(selectedCiv2Selector)
  const selectedTechs = useSelector(selectedTechsSelector)
  const tooltipInteractivity = useSelector(techTooltipInteractivitySelector)
  
  const isInCivTree = (civTree?: CivTechTree | null) => {
    if (civTree) {
      return civFilterService.civHasTech(civTree, props.tech)
    }
  }
  
  const size = props.size || BoxSize.normal
  
  const isSelected = !!selectedTechs.find(selectedTech => selectedTech.id === props.tech.id)
  const isUnavailable = !!selectedCiv && !isInCivTree(selectedCiv) && !isInCivTree(selectedCiv2)
  
  const isInSelectedCivTree1Class = selectedCiv && selectedCiv2 && isInCivTree(selectedCiv) ? 'SelectedCiv1' : ''
  const isInSelectedCivTree2Class = selectedCiv && selectedCiv2 && isInCivTree(selectedCiv2) ? 'SelectedCiv2' : ''
  const showTooltip = tooltipInteractivity !== TooltipInteractivity.none
  const isTooltipInteractive = tooltipInteractivity === TooltipInteractivity.locked

  const onTechClick = () => {
    dispatch(toggleTechsSelection(props.tech.id))
  }

  return (
    <div className="CivFilterTech">
      <TechComponent tech={props.tech} size={size} isSelected={isSelected} isUnavailable={isUnavailable}
        classes={[isInSelectedCivTree1Class, isInSelectedCivTree2Class]} showTooltip={showTooltip} isTooltipInteractive={isTooltipInteractive} showTooltipDetails={true}
        onClick={onTechClick}></TechComponent>
    </div>
  )
};

export default CivFilterTechComponent