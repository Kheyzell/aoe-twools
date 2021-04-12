import { Unit, Upgrade } from "../../models/techs.model";

interface DockUnits {
    fishingShip: Unit
    transportShip: Unit
    tradeCog: Unit
    galley: Unit
    fireGalley: Unit
    demolitionRaft: Unit
    warGalley: Unit
    fireShip: Unit
    demotionShip: Unit
    galleon: Unit
    fastFireShip: Unit
    heavyDemolitionShip: Unit
    cannonGalleon: Unit
    eliteCannonGalleon: Unit
}

interface DockUpgrades {
    gillnets: Upgrade
    careening: Upgrade
    dryDock: Upgrade
    shipwright: Upgrade
}

export const dockUnits: DockUnits = {
    fishingShip: new Unit({
        id: 'fishingShip',
        name: 'Fishing Ship',
        age: 1,
        cost: {
            wood: 75,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 40
    }),
    transportShip: new Unit({
        id: 'transportShip',
        name: 'Transport Ship',
        age: 1,
        cost: {
            wood: 255,
            food: 0,
            gold: 0,
            stone: 0
        },
        duration: 46
    }),
    tradeCog: new Unit({
        id: 'tradeCog',
        name: 'Trade Cog',
        age: 2,
        cost: {
            wood: 100,
            food: 0,
            gold: 50,
            stone: 0
        },
        duration: 36
    }),
    galley: new Unit({
        id: 'galley',
        name: 'Galley',
        age: 2,
        cost: {
            wood: 90,
            food: 0,
            gold: 30,
            stone: 0
        },
        duration: 60
    }),
    fireGalley: new Unit({
        id: 'fireGalley',
        name: 'Fire Galley',
        age: 2,
        cost: {
            wood: 75,
            food: 0,
            gold: 45,
            stone: 0
        },
        duration: 65
    }),
    demolitionRaft: new Unit({
        id: 'demolitionRaft',
        name: 'Demolition Raft',
        age: 2,
        cost: {
            wood: 70,
            food: 0,
            gold: 50,
            stone: 0
        },
        duration: 45
    }),
    warGalley: new Unit({
        id: 'warGalley',
        name: 'War Galley',
        age: 3,
        cost: {
            wood: 90,
            food: 0,
            gold: 30,
            stone: 0
        },
        duration: 36
    }),
    fireShip: new Unit({
        id: 'fireShip',
        name: 'Fire Ship',
        age: 3,
        cost: {
            wood: 75,
            food: 0,
            gold: 45,
            stone: 0
        },
        duration: 36
    }),
    demotionShip: new Unit({
        id: 'demolitionShip',
        name: 'Demolition Ship',
        age: 3,
        cost: {
            wood: 70,
            food: 0,
            gold: 50,
            stone: 0
        },
        duration: 31
    }),
    galleon: new Unit({
        id: 'galleon',
        name: 'Galleon',
        age: 4,
        cost: {
            wood: 90,
            food: 0,
            gold: 30,
            stone: 0
        },
        duration: 36
    }),
    fastFireShip: new Unit({
        id: 'fastFireShip',
        name: 'Fast Fire Ship',
        age: 4,
        cost: {
            wood: 75,
            food: 0,
            gold: 45,
            stone: 0
        },
        duration: 36
    }),
    heavyDemolitionShip: new Unit({
        id: 'heavyDemolitionShip',
        name: 'Heavy Demolition Ship',
        age: 4,
        cost: {
            wood: 70,
            food: 0,
            gold: 50,
            stone: 0
        },
        duration: 31
    }),
    cannonGalleon: new Unit({
        id: 'cannonGalleon',
        name: 'Cannon Galleon',
        age: 4,
        cost: {
            wood: 200,
            food: 0,
            gold: 150,
            stone: 0
        },
        duration: 46
    }),
    eliteCannonGalleon: new Unit({
        id: 'eliteCannonGalleon',
        name: 'Elite Cannon Galleon',
        age: 4,
        cost: {
            wood: 200,
            food: 0,
            gold: 150,
            stone: 0
        },
        duration: 46
    }),
}

export const dockUpgrades: DockUpgrades = {
    gillnets: new Upgrade({
        id: 'gillnets',
        name: 'Gillnets',
        age: 3,
        cost: {
            wood: 200,
            food: 150,
            gold: 0,
            stone: 0
        },
        duration: 45
    }),
    careening: new Upgrade({
        id: 'careening',
        name: 'Careening',
        age: 3,
        cost: {
            wood: 0,
            food: 250,
            gold: 150,
            stone: 0
        },
        duration: 50
    }),
    shipwright: new Upgrade({
        id: 'shipwright',
        name: 'Shipwright',
        age: 4,
        cost: {
            wood: 0,
            food: 1000,
            gold: 300,
            stone: 0
        },
        duration: 60
    }),
    dryDock: new Upgrade({
        id: 'dryDock',
        name: 'Dry Dock',
        age: 4,
        cost: {
            wood: 0,
            food: 600,
            gold: 400,
            stone: 0
        },
        duration: 60
    }),
}