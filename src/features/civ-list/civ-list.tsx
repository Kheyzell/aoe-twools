import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { allCivTechTrees } from "../../constants"
import { CivTechTree, Tech } from "../../models/techs.model"
import { civHasTech } from "../../utils/tech-tree.utils"
import { scrollHorizontally } from "../../utils/utils"
import { selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleCiv2Selection, toggleCivSelection } from "../tech-tree/civFilterSlice"
import './civ-list.css'
import CivPanel from "./civ-panel"

type ShowCivPanel = {[civId: string]: boolean}

type Props = {}
type State = {}

const CivList: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const filteredListRef = useRef<HTMLElement>(null)
    const excludedListRef = useRef<HTMLElement>(null)

    const allCivTechs: CivTechTree[] = [...allCivTechTrees]
    const selectedCiv = useSelector(selectedCivSelector)
    const selectedCiv2 = useSelector(selectedCiv2Selector)
    const selectedTechs = useSelector(selectedTechsSelector)

    const filteredTechTrees = allCivTechs.filter(civTechs => {
        return selectedTechs.reduce((hasAllTechs: Boolean, currentTech: Tech) => {
            return hasAllTechs && civHasTech(civTechs, currentTech)
        }, true)
    })

    const excludedTechTrees = allCivTechs.filter(civ => !filteredTechTrees.find(filteredCiv => filteredCiv.id === civ.id))

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

    return (
        <div className="CivList">
            <div className="Tools" onMouseEnter={() => onEnterTools()} onMouseLeave={() => onLeaveTools()}>
                {
                    showTools ?
                        (<label onClick={() => { setShowCivsExcluded(!showCivsExcluded); setShowTools(false) }}>
                            <input type="checkbox" checked={showCivsExcluded} /> Show Excluded
                        </label>)
                        :
                        (<button> <span> &gt; </span> </button>)
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