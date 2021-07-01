import { Tech, Cost, TechType, Effect } from "./techs.model"

export class Upgrade implements Tech {
    id: string
    wikiUrl: string
    age: number
    cost: Cost
    duration: number
    type: TechType
    effects?: Effect[]
    unique?: boolean
    previousLineTech?: Tech
    nextLineTech?: Tech
    isSelected?: boolean

    constructor(data: any) {
        this.type = TechType.upgrade
        this.id = data.id
        this.wikiUrl = data.wikiUrl
        this.age = data.age
        this.cost = data.cost
        this.effects = data.effects
        this.duration = data.duration
        this.previousLineTech = data.previousLineTech
        this.nextLineTech = data.nextLineTech
    }
}