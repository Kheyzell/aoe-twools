import { CivTechTree, Tech, Unit, UnitLine, UnitType, Upgrade } from "../models/techs.model";

export const chainTechs = (techs: Tech[]): Tech[] => {
    return techs.map((tech, index) => {
        tech.previousLineTech = techs[index-1]
        tech.nextLineTech = techs[index+1]
        return tech
    })
}

export const setAffectingUpgrades = (unitLine: UnitLine, upgrades: Upgrade[]) => {
    unitLine.age1.forEach(unit => unit.affectingUpgrades = upgrades)
    unitLine.age2.forEach(unit => unit.affectingUpgrades = upgrades)
    unitLine.age3.forEach(unit => unit.affectingUpgrades = upgrades)
    unitLine.age4.forEach(unit => unit.affectingUpgrades = upgrades)
}

export const hasCivUpgrades = (civ: CivTechTree, upgrades: Upgrade[]): boolean => {
    const civUpgrades = getAllCivUpgrades(civ)
    return upgrades.reduce((hasAllUpgrades, upgrade) => {
        hasAllUpgrades = hasAllUpgrades && !!civUpgrades.find(up => up.id === upgrade.id)
        return hasAllUpgrades
    }, true as boolean);
}

export const getAllCivUnits = (civ: CivTechTree): Unit[] => ([
    ...civ.barracks.units.reduce(reduceUnits, []), 
    ...civ.archery.units.reduce(reduceUnits, []), 
    ...civ.stable.units.reduce(reduceUnits, []), 
    ...civ.siege.units.reduce(reduceUnits, []), 
    ...civ.castle.units.reduce(reduceUnits, []), 
    ...civ.blacksmith.units.reduce(reduceUnits, []), 
    ...civ.monastery.units.reduce(reduceUnits, []), 
    ...civ.university.units.reduce(reduceUnits, []), 
    ...civ.townCenter.units.reduce(reduceUnits, []), 
    ...civ.lumberCamp.units.reduce(reduceUnits, []), 
    ...civ.mill.units.reduce(reduceUnits, []), 
    ...civ.miningCamp.units.reduce(reduceUnits, []), 
    ...civ.market.units.reduce(reduceUnits, []), 
    ...civ.dock.units.reduce(reduceUnits, [])
])


export const getAllCivCivilianUnits = (civ: CivTechTree): Unit[] => getAllCivUnits(civ).filter(unit => unit.unitType === UnitType.civilian)

export const getAllCivMilitaryUnits = (civ: CivTechTree): Unit[] => getAllCivUnits(civ).filter(unit => unit.unitType === UnitType.military)

export const getAllCivUnitLines = (civ: CivTechTree): UnitLine[] => {
    return [
        ...civ.barracks.units, 
        ...civ.archery.units, 
        ...civ.stable.units, 
        ...civ.siege.units, 
        ...civ.castle.units, 
        ...civ.blacksmith.units, 
        ...civ.monastery.units, 
        ...civ.university.units, 
        ...civ.townCenter.units, 
        ...civ.lumberCamp.units, 
        ...civ.mill.units, 
        ...civ.miningCamp.units, 
        ...civ.market.units, 
        ...civ.dock.units
    ]
}

export const getAllCivUpgrades = (civ: CivTechTree): Upgrade[] => {
    return [
        ...civ.barracks.upgrades.list, 
        ...civ.archery.upgrades.list, 
        ...civ.stable.upgrades.list, 
        ...civ.siege.upgrades.list, 
        ...civ.castle.upgrades.list, 
        ...civ.blacksmith.upgrades.list, 
        ...civ.monastery.upgrades.list, 
        ...civ.university.upgrades.list, 
        ...civ.townCenter.upgrades.list, 
        ...civ.lumberCamp.upgrades.list, 
        ...civ.mill.upgrades.list, 
        ...civ.miningCamp.upgrades.list, 
        ...civ.market.upgrades.list, 
        ...civ.dock.upgrades.list
    ]
}

const reduceUnits = (units: Unit[], unitLine: UnitLine) => {
    units.push(...unitLine.list)
    return units
}