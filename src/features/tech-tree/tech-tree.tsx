import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import GroupTechTreeComponent from "./group-tech-tree/group-tech-tree"
import { isInComparisonModeSelector, resetTechSelection, selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleCivSelection, unselectCivs } from "./civFilterSlice"
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
import { scrollHorizontally } from "../../utils/utils"
import { useTranslation } from "react-i18next"

type Props = {}
type State = {}

const TechTreeComponent: React.FC<Props> = (props, state: State) => {
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLElement>(null)
  
  const selectedCiv = useSelector(selectedCivSelector)
  const selectedCiv2 = useSelector(selectedCiv2Selector)
  const isInComparisonMode = useSelector(isInComparisonModeSelector)
  const selectedTechs = useSelector(selectedTechsSelector)
  const techTreeToDisplay = selectedCiv ?
    (selectedCiv2 ? generateTechTreeToDisplayFrom(generateTechTreeToDisplayFrom(fullTechTree, selectedCiv), selectedCiv2) : generateTechTreeToDisplayFrom(fullTechTree, selectedCiv))
    : fullTechTree

  const onResetClick = () => {
    dispatch(unselectCivs())
    dispatch(resetTechSelection())
  }

  const onCivClick = (civ: CivTechTree) => {
    dispatch(toggleCivSelection({ ...civ }))
  }

  const displaySelectedCivs = () => {
    if (!!selectedCiv || !!selectedCiv2) {
      return (<div className="SelectedCivs">
        { selectedCiv ? (<img src={selectedCiv?.crest} alt="Crest" onClick={() => onCivClick(selectedCiv)} />) : '' }
        { selectedCiv2 ? (<img src={selectedCiv2?.crest} alt="Crest" onClick={() => onCivClick(selectedCiv2)} />) : '' }
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

  const LegendDisplay = () => {
    if (isInComparisonMode) {
      return (
        <div className="Legend">
          <div className="Civ1"> <div className="ColorBox"></div> { t(`civ.${selectedCiv?.id}.name`) } <img src={selectedCiv?.crest} alt="Crest" /> </div>
          <div className="Civ2"> <div className="ColorBox"></div> { t(`civ.${selectedCiv2?.id}.name`) } <img src={selectedCiv2?.crest} alt="Crest" /> </div>
        </div>
      )
    }
    return (
      <div className="Legend">
        <div className="Unit"> <div className="ColorBox"></div> { t('Unit') } </div>
        <div className="Upgrade"> <div className="ColorBox"></div> { t('Technology') } </div>
        <div className="Unique"> <div className="ColorBox"></div> { t('Unique') } </div>
      </div>
    )
  }

  const { t } = useTranslation();

  return (
    <div className="TechTree" ref={scrollRef as React.RefObject<HTMLDivElement>} onWheel={(e) => scrollHorizontally(e, scrollRef)}>
      <div className="Tools">
        <button onClick={onResetClick}> <img src={refreshIcon} alt="Refresh" /> </button>

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
      
      <LegendDisplay></LegendDisplay>
    </div>
  );
}

export default TechTreeComponent;