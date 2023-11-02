import React from "react"

import { BoxSize } from "../../../../components/tech/tech.component"
import { GroupTechTree } from "../../../../models/techs.model"
import CivFilterTechComponent from "../civ-filter-tech/civ-filter-tech.component"
import UnitLineTechTreeComponent from "../unit-line-tech-tree/unit-line-tech-tree.component";
import './group-tech-tree.component.css'

type Props = {
  groupTechTree: GroupTechTree
  techSize: BoxSize
}

const GroupTechTreeComponent: React.FC<Props> = (props) => {
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
          <div className="UpgradesContainer">            
          {upgradeLine.age1.map((upgrade, index) =>
            (<CivFilterTechComponent key={index} tech={upgrade} size={props.techSize}></CivFilterTechComponent>))
          }
          </div>
        </div>
        <div className="Age Age2">
          <div className="UpgradesContainer">            
          {upgradeLine.age2.map((upgrade, index) =>
            (<CivFilterTechComponent key={index} tech={upgrade} size={props.techSize}></CivFilterTechComponent>))
          }
          </div>
        </div>
        <div className="Age Age3">
          <div className="UpgradesContainer">            
          {upgradeLine.age3.map((upgrade, index) =>
            (<CivFilterTechComponent key={index} tech={upgrade} size={props.techSize}></CivFilterTechComponent>))
          }
          </div>
        </div>
        <div className="Age Age4">
          <div className="UpgradesContainer">            
          {upgradeLine.age4.map((upgrade, index) =>
            (<CivFilterTechComponent key={index} tech={upgrade} size={props.techSize}></CivFilterTechComponent>))
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupTechTreeComponent;