import React, { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import CivCrest from "../../../components/civ-crest/civ-crest.component"
import CivPanel from "../../../components/civ-panel/civ-panel.component"
import WideTooltip from "../../../components/wide-tooltip.component"
import { allCivTechTrees } from "../../../constants"
import { CivTechTree, TechType } from "../../../models/techs.model"
import { Unit } from "../../../models/unit.model"
import { Upgrade } from "../../../models/upgrade.model"
import { scrollHorizontally } from "../../../utils/utils"
import civFilterService from "../civ-filter.service"
import { selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleCiv2Selection, toggleCivSelection } from "../civ-filter.slice"
import './civ-list.component.css'


const CivList: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const filteredListRef = useRef<HTMLElement>(null)
    const fullyUpgradedListRef = useRef<HTMLElement>(null)
    const excludedListRef = useRef<HTMLElement>(null)

    const allCivTechs: CivTechTree[] = [...allCivTechTrees]
    const selectedCiv = useSelector(selectedCivSelector)
    const selectedCiv2 = useSelector(selectedCiv2Selector)
    const selectedTechs = useSelector(selectedTechsSelector)

    const onCivClick = (civ: CivTechTree) => {
        dispatch(toggleCivSelection(civ.id))
    }
    const onCiv2Click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, civ: CivTechTree) => {
        e.preventDefault()
        if (!!selectedCiv && civ.id !== selectedCiv.id) {
            dispatch(toggleCiv2Selection(civ.id))
        }
    }

    const [showTools, setShowTools] = useState<boolean>(false)
    const [showCivsFullyUpgraded, setShowCivsFullyUpgraded] = useState<boolean>(false)
    const [showCivsExcluded, setShowCivsExcluded] = useState<boolean>(false)
    const onEnterTools = () => setShowTools(true)
    const onLeaveTools = () => setShowTools(false)

    const selectedUnits = selectedTechs.filter(tech => tech.type === TechType.unit) as Unit[]
    const civsWithSelectedUnits = allCivTechs.filter(civTechs => {
        return selectedUnits.reduce((hasAllUnits: Boolean, currentUnit: Unit) => {
            return hasAllUnits && civFilterService.civHasUnit(civTechs, currentUnit)
        }, true)
    })

    const filteredTechTrees = civsWithSelectedUnits.filter(civTechs => {
        const selectedUpgrades = selectedTechs.filter(tech => tech.type === TechType.upgrade) as Upgrade[]
        return selectedUpgrades.reduce((hasAllTechs: Boolean, currentUpgrade: Upgrade) => {
            return hasAllTechs && civFilterService.civHasUpgrade(civTechs, currentUpgrade)
        }, true)
    })
    const fullyUpgradedFilteredUnitsTechTrees = showCivsFullyUpgraded && selectedUnits.length > 0 ? civsWithSelectedUnits.filter(civ => {
        const allNeededUpgrades = selectedUnits.map(unit => unit.affectingUpgrades || []).reduce((neededUpgrades: Upgrade[], unitAffectingUpgrades: Upgrade[]) => {
            return neededUpgrades.concat(unitAffectingUpgrades)
        }, [])
        return allNeededUpgrades.reduce((hasAllUpgrades: boolean, upgrade: Upgrade) => {
            return hasAllUpgrades && civFilterService.civHasUpgrade(civ, upgrade)
        }, true)
    }) : []
    const excludedTechTrees = showCivsExcluded ? allCivTechs.filter(civ => !filteredTechTrees.find(filteredCiv => filteredCiv.id === civ.id)) : []

    return (
        <div className="CivList">
            <div className="Tools" onMouseEnter={() => onEnterTools()} onMouseLeave={() => onLeaveTools()}>
                {
                    showTools ?
                        (<div>
                            <label htmlFor="FullyUpgraded" onClick={() => { setShowCivsFullyUpgraded(!showCivsFullyUpgraded) }} title={t('Show the list of civilisations having the selected units fully upgraded')}>
                                <input name="FullyUpgraded" type="checkbox" checked={showCivsFullyUpgraded} readOnly /> {t('Show Fully upgraded')}
                            </label>
                            <label htmlFor="Excluded" onClick={() => { setShowCivsExcluded(!showCivsExcluded) }} title={t('Show the list of civilisations that do not satisfy the filters')}>
                                <input name="Excluded" type="checkbox" checked={showCivsExcluded} readOnly /> {t('Show Excluded')}
                            </label>
                        </div>)
                        :
                        (<button> <span> &lt; </span> </button>)
                }

            </div>

            <div className="List Filtered" ref={filteredListRef as React.RefObject<HTMLDivElement>} onWheel={e => scrollHorizontally(e, filteredListRef)}>
                {showCivsFullyUpgraded || showCivsExcluded ? <div className="Title"> {t('Filtered')}: </div> : ''}
                {filteredTechTrees.map(civ => {
                    const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                    const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                    return (
                        <WideTooltip title={<CivPanel civ={civ}></CivPanel>} interactive arrow key={civ.id}>
                            <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                                key={civ.id}
                                onClick={() => onCivClick(civ)}
                                onContextMenu={e => onCiv2Click(e, civ)}>
                                <CivCrest civ={civ}></CivCrest>
                            </div>
                        </WideTooltip>
                    )
                })}
            </div>

            { showCivsFullyUpgraded ?
                (
                    <div className="List FullyUpgraded" ref={fullyUpgradedListRef as React.RefObject<HTMLDivElement>} onWheel={e => scrollHorizontally(e, fullyUpgradedListRef)}>
                        <div className="Title"> {t('Fully upgraded')}: </div>
                        {fullyUpgradedFilteredUnitsTechTrees.map(civ => {
                            const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                            const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                            return (
                                <WideTooltip title={<CivPanel civ={civ}></CivPanel>} interactive arrow key={civ.id}>
                                    <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                                        key={civ.id}
                                        onClick={() => onCivClick(civ)}
                                        onContextMenu={e => onCiv2Click(e, civ)}>
                                        <img src={civ.crest} alt={t(`civ.${civ.id}.name`)} />
                                    </div>
                                </WideTooltip>
                            )
                        })}
                    </div>
                )
                : ''}

            { showCivsExcluded ?
                (
                    <div className="List Excluded" ref={excludedListRef as React.RefObject<HTMLDivElement>} onWheel={e => scrollHorizontally(e, excludedListRef)}>
                        <div className="Title"> {t('Excluded')}: </div>
                        {excludedTechTrees.map(civ => {
                            const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                            const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                            return (
                                <WideTooltip title={<CivPanel civ={civ}></CivPanel>} interactive arrow key={civ.id}>
                                    <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                                        key={civ.id}
                                        onClick={() => onCivClick(civ)}
                                        onContextMenu={e => onCiv2Click(e, civ)}>
                                        <img src={civ.crest} alt={t(`civ.${civ.id}.name`)} />
                                    </div>
                                </WideTooltip>
                            )
                        })}
                    </div>
                )
                : ''}
        </div>
    )
}

export default CivList