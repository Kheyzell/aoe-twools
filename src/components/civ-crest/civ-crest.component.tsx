import { Tooltip } from "@material-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"

import { CivTechTree } from "../../models/techs.model"

import './civ-crest.component.css'


type Props = {
    civ?: CivTechTree
    mini?: true
}

const CivCrest: React.FC<Props> = (props) => {
    const { t } = useTranslation()

    const civName = t(`civ.${props.civ?.id}.name`)

    return (
        <Tooltip className={`CivCrest ${props.mini ? 'Mini' : ''}`} title={civName} placement="top">
            <img src={props.civ?.crest} alt={civName} />
        </Tooltip>
    )
}

export default CivCrest