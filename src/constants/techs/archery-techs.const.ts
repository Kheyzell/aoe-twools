import { Unit, UnitType, Upgrade } from "../../models/techs.model"
import { chainTechs } from "../../utils/techs.utils"

interface ArcheryUnits {
    archer: Unit
    crossbowman: Unit
    arbalester: Unit
    skirmisher: Unit
    eliteSkirmisher: Unit
    handCannoneer: Unit
    cavalryArcher: Unit
    heavyCavalryArcher: Unit
}

interface ArcheryUpgrades {
    thumbRing: Upgrade
    parthianTactis: Upgrade
}

export const archeryUnits: ArcheryUnits = {
    archer: new Unit({
        id: 'archer',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 0,
            gold: 45,
            stone: 0
        },
        duration: 35
    }),
    crossbowman: new Unit({
        id: 'crossbowman',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 0,
            gold: 45,
            stone: 0
        },
        duration: 27
    }),
    arbalester: new Unit({
        id: 'arbalester',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 25,
            food: 0,
            gold: 45,
            stone: 0
        },
        duration: 27
    }),
    skirmisher: new Unit({
        id: 'skirmisher',
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 25,
            gold: 0,
            stone: 0
        },
        duration: 22
    }),
    eliteSkirmisher: new Unit({
        id: 'eliteSkirmisher',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 25,
            gold: 0,
            stone: 0
        },
        duration: 22
    }),
    handCannoneer: new Unit({
        id: 'handCannoneer',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 45,
            gold: 50,
            stone: 0
        },
        duration: 34
    }),
    cavalryArcher: new Unit({
        id: 'cavalryArcher',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 40,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 34
    }),
    heavyCavalryArcher: new Unit({
        id: 'heavyCavalryArcher',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 40,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 27
    }),
}

chainTechs([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester])
chainTechs([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher])
chainTechs([archeryUnits.handCannoneer])
chainTechs([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher])

export const archeryUpgrades: ArcheryUpgrades = {
    thumbRing: new Upgrade({
        id: 'thumbRing',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 250,
            food: 300,
            gold: 0,
            stone: 0
        },
        duration: 45
    }),
    parthianTactis: new Upgrade({
        id: 'parthianTactics',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 200,
            gold: 250,
            stone: 0
        },
        duration: 65
    }),
}
