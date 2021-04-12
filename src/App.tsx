import React from 'react'

import './App.css'
import TechTreeComponent from './features/tech-tree/tech-tree'
import CivList from './features/civ-list/civ-list'
import woodenBackground from "./resources/images/backgrounds/wood.jpg"
import woodenBackground2 from "./resources/images/backgrounds/wood2.jpg"
import parchmentBackground from "./resources/images/backgrounds/parchment.jpg"
import parchmentBackground2 from "./resources/images/backgrounds/parchment2.jpg"
import parchmentBackground3 from "./resources/images/backgrounds/parchment3.jpg"

function AppComponent() {

  return (
    <div className="App">
      <div className="Header" style={{ background: `url(${woodenBackground})` }}>
        <CivList></CivList>
      </div>
      <div className="Body" style={{ backgroundImage: `url(${parchmentBackground3})` }}>
        <TechTreeComponent></TechTreeComponent>
      </div>
    </div>
  )
}

export default AppComponent
