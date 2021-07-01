import React, { Component } from "react"

import { BoxSize } from "../../../../components/tech/tech.component";
import { UnitLine } from "../../../../models/techs.model"
import CivFilterTechComponent from "../civ-filter-tech/civ-filter-tech.component"
import '../group-tech-tree/group-tech-tree.component.css'

interface UnitLineTechTreeProps {
    unitLine: UnitLine
    size: BoxSize
}
interface UnitLineTechTreeState {
    name: string;
}

class UnitLineTechTreeComponent extends Component<UnitLineTechTreeProps, UnitLineTechTreeState> {
    constructor(props: UnitLineTechTreeProps) {
        super(props);
        this.state = {
            name: ''
        };
    }

    render() {
        return (
            <div className="UnitLine">
                <div className="Age Age1">
                    {this.props.unitLine.age1.map((unit, index) => {
                        return (<CivFilterTechComponent key={index} tech={unit} size={this.props.size}></CivFilterTechComponent>)
                    })}
                </div>
                <div className="Age Age2">
                    {this.props.unitLine.age2.map((unit, index) => {
                        return (<CivFilterTechComponent key={index} tech={unit} size={this.props.size}></CivFilterTechComponent>)
                    })}
                </div>
                <div className="Age Age3">
                    {this.props.unitLine.age3.map((unit, index) => {
                        return (<CivFilterTechComponent key={index} tech={unit} size={this.props.size}></CivFilterTechComponent>)
                    })}
                </div>
                <div className="Age Age4">
                    {this.props.unitLine.age4.map((unit, index) => {
                        return (<CivFilterTechComponent key={index} tech={unit}  size={this.props.size}></CivFilterTechComponent>)
                    })}
                </div>
            </div>
        )
    }
}

export default UnitLineTechTreeComponent;