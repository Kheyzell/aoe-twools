import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { allCivTechTrees } from "../../constants"
import { CivTechTree, Tech } from "../../models/techs.model"
import { civHasTech } from "../../utils/tech-tree.utils"
import { scrollHorizontally } from "../../utils/utils"
import { selectedCiv2Selector, selectedCivSelector, selectedTechsSelector, toggleCiv2Selection, toggleCivSelection } from "../tech-tree/civFilterSlice"
import './civ-list.css'
import CivPanel from "./civ-panel"


type Props = {}
type State = {}

const CivList: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const scrollRef = useRef<HTMLElement>(null)
    
    const allCivTechs: CivTechTree[] = [...allCivTechTrees]
    const selectedCiv = useSelector(selectedCivSelector)
    const selectedCiv2 = useSelector(selectedCiv2Selector)
    const selectedTechs = useSelector(selectedTechsSelector)

    const filteredTechTrees = allCivTechs.filter(civTechs => {
        return selectedTechs.reduce((hasAllTechs: Boolean, currentTech: Tech) => {
            return hasAllTechs && civHasTech(civTechs, currentTech)
        }, true)
    })

    const onCivClick = (civ: CivTechTree) => {
        dispatch(toggleCivSelection({ ...civ }))
    }
    const onCiv2Click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, civ: CivTechTree) => {
        e.preventDefault()
        if (!!selectedCiv && civ.id !== selectedCiv.id) {
            dispatch(toggleCiv2Selection({ ...civ }))
        }
    }

    const [showCivPanels, setShowCivPanels] = React.useState<boolean[]>([])
    const onEnterCivCrest = (index: number) => {
        let newShowCivPanels = []
        newShowCivPanels[index] = true
        setShowCivPanels(newShowCivPanels)
    }
    const onLeaveCivCrest = (index: number) => {
        setShowCivPanels([])
    }

    return (
        <div className="CivList" ref={scrollRef as React.RefObject<HTMLDivElement>} onWheel={(e) => scrollHorizontally(e, scrollRef)}>
            {filteredTechTrees.map((civ, index) => {
                const isSelected1 = !!selectedCiv && selectedCiv.id === civ.id
                const isSelected2 = !!selectedCiv2 && selectedCiv2.id === civ.id
                return (
                    <div className={`CivTree ${isSelected1 ? 'Selected1' : ''} ${isSelected2 ? 'Selected2' : ''}`}
                         key={civ.id}
                         onClick={() => onCivClick(civ)}
                         onContextMenu={(e) => onCiv2Click(e, civ)}
                         onMouseEnter={() => onEnterCivCrest(index)}
                         onMouseLeave={() => onLeaveCivCrest(index)}>
                        <span> {civ.name} </span>
                        <img src={civ.crest} alt={civ.name} />
                        <CivPanel civ={civ} show={showCivPanels[index]}></CivPanel>
                    </div>
                )
            })}
        </div>
    )
}

export default CivList