import { Tooltip } from "@material-ui/core"
import React, { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { BoxSize } from "../../../components/tech/tech.component"
import localStorageService from "../../../core/local-storage.service"
import { Tech } from "../../../models/techs.model"
import increaseIcon from "../../../resources/icons/increase.svg"
import noTooltipIcon from "../../../resources/icons/comment-disactivated.svg"
import tooltipDisplayIcon from "../../../resources/icons/comment-activated.svg"
import tooltipLockedIcon from "../../../resources/icons/comment-locked.svg"
import reduceIcon from "../../../resources/icons/reduce.svg"
import refreshIcon from "../../../resources/icons/refresh.png"
import woodenBackground from "../../../resources/images/backgrounds/wood2.jpg"
import castleAge from "../../../resources/images/castleAge.png"
import darkAge from "../../../resources/images/darkAge.png"
import feudalAge from "../../../resources/images/feudalAge.png"
import imperialAge from "../../../resources/images/imperialAge.png"
import { scrollHorizontally } from "../../../utils/utils"
import civFilterService from "../civ-filter.service"
import { isInComparisonModeSelector, techTooltipInteractivitySelector, resetTechSelection, selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleTechTooltipInteractivity, unselectCiv1, unselectCiv2, unselectCivs, TooltipInteractivity } from "../civ-filter.slice"
import CivFilterTechComponent from "./civ-filter-tech/civ-filter-tech.component"
import GroupTechTreeComponent from "./group-tech-tree/group-tech-tree.component"

import './tech-tree.component.css'


type TechTreeProps = {}

const TechTreeComponent: React.FC<TechTreeProps> = (props: TechTreeProps) => {
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLElement>(null)

  const [techSize, setTechSize] = useState<BoxSize>(localStorageService.loadCivFilterTechSize() || BoxSize.normal)

  const selectedCiv = useSelector(selectedCivSelector)
  const selectedCiv2 = useSelector(selectedCiv2Selector)
  const isInComparisonMode = useSelector(isInComparisonModeSelector)
  const selectedTechs = useSelector(selectedTechsSelector)
  const techTooltipInteractivity = useSelector(techTooltipInteractivitySelector)
  const techTreeToDisplay = civFilterService.mergeTechTrees([selectedCiv!, selectedCiv2!].filter(civ => !!civ))

  const onChangeTechSize = () => {
    const newTechSize = techSize === BoxSize.normal ? BoxSize.small : BoxSize.normal
    setTechSize(newTechSize)
    localStorageService.storeCivFilterTechSize(newTechSize)
  }

  const onResetClick = () => {
    dispatch(unselectCivs())
    dispatch(resetTechSelection())
  }

  const onToggleTechDescriptionInteractivity = () => {
    dispatch(toggleTechTooltipInteractivity())
  }

  const onCivClick1 = () => {
    dispatch(unselectCiv1())
  }
  
  const onCivClick2 = () => {
    dispatch(unselectCiv2())
  }

  const tooltipButtonDescription = techTooltipInteractivity === TooltipInteractivity.none ? 'No tooltip' : (techTooltipInteractivity === TooltipInteractivity.display ? 'Show tech tooltip' : 'Lock tech tooltip')
  const tooltipInteractivityIcon = techTooltipInteractivity === TooltipInteractivity.none ? noTooltipIcon : (techTooltipInteractivity === TooltipInteractivity.display ? tooltipDisplayIcon : tooltipLockedIcon)

  const SelectedCivs = () => {
    if (!!selectedCiv || !!selectedCiv2) {
      return (
        <div className="SelectedCivs">
          {selectedCiv ? (
            <Tooltip title={<span> {t(`civ.${selectedCiv?.id}.name`)} </span>}>
              <img src={selectedCiv?.crest} alt="Crest" onClick={() => onCivClick1()} />
            </Tooltip>
          ) : ''}
          {selectedCiv2 ? (
            <Tooltip title={<span> {t(`civ.${selectedCiv2?.id}.name`)} </span>}>
              <img src={selectedCiv2?.crest} alt="Crest" onClick={() => onCivClick2()} />
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
        <div className="Box">
          <Tooltip title={<span>{techSize === BoxSize.normal ? t('Scale down') : t('Scale up')}</span>}>
            <button onClick={onChangeTechSize}> <img src={techSize === BoxSize.normal ? reduceIcon : increaseIcon} alt="Size" /> </button>
          </Tooltip>

          <Tooltip title={<span>{t(tooltipButtonDescription)}</span>}>
            <button onClick={onToggleTechDescriptionInteractivity}> <img src={tooltipInteractivityIcon} alt="Size" /> </button>
          </Tooltip>

          <Tooltip title={<span>{t('Reset filters')}</span>}>
            <button onClick={onResetClick}> <img src={refreshIcon} alt="Refresh" /> </button>
          </Tooltip>

          <SelectedCivs></SelectedCivs>

          <div className="SelectedTechs">
            {toolsSelectedTechs.map((tech: Tech, index: number) => {
              return (<CivFilterTechComponent key={index} tech={tech} size={BoxSize.mini}></CivFilterTechComponent>)
            })}
          </div>
        </div>
        <span className="LastUpdate"> {t('Last update')}: { Intl.DateTimeFormat().format(new Date(Date.UTC(2022, 8, 1))) } </span>
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