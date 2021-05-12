import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

interface SiegeUnits {
    batteringRam: Unit
    cappedRam: Unit
    siegeRam: Unit
    mangonel: Unit
    onager: Unit
    siegeOnager: Unit
    scorpion: Unit
    heavyScorpion: Unit
    siegeTower: Unit
    bombardCannon: Unit
}

export const siegeUnits: SiegeUnits = {
    batteringRam: new Unit({
        id: 'batteringRam',
        name: 'Battering Ram',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 75,
            stone: 0
        },
        duration: 36
    }),
    cappedRam: new Unit({
        id: 'cappedRam',
        name: 'Capped Ram',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 75,
            stone: 0
        },
        duration: 36
    }),
    siegeRam: new Unit({
        id: 'siegeRam',
        name: 'Siege Ram',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 0,
            gold: 75,
            stone: 0
        },
        duration: 36
    }),
    mangonel: new Unit({
        id: 'mangonel',
        name: 'Mangonel',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 60,
            gold: 135,
            stone: 46
        },
        duration: 30
    }),
    onager: new Unit({
        id: 'onager',
        name: 'Onager',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 60,
            gold: 135,
            stone: 0
        },
        duration: 46
    }),
    siegeOnager: new Unit({
        id: 'siegeOnager',
        name: 'Siege Onager',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 160,
            food: 60,
            gold: 135,
            stone: 0
        },
        duration: 46
    }),
    scorpion: new Unit({
        id: 'scorpion',
        name: 'Scorpion',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 75,
            stone: 0
        },
        duration: 30
    }),
    heavyScorpion: new Unit({
        id: 'heavyScorpion',
        name: 'Heavy Scorpion',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 75,
            stone: 0
        },
        duration: 30
    }),
    siegeTower: new Unit({
        id: 'siegeTower',
        name: 'Siege Tower',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 160,
            stone: 0
        },
        duration: 36
    }),
    bombardCannon: new Unit({
        id: 'bombardCannon',
        name: 'Bombard Cannon',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 225,
            food: 0,
            gold: 225,
            stone: 0
        },
        duration: 56
    }),
}

chainTechs([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam])
chainTechs([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager])
chainTechs([siegeUnits.scorpion, siegeUnits.heavyScorpion])
chainTechs([siegeUnits.siegeTower])
chainTechs([siegeUnits.bombardCannon])