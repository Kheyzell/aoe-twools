import React, { FunctionComponent } from "react";

import { BoxSize } from "../../../../components/tech/tech.component";
import { UnitLine } from "../../../../models/techs.model";
import CivFilterTechComponent from "../civ-filter-tech/civ-filter-tech.component";
import '../group-tech-tree/group-tech-tree.component.css';

interface UnitLineTechTreeProps {
    unitLine: UnitLine
    size: BoxSize
}

const UnitLineTechTreeComponent: FunctionComponent<UnitLineTechTreeProps> = ({unitLine, size}) => {
    return (
        <div className="UnitLine">
            <div className="Age Age1">
                {unitLine.age1.map((unit, index) =>
                    <CivFilterTechComponent key={index} tech={unit} size={size}></CivFilterTechComponent>)}
            </div>
            <div className="Age Age2">
                {unitLine.age2.map((unit, index) =>
                    <CivFilterTechComponent key={index} tech={unit} size={size}></CivFilterTechComponent>)}
            </div>
            <div className="Age Age3">
                {unitLine.age3.map((unit, index) =>
                    <CivFilterTechComponent key={index} tech={unit} size={size}></CivFilterTechComponent>)}
            </div>
            <div className="Age Age4">
                {unitLine.age4.map((unit, index) =>
                    <CivFilterTechComponent key={index} tech={unit}  size={size}></CivFilterTechComponent>)}
            </div>
        </div>
    )
}

export default UnitLineTechTreeComponent;