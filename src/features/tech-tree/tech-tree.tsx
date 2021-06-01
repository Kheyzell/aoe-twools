import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import GroupTechTreeComponent from "./group-tech-tree/group-tech-tree"
import { resetTechSelection, selectedCivSelector, selectedTechsSelector, toggleCivSelection, unselectCiv } from "./civFilterSlice"
import './tech-tree.css'
import refreshIcon from "../../resources/icons/refresh.png"
import woodenBackground from "../../resources/images/backgrounds/wood2.jpg"
import darkAge from "../../resources/images/darkAge.png"
import feudalAge from "../../resources/images/feudalAge.png"
import castleAge from "../../resources/images/castleAge.png"
import imperialAge from "../../resources/images/imperialAge.png"
import { CivTechTree, Tech } from "../../models/techs.model"
import TechComponent, { BoxSize } from "./tech/tech.component"
import { fullTechTree } from "../../constants/tech-trees/_full-tech-tree.const"
import { generateTechTreeToDisplayFrom } from "../../utils/tech-tree.utils"

type Props = {}
type State = {}

const TechTreeComponent: React.FC<Props> = (props, state: State) => {
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLElement>(null)
  const selectedCiv = useSelector(selectedCivSelector)
  const selectedTechs = useSelector(selectedTechsSelector)
  const techTreeToDisplay = selectedCiv ? generateTechTreeToDisplayFrom(selectedCiv) : fullTechTree

  const wheelSpeed = 3;

  const onWheel = (e: any) => {
    e.preventDefault();
    if (scrollRef && scrollRef.current) {
      const container = scrollRef.current
      const containerScrollPosition = scrollRef.current.scrollLeft

      container.scrollTo({
        top: 0,
        left: containerScrollPosition + e.deltaY * wheelSpeed,
      })
    }
  }

  const onResetClick = () => {
    dispatch(unselectCiv())
    dispatch(resetTechSelection())
  }

  const onCivClick = (civ: CivTechTree) => {
    dispatch(toggleCivSelection({ ...civ }))
  }

  const displaySelectedCivs = () => {
    if (!!selectedCiv) {
      return (<div className="SelectedCivs">
        <img src={selectedCiv?.crest} alt="Crest" onClick={() => onCivClick(selectedCiv)} />
      </div>)
    }
  }

  const toolsSelectedTechs = selectedTechs.filter(tech => {
    if (tech.nextLineTech) {
      const nextTechId = tech.nextLineTech.id
      return !selectedTechs.find(selectedTech => selectedTech.id === nextTechId)
    }
    return true
  })

  return (
    <div className="TechTree" ref={scrollRef as React.RefObject<HTMLDivElement>} onWheel={onWheel}>
      <div className="Tools">
        <button onClick={onResetClick}> <img src={refreshIcon} alt="Refresh" /> Reset </button>

        {displaySelectedCivs()}

        <div className="SelectedTechs">
          { toolsSelectedTechs.map((tech: Tech, index: number) => {
            return (<TechComponent key={index} tech={tech} size={BoxSize.mini}></TechComponent>)
          }) }
        </div>
      </div>
      <div className="LeftPanel" style={{ background: `url(${woodenBackground})` }}>
        <div className="AgeRow">
          <img src={darkAge} alt="Dark Age" />
        </div>
        <div className="AgeRow">
          <img src={feudalAge} alt="Feudal Age" />
        </div>
        <div className="AgeRow">
          <img src={castleAge} alt="Castle Age" />
        </div>
        <div className="AgeRow">
          <img src={imperialAge} alt="Imperial Age" />
        </div>
      </div>
      <div className="AgePanels">
        <div className="Panel"></div>
        <div className="Panel"></div>
        <div className="Panel"></div>
        <div className="Panel"></div>
      </div>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.blacksmith}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.barracks}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.archery}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.stable}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.siege}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.castle}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.monastery}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.university}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.townCenter}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.lumberCamp}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.mill}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.miningCamp}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.market}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.dock}></GroupTechTreeComponent>
    </div>
  );
}

export default TechTreeComponent;