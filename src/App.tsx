import React from 'react'

import './App.css'
import TechTreeComponent from './features/tech-tree/tech-tree'
import CivList from './features/civ-list/civ-list'
import { barracksTechs } from "./constants/GroupTechTree/barracks-tech-tree.const"
import { archeryTechs } from "./constants/GroupTechTree/archery-tech-tree.const"
import { stableTechs } from "./constants/GroupTechTree/stable-tech-tree.const"
import { siegeTechs } from "./constants/GroupTechTree/siege-tech-tree.const"
import { castleTechs } from "./constants/GroupTechTree/castle-tech-tree.const"
import { blacksmithTechs } from "./constants/GroupTechTree/blacksmith-tech-tree.const"
import { monasteryTechs } from "./constants/GroupTechTree/monastery-tech-tree.const"
import { universityTechs } from "./constants/GroupTechTree/university-tech-tree.const"
import { townCenterTechs } from "./constants/GroupTechTree/town-center-tech-tree.const"
import { lumberCampTechs } from "./constants/GroupTechTree/lumber-camp-tech-tree.const"
import { millTechs } from "./constants/GroupTechTree/mill-tech-tree.const"
import { miningCampTechs } from "./constants/GroupTechTree/mining-camp-tech-tree.const"
import { marketTechs } from "./constants/GroupTechTree/market-tech-tree.const"
import { dockTechs } from "./constants/GroupTechTree/dock-tech-tree.const"
import woodenBackground from "./resources/images/backgrounds/wood.jpg"
import woodenBackground4 from "./resources/images/backgrounds/wood4.jpg"

// initialise group tech trees
const allGroupTechs = [barracksTechs, archeryTechs, stableTechs, siegeTechs, castleTechs, blacksmithTechs, monasteryTechs, universityTechs, townCenterTechs, lumberCampTechs, millTechs, miningCampTechs, marketTechs, dockTechs]

function AppComponent() {

  return (
    <div className="App">
      <div className="Header" style={{ background: `url(${woodenBackground})` }}>
        <CivList></CivList>
      </div>
      <div className="Body" style={{ backgroundImage: `url(${woodenBackground4})` }}>
        <TechTreeComponent></TechTreeComponent>
      </div>
    </div>
  )
}

export default AppComponent
