import React from "react"

import CivList from "./civ-list/civ-list.component"
import TechTreeComponent from "./tech-tree/tech-tree.component"
import woodenBackground from "../../resources/images/backgrounds/wood.jpg"
import woodenBackground4 from "../../resources/images/backgrounds/wood4.jpg"

type CivFilterProps = {}

const CivFilter: React.FC<CivFilterProps> = () => {
    return (
        <div className="CivFilter">
            <div className="Header" style={{ background: `url(${woodenBackground})` }}>
                <CivList></CivList>
            </div>
            <div className="Body" style={{ backgroundImage: `url(${woodenBackground4})` }}>
                <TechTreeComponent></TechTreeComponent>
            </div>
        </div>
    )
}

export default CivFilter