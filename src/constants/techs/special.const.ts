import { Unit } from './../../models/unit.model'
import { UnitType } from "../../models/techs.model";

interface SpecialUnits {
    blank: Unit
}

export const specialUnits: SpecialUnits = {
    blank: new Unit({
        id: 'blank',
        age: 1,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 0
    })
}