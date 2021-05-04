import React, { Component } from "react"

import { GroupTechTree } from "../../../models/techs.model";
import TechComponent from "../tech/tech.component"
import UnitLineTechTreeComponent from "../unit-line-tech-tree/unit-line-tech-tree";
import './group-tech-tree.css'

type Props = {
  groupTechTree: GroupTechTree
}
type State = { }

class GroupTechTreeComponent extends Component<Props, State> {

  onTechSelected() {

  }

  render() {
    const unitLines = this.props.groupTechTree.units
    const upgradeLine = this.props.groupTechTree.upgrades

    return (
      <div className="GroupTechTree">
        <div className="Units">
          {unitLines.map((unitLine, index) => {
            return (<UnitLineTechTreeComponent key={index} unitLine={unitLine}></UnitLineTechTreeComponent>)
          })}
        </div>

        <div className="Upgrades">
          <div className="Age Age1">
            {upgradeLine.age1.map((upgrade, index) => {
              return (<TechComponent key={index} tech={upgrade}></TechComponent>)
            })}
          </div>
          <div className="Age Age2">
            {upgradeLine.age2.map((upgrade, index) => {
              return (<TechComponent key={index} tech={upgrade}></TechComponent>)
            })}
          </div>
          <div className="Age Age3">
            {upgradeLine.age3.map((upgrade, index) => {
              return (<TechComponent key={index} tech={upgrade}></TechComponent>)
            })}
          </div>
          <div className="Age Age4">
            {upgradeLine.age4.map((upgrade, index) => {
              return (<TechComponent key={index} tech={upgrade}></TechComponent>)
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupTechTreeComponent;