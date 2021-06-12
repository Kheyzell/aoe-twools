import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import './App.css'
import './i18n/config'
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
import LangSelector from './components/lang-selector/lang-selector.component'
import CivFilter from './features/civ-filter/civ-filter.component'
import UnitCalculator from './features/unit-calculator/unit-calculator.component'

// initialise group tech trees
const allGroupTechs = [barracksTechs, archeryTechs, stableTechs, siegeTechs, castleTechs, blacksmithTechs, monasteryTechs, universityTechs, townCenterTechs, lumberCampTechs, millTechs, miningCampTechs, marketTechs, dockTechs]

// const routes = [
//   {
//     path: "/sandwiches",
//     component: null
//   },
//   {
//     path: "/tacos",
//     component: null
//   }
// ]

function AppComponent() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/civ-filter">
            <CivFilter></CivFilter>
          </Route>
          <Route path="/calculator">
            <UnitCalculator></UnitCalculator>
          </Route>
          <Redirect from="/" to="/civ-filter" />
        </Switch>
      </Router>

      <div className="LangSelectorContainer">
        <LangSelector></LangSelector>
      </div>
    </div>
  )
}

export default AppComponent
