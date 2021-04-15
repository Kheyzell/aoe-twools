import React from 'react'

import './App.css'
import TechTreeComponent from './features/tech-tree/tech-tree'
import CivList from './features/civ-list/civ-list'
import woodenBackground from "./resources/images/backgrounds/wood.jpg"
import woodenBackground4 from "./resources/images/backgrounds/wood4.jpg"

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
