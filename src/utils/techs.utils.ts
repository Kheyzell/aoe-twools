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
    ...civ.barracks.unitLines.reduce(reduceUnits, []), 
    ...civ.archery.unitLines.reduce(reduceUnits, []), 
    ...civ.stable.unitLines.reduce(reduceUnits, []), 
    ...civ.siege.unitLines.reduce(reduceUnits, []), 
    ...civ.castle.unitLines.reduce(reduceUnits, []), 
    ...civ.blacksmith.unitLines.reduce(reduceUnits, []), 
    ...civ.monastery.unitLines.reduce(reduceUnits, []), 
    ...civ.university.unitLines.reduce(reduceUnits, []), 
    ...civ.townCenter.unitLines.reduce(reduceUnits, []), 
    ...civ.lumberCamp.unitLines.reduce(reduceUnits, []), 
    ...civ.mill.unitLines.reduce(reduceUnits, []), 
    ...civ.miningCamp.unitLines.reduce(reduceUnits, []), 
    ...civ.market.unitLines.reduce(reduceUnits, []), 
    ...civ.dock.unitLines.reduce(reduceUnits, [])
])


export const getAllCivCivilianUnits = (civ: CivTechTree): Unit[] => getAllCivUnits(civ).filter(unit => unit.unitType === UnitType.civilian)

export const getAllCivMilitaryUnits = (civ: CivTechTree): Unit[] => getAllCivUnits(civ).filter(unit => unit.unitType === UnitType.military)

export const getAllCivUnitLines = (civ: CivTechTree): UnitLine[] => {
    return [
        ...civ.barracks.unitLines, 
        ...civ.archery.unitLines, 
        ...civ.stable.unitLines, 
        ...civ.siege.unitLines, 
        ...civ.castle.unitLines, 
        ...civ.blacksmith.unitLines, 
        ...civ.monastery.unitLines, 
        ...civ.university.unitLines, 
        ...civ.townCenter.unitLines, 
        ...civ.lumberCamp.unitLines, 
        ...civ.mill.unitLines, 
        ...civ.miningCamp.unitLines, 
        ...civ.market.unitLines, 
        ...civ.dock.unitLines
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