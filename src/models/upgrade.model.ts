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

    constructor(data: Partial<Upgrade>) {
        this.type = TechType.upgrade
        this.id = data.id ?? ""
        this.wikiUrl = data.wikiUrl ?? ""
        this.age = data.age ?? 1
        this.cost = data.cost ?? { wood: 0, food: 0, gold: 0, stone: 0 }
        this.effects = data.effects
        this.duration = data.duration ?? 0
        this.previousLineTech = data.previousLineTech
        this.nextLineTech = data.nextLineTech
    }
}