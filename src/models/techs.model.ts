export enum TechType {
    unit = 'unit',
    upgrade = 'upgrade'
}

export interface Tech {
    id: string
    name: string
    age: number
    cost: Cost
    duration: number
    previousLineTech?: Tech
    nextLineTech?: Tech
    type: TechType
}

export interface Cost {
    wood: number
    food: number
    gold: number
    stone: number
}

export class Unit implements Tech {
    id: string
    name: string
    age: number
    cost: Cost
    duration: number
    type: TechType
    previousLineTech?: Unit
    nextLineTech?: Unit
    isSelected?: boolean

    constructor(data: any) {
        this.type = TechType.unit
        this.id = data.id
        this.name = data.name
        this.age = data.age
        this.cost = data.cost
        this.duration = data.duration
        this.previousLineTech = data.previousLineTech
        this.nextLineTech = data.nextLineTech
    }
}

export class Upgrade implements Tech {
    id: string
    name: string
    age: number
    cost: Cost
    duration: number
    type: TechType
    previousLineTech?: Tech
    nextLineTech?: Tech
    isSelected?: boolean

    constructor(data: any) {
        this.type = TechType.upgrade
        this.id = data.id
        this.name = data.name
        this.age = data.age
        this.cost = data.cost
        this.duration = data.duration
        this.previousLineTech = data.previousLineTech
        this.nextLineTech = data.nextLineTech
    }
}

export interface CivTechTree {
    id: string;
    name: string;
    crest?: string;
    barracks: GroupTechTree,
    archery: GroupTechTree,
    stable: GroupTechTree,
    siege: GroupTechTree,
    castle: GroupTechTree,
    blacksmith: GroupTechTree,
    monastery: GroupTechTree,
    university: GroupTechTree,
    townCenter: GroupTechTree,
    lumberCamp: GroupTechTree,
    mill: GroupTechTree,
    miningCamp: GroupTechTree,
    market: GroupTechTree,
    dock: GroupTechTree,
}

export interface GroupTechTree {
    name?: string
    units: UnitLine[]
    upgrades: UpgradePerAgeGroup
}

export interface LineTechTree {
    age1: Tech[]
    age2: Tech[]
    age3: Tech[]
    age4: Tech[]
}

export class UnitLine implements LineTechTree {
    age1: Unit[] = []
    age2: Unit[] = []
    age3: Unit[] = []
    age4: Unit[] = []

    constructor(units: Unit[]) {
        units.forEach(unit => {
            switch (unit.age) {
                case 1:
                    this.age1.push(unit)
                    break;
                case 2:
                    this.age2.push(unit)
                    break;
                case 3:
                    this.age3.push(unit)
                    break;
                case 4:
                    this.age4.push(unit)
                    break;
            }
        })
    }
}

export class UpgradePerAgeGroup implements LineTechTree {
    age1: Upgrade[] = []
    age2: Upgrade[] = []
    age3: Upgrade[] = []
    age4: Upgrade[] = []

    constructor(upgrades: Upgrade[]) {
        upgrades.forEach(upgrade => {
            switch (upgrade.age) {
                case 1:
                    this.age1.push(upgrade)
                    break;
                case 2:
                    this.age2.push(upgrade)
                    break;
                case 3:
                    this.age3.push(upgrade)
                    break;
                case 4:
                    this.age4.push(upgrade)
                    break;
            }
        })
    }
}

// export interface BarrackTechTree extends BuildingTechTree {
//     units: {
//         militiaLine: Unit[]
//         spearLine: Unit[]
//         eagleLine: Unit[]
//     }
// }