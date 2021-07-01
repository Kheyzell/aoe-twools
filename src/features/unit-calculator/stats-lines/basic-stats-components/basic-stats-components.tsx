import React, { ReactElement } from "react"

import { StatCompared, Comparison } from "../../../../models/stats-calculation.model"

import "./basic-stats-components.css"

export class StatsContainer extends React.Component<{ class?: string }> {
    tableRef = React.createRef<HTMLTableElement>()

    // componentDidMount() {
    //     const tableFirstLineCells = this.tableRef.current?.querySelector('tr')?.querySelectorAll('td')
    //     if (tableFirstLineCells) {
    //         const element1: HTMLElement | null = tableFirstLineCells[0]?.querySelector('*'),
    //               element2: HTMLElement | null = tableFirstLineCells[tableFirstLineCells.length-1]?.querySelector('*')
    //         const width1 = Math.floor((element1?.offsetWidth || 1) - 1),
    //               width2 = Math.floor((element2?.offsetWidth || 1) - 1)

    //         // if (width1 < width2) {
    //         //     element1?.setAttribute('style', `width: ${width2}px; display: block`)
    //         // } else {
    //         //     element2?.setAttribute('style', `width: ${width1}px; display: block`)
    //         // }
    //     }
    // }

    render() {
        return (
            <table ref={this.tableRef} className={`StatsContainer ${this.props.class}`}>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
}

export const StatLine = (props: { title: string, stat1: ReactElement, stat2: ReactElement }) => {
    const Stat1 = () => props.stat1
    const Stat2 = () => props.stat2

    return (
        <tr className="StatLine">
            <td> <Stat1></Stat1> </td>
            <td> {props.title} </td>
            <td> <Stat2></Stat2> </td>
        </tr>
    )
}

export const TitleLine: React.FC<{}> = props => {
    return (<tr className="TitleLine"><td></td><td> { props.children } </td><td></td></tr>)
}

export const SeparatorLine = () => {
    return (<tr className="SeparatorLine"></tr>)
}

export const GenericStatLine = (props: { title: string, value1: number, value2: number, comparisonInversed?: boolean }) => {
    const [stat1, stat2] = StatCompared.build2Comparisons(props.value1, props.value2, props.comparisonInversed)
    const statComponent1 = (<GenericStat stat={stat1}></GenericStat>)
    const statComponent2 = (<GenericStat stat={stat2}></GenericStat>)
    return (<StatLine title={props.title} stat1={statComponent1} stat2={statComponent2}></StatLine>)
}

export const GenericStat = (props: { stat: StatCompared }) => (<StatDisplay comparison={props.stat.comparison}> {props.stat.value} </StatDisplay>)

export const StatDisplay: React.FC<{ comparison: Comparison }> = props => (<span className={`StatDisplay ${props.comparison}`}> {props.children} </span>)