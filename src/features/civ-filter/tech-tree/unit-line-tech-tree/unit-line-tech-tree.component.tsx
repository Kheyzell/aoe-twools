import React, { Component } from "react"

import { Tech, UnitLine } from "../../../../models/techs.model"
import TechComponent, { BoxSize } from "../tech/tech.component"
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

    onTechSelected(tech: Tech) { }

    render() {
        return (
            <div className="UnitLine">
                <div className="Age Age1">
                    {this.props.unitLine.age1.map((unit, index) => {
                        return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected} size={this.props.size}></TechComponent>)
                    })}
                </div>
                <div className="Age Age2">
                    {this.props.unitLine.age2.map((unit, index) => {
                        return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected} size={this.props.size}></TechComponent>)
                    })}
                </div>
                <div className="Age Age3">
                    {this.props.unitLine.age3.map((unit, index) => {
                        return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected} size={this.props.size}></TechComponent>)
                    })}
                </div>
                <div className="Age Age4">
                    {this.props.unitLine.age4.map((unit, index) => {
                        return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected} size={this.props.size}></TechComponent>)
                    })}
                </div>
            </div>
        )
    }
}

export default UnitLineTechTreeComponent;