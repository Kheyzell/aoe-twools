import { Unit, Upgrade } from "../../models/techs.model"

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
        name: 'Archer',
        age: 2,
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
        name: 'Crossbowman',
        age: 3,
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
        name: 'Arbalester',
        age: 4,
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
        name: 'Skirmisher',
        age: 2,
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
        name: 'Elite Skirmisher',
        age: 3,
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
        name: 'Hand Cannoneer',
        age: 4,
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
        name: 'Cavalry Archer',
        age: 3,
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
        name: 'Heavy Cavalry Archer',
        age: 4,
        cost: {
            wood: 40,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 27
    }),
}

export const archeryUpgrades: ArcheryUpgrades = {
    thumbRing: new Upgrade({
        id: 'thumbRing',
        name: 'Thumb Ring',
        age: 3,
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
        name: 'Parthian Tactics',
        age: 4,
        cost: {
            wood: 0,
            food: 200,
            gold: 250,
            stone: 0
        },
        duration: 65
    }),
}
