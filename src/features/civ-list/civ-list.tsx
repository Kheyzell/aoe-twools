import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { allCivTechTrees } from "../../constants"
import { CivTechTree, TechType, Unit, Upgrade } from "../../models/techs.model"
import { civHasUnit, civHasUpgrade } from "../../utils/tech-tree.utils"
import { scrollHorizontally } from "../../utils/utils"
import { selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleCiv2Selection, toggleCivSelection } from "../tech-tree/civFilterSlice"
import './civ-list.css'
import CivPanel from "./civ-panel"

type ShowCivPanel = { [civId: string]: boolean }

type Props = {}
type State = {}

const CivList: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const filteredListRef = useRef<HTMLElement>(null)
    const fullyUpgradedListRef = useRef<HTMLElement>(null)
    const excludedListRef = useRef<HTMLElement>(null)

    const allCivTechs: CivTechTree[] = [...allCivTechTrees]
    const selectedCiv = useSelector(selectedCivSelector)
    const selectedCiv2 = useSelector(selectedCiv2Selector)
    const selectedTechs = useSelector(selectedTechsSelector)

    const onCivClick = (civ: CivTechTree) => {
        dispatch(toggleCivSelection({ ...civ }))
    }
    const onCiv2Click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, civ: CivTechTree) => {
        e.preventDefault()
        if (!!selectedCiv && civ.id !== selectedCiv.id) {
            dispatch(toggleCiv2Selection({ ...civ }))
        }
    }

    const [showTools, setShowTools] = React.useState<boolean>(false)
    const [showCivsFullyUpgraded, setShowCivsFullyUpgraded] = React.useState<boolean>(false)
    const [showCivsExcluded, setShowCivsExcluded] = React.useState<boolean>(false)
    const onEnterTools = () => setShowTools(true)
    const onLeaveTools = () => setShowTools(false)

    const [showCivPanels, setShowCivPanels] = React.useState<ShowCivPanel>({})
    const onEnterCivCrest = (civ: CivTechTree) => {
        let newShowCivPanels: ShowCivPanel = {}
        newShowCivPanels[civ.id] = true
        setShowCivPanels(newShowCivPanels)
    }
    const onLeaveCivCrest = () => {
        setShowCivPanels({})
    }


    const selectedUnits = selectedTechs.filter(tech => tech.type === TechType.unit) as Unit[]
    const civsWithSelectedUnits = allCivTechs.filter(civTechs => {
        return selectedUnits.reduce((hasAllUnits: Boolean, currentUnit: Unit) => {
            return hasAllUnits && civHasUnit(civTechs, currentUnit)
        }, true)
    })
    
    const filteredTechTrees = civsWithSelectedUnits.filter(civTechs => {
        const selectedUpgrades = selectedTechs.filter(tech => tech.type === TechType.upgrade) as Upgrade[]
        return selectedUpgrades.reduce((hasAllTechs: Boolean, currentUpgrade: Upgrade) => {
            return hasAllTechs && civHasUpgrade(civTechs, currentUpgrade)
        }, true)
    })
    const fullyUpgradedFilteredUnitsTechTrees = showCivsFullyUpgraded && selectedUnits.length > 0 ? civsWithSelectedUnits.filter(civ => {
        const allNeededUpgrades = selectedUnits.map(unit => unit.affectingUpgrades || []).reduce((neededUpgrades: Upgrade[], unitAffectingUpgrades: Upgrade[]) => {
            return neededUpgrades.concat(unitAffectingUpgrades)
        }, [])
        return allNeededUpgrades.reduce((hasAllUpgrades: boolean, upgrade: Upgrade) => {
            return hasAllUpgrades && civHasUpgrade(civ, upgrade)
        }, true)
    }) : []
    const excludedTechTrees = showCivsExcluded ? allCivTechs.filter(civ => !filteredTechTrees.find(filteredCiv => filteredCiv.id === civ.id)) : []

    return (
        <div className="CivList">
            <div className="Tools" onMouseEnter={() => onEnterTools()} onMouseLeave={() => onLeaveTools()}>
                {
                    showTools ?
                        (<div>
                            <label htmlFor="FullyUpgraded" onClick={() => { setShowCivsFullyUpgraded(!showCivsFullyUpgraded) }} title="Show the list of civilisations having the selected units fully upgraded">
                                <input name="FullyUpgraded" type="checkbox" checked={showCivsFullyUpgraded} /> Show Fully upgraded
                            </label>
                            <label htmlFor="Excluded" onClick={() => { setShowCivsExcluded(!showCivsExcluded) }} title="Show the list of civilisations that do not satisfy the filters">
                                <input name="Excluded" type="checkbox" checked={showCivsExcluded} /> Show Excluded
                            </label>
                        </div>)
                        :
                        (<button> <span> &lt; </span> </button>)
                }

            </div>

            <div className="List Filtered" ref={filteredListRef as React.RefObject<HTMLDivElement>} onWheel={e => scrollHorizontally(e, filteredListRef)}>
                {filteredTechTrees.map(civ => {
                    const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                    const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                    return (
                        <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                            key={civ.id}
                            onClick={() => onCivClick(civ)}
                            onContextMenu={e => onCiv2Click(e, civ)}
                            onMouseEnter={() => onEnterCivCrest(civ)}
                            onMouseLeave={() => onLeaveCivCrest()}>
                            <span> {civ.name} </span>
                            <img src={civ.crest} alt={civ.name} />
                            <CivPanel civ={civ} show={showCivPanels[civ.id]}></CivPanel>
                        </div>
                    )
                })}
            </div>

            { showCivsFullyUpgraded ?
                (
                    <div className="List FullyUpgraded" ref={fullyUpgradedListRef as React.RefObject<HTMLDivElement>} onWheel={e => scrollHorizontally(e, fullyUpgradedListRef)}>
                        {fullyUpgradedFilteredUnitsTechTrees.map(civ => {
                            const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                            const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                            return (
                                <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                                    key={civ.id}
                                    onClick={() => onCivClick(civ)}
                                    onContextMenu={e => onCiv2Click(e, civ)}
                                    onMouseEnter={() => onEnterCivCrest(civ)}
                                    onMouseLeave={() => onLeaveCivCrest()}>
                                    <span> {civ.name} </span>
                                    <img src={civ.crest} alt={civ.name} />
                                    <CivPanel civ={civ} show={showCivPanels[civ.id]}></CivPanel>
                                </div>
                            )
                        })}
                    </div>
                )
                : ''}
            
            { showCivsExcluded ?
                (
                    <div className="List Excluded" ref={excludedListRef as React.RefObject<HTMLDivElement>} onWheel={e => scrollHorizontally(e, excludedListRef)}>
                        {excludedTechTrees.map(civ => {
                            const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                            const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                            return (
                                <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                                    key={civ.id}
                                    onClick={() => onCivClick(civ)}
                                    onContextMenu={e => onCiv2Click(e, civ)}
                                    onMouseEnter={() => onEnterCivCrest(civ)}
                                    onMouseLeave={() => onLeaveCivCrest()}>
                                    <span> {civ.name} </span>
                                    <img src={civ.crest} alt={civ.name} />
                                    <CivPanel civ={civ} show={showCivPanels[civ.id]}></CivPanel>
                                </div>
                            )
                        })}
                    </div>
                )
                : ''}
        </div>
    )
}

export default CivList