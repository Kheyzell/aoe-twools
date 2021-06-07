import { Unit, UnitType, Upgrade } from "../../models/techs.model";
import { chainTechs } from "../../utils/techs.utils";

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
        age: 1,
        unitType: UnitType.civilian,
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
        age: 1,
        unitType: UnitType.civilian,
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
        age: 2,
        unitType: UnitType.civilian,
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
        age: 2,
        unitType: UnitType.military,
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
        age: 2,
        unitType: UnitType.military,
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
        age: 2,
        unitType: UnitType.military,
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
        age: 3,
        unitType: UnitType.military,
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
        age: 3,
        unitType: UnitType.military,
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
        age: 3,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 200,
            food: 0,
            gold: 150,
            stone: 0
        },
        duration: 46
    }),
}

chainTechs([dockUnits.fishingShip])
chainTechs([dockUnits.transportShip])
chainTechs([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon])
chainTechs([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip])
chainTechs([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip])
chainTechs([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon])

export const dockUpgrades: DockUpgrades = {
    gillnets: new Upgrade({
        id: 'gillnets',
        age: 3,
        unitType: UnitType.military,
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
        age: 3,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
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
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 600,
            gold: 400,
            stone: 0
        },
        duration: 60
    }),
}

chainTechs([dockUpgrades.careening, dockUpgrades.dryDock])