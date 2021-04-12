import React, { Component } from "react"

import { Tech, UnitLine } from "../../../models/techs.model"
import TechComponent from "../tech/tech.component"
import '../group-tech-tree/group-tech-tree.css'

interface UnitLineTechTreeProps {
    unitLine: UnitLine
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

    onTechSelected(tech: Tech) {
        // console.log(`Tech = [${JSON.stringify(tech)}]`)
        // const age = tech.age
        // if (age > 1) {
        //     this.props.unitLine.age1.forEach(unit => unit.isSelected)
        // }
    }

    render() {
        return (
            <div className="UnitLine">
                <div className="Age Age1">
                    {/* Age1 */}
                {this.props.unitLine.age1.map((unit, index) => {
                    return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected}></TechComponent>)
                })}
                </div>
                <div className="Age Age2">
                    {/* Age2 */}
                {this.props.unitLine.age2.map((unit, index) => {
                    return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected}></TechComponent>)
                })}
                </div>
                <div className="Age Age3">
                    {/* Age3 */}
                {this.props.unitLine.age3.map((unit, index) => {
                    return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected}></TechComponent>)
                })}
                </div>
                <div className="Age Age4">
                    {/* Age4 */}
                {this.props.unitLine.age4.map((unit, index) => {
                    return (<TechComponent key={index} tech={unit} onTechSelected={this.onTechSelected}></TechComponent>)
                })}
                </div>
            </div>
        )
    }
}

export default UnitLineTechTreeComponent;