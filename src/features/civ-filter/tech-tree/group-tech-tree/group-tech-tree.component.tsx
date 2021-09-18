import React from "react"

import { GroupTechTree } from "../../../../models/techs.model";
import TechComponent, { BoxSize } from "../tech/tech.component"
import UnitLineTechTreeComponent from "../unit-line-tech-tree/unit-line-tech-tree.component";
import './group-tech-tree.component.css'

type Props = {
  groupTechTree: GroupTechTree
  techSize: BoxSize
}
type State = {}

const GroupTechTreeComponent: React.FC<Props> = (props, state: State) => {
  const unitLines = props.groupTechTree.unitLines
  const upgradeLine = props.groupTechTree.upgrades

  return (
    <div className="GroupTechTree">
      <div className="Units">
        {unitLines.map((unitLine, index) => {
          return (<UnitLineTechTreeComponent key={index} unitLine={unitLine} size={props.techSize}></UnitLineTechTreeComponent>)
        })}
      </div>

      <div className="Upgrades">
        <div className="Age Age1">
          {upgradeLine.age1.map((upgrade, index) => {
            return (<TechComponent key={index} tech={upgrade} size={props.techSize}></TechComponent>)
          })}
        </div>
        <div className="Age Age2">
          {upgradeLine.age2.map((upgrade, index) => {
            return (<TechComponent key={index} tech={upgrade} size={props.techSize}></TechComponent>)
          })}
        </div>
        <div className="Age Age3">
          {upgradeLine.age3.map((upgrade, index) => {
            return (<TechComponent key={index} tech={upgrade} size={props.techSize}></TechComponent>)
          })}
        </div>
        <div className="Age Age4">
          {upgradeLine.age4.map((upgrade, index) => {
            return (<TechComponent key={index} tech={upgrade} size={props.techSize}></TechComponent>)
          })}
        </div>
      </div>
    </div>
  );

}

export default GroupTechTreeComponent;