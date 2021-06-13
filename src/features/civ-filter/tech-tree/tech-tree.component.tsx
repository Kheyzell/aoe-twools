import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Tooltip } from "@material-ui/core"

import GroupTechTreeComponent from "./group-tech-tree/group-tech-tree.component"
import { isInComparisonModeSelector, resetTechSelection, selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleCivSelection, unselectCivs } from "../civFilterSlice"
import './tech-tree.component.css'
import increaseIcon from "../../../resources/icons/increase.svg"
import reduceIcon from "../../../resources/icons/reduce.svg"
import refreshIcon from "../../../resources/icons/refresh.png"
import woodenBackground from "../../../resources/images/backgrounds/wood2.jpg"
import darkAge from "../../../resources/images/darkAge.png"
import feudalAge from "../../../resources/images/feudalAge.png"
import castleAge from "../../../resources/images/castleAge.png"
import imperialAge from "../../../resources/images/imperialAge.png"
import { CivTechTree, Tech } from "../../../models/techs.model"
import TechComponent, { BoxSize } from "./tech/tech.component"
import { fullTechTree } from "../../../constants/tech-trees/_full-tech-tree.const"
import { scrollHorizontally } from "../../../utils/utils"
import localStorageService from "../../../core/local-storage.service"
import civFilterService from "../civ-filter.service"

type TechTreeProps = {}

const TechTreeComponent: React.FC<TechTreeProps> = (props: TechTreeProps) => {
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLElement>(null)

  const [techSize, setTechSize] = useState<BoxSize>(localStorageService.loadCivFilterTechSize() || BoxSize.normal)

  const selectedCiv = useSelector(selectedCivSelector)
  const selectedCiv2 = useSelector(selectedCiv2Selector)
  const isInComparisonMode = useSelector(isInComparisonModeSelector)
  const selectedTechs = useSelector(selectedTechsSelector)
  const techTreeToDisplay = selectedCiv ?
    (selectedCiv2 ? civFilterService.generateTechTreeToDisplayFrom(civFilterService.generateTechTreeToDisplayFrom(fullTechTree, selectedCiv), selectedCiv2) : civFilterService.generateTechTreeToDisplayFrom(fullTechTree, selectedCiv))
    : fullTechTree

  const onChangeTechSize = () => {
    const newTechSize = techSize === BoxSize.normal ? BoxSize.small : BoxSize.normal
    setTechSize(newTechSize)
    localStorageService.storeCivFilterTechSize(newTechSize)
  }

  const onResetClick = () => {
    dispatch(unselectCivs())
    dispatch(resetTechSelection())
  }

  const onCivClick = (civ: CivTechTree) => {
    dispatch(toggleCivSelection({ ...civ }))
  }

  const SelectedCivs = () => {
    if (!!selectedCiv || !!selectedCiv2) {
      return (
        <div className="SelectedCivs">
          {selectedCiv ? (
            <Tooltip title={<span> {t(`civ.${selectedCiv?.id}.name`)} </span>}>
              <img src={selectedCiv?.crest} alt="Crest" onClick={() => onCivClick(selectedCiv)} />
            </Tooltip>
          ) : ''}
          {selectedCiv2 ? (
            <Tooltip title={<span> {t(`civ.${selectedCiv2?.id}.name`)} </span>}>
              <img src={selectedCiv2?.crest} alt="Crest" onClick={() => onCivClick(selectedCiv2)} />
            </Tooltip>
          ) : ''}
        </div>
      )
    }
    return null
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
          <div className="Civ1"> <div className="ColorBox"></div> {t(`civ.${selectedCiv?.id}.name`)} <img src={selectedCiv?.crest} alt="Crest" /> </div>
          <div className="Civ2"> <div className="ColorBox"></div> {t(`civ.${selectedCiv2?.id}.name`)} <img src={selectedCiv2?.crest} alt="Crest" /> </div>
        </div>
      )
    }
    return (
      <div className="Legend">
        <div className="Unit"> <div className="ColorBox"></div> {t('Unit')} </div>
        <div className="Upgrade"> <div className="ColorBox"></div> {t('Technology')} </div>
        <div className="Unique"> <div className="ColorBox"></div> {t('Unique')} </div>
      </div>
    )
  }

  const { t } = useTranslation();

  return (
    <div className="TechTree" ref={scrollRef as React.RefObject<HTMLDivElement>} onWheel={(e) => scrollHorizontally(e, scrollRef)}>
      <div className="Tools">
        <Tooltip title={<span>{techSize === BoxSize.normal ? t('Scale down') : t('Scale up')}</span>}>
          <button onClick={onChangeTechSize}> <img src={techSize === BoxSize.normal ? reduceIcon : increaseIcon} alt="Size" /> </button>
        </Tooltip>

        <button onClick={onResetClick}> <img src={refreshIcon} alt="Refresh" /> </button>

        <SelectedCivs></SelectedCivs>

        <div className="SelectedTechs">
          {toolsSelectedTechs.map((tech: Tech, index: number) => {
            return (<TechComponent key={index} tech={tech} size={BoxSize.mini}></TechComponent>)
          })}
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

      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.blacksmith} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.barracks} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.archery} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.stable} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.siege} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.castle} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.monastery} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.university} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.townCenter} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.lumberCamp} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.mill} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.miningCamp} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.market} techSize={techSize}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={techTreeToDisplay.dock} techSize={techSize}></GroupTechTreeComponent>

      <LegendDisplay></LegendDisplay>
    </div>
  );
}

export default TechTreeComponent;