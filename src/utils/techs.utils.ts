import { Bonus, UniqueTech } from "../models/bonus.model";
import { CivTechTree, Tech, UnitLine, UnitType } from "../models/techs.model";
import { Unit } from "../models/unit.model";
import { Upgrade } from "../models/upgrade.model";

export const chainTechs = (techs: Tech[]): Tech[] => {
    return techs.map((tech, index) => {
        tech.previousLineTech = techs[index - 1]
        tech.nextLineTech = techs[index + 1]
        return tech
    })
}

export const setAffectingUpgrades = (unitLine: UnitLine, upgrades: Upgrade[]) => {
    unitLine.age1.forEach(unit => unit.affectingUpgrades = upgrades)
    unitLine.age2.forEach(unit => unit.affectingUpgrades = upgrades)
    unitLine.age3.forEach(unit => unit.affectingUpgrades = upgrades)
    unitLine.age4.forEach(unit => unit.affectingUpgrades = upgrades)
}

export const setCivOnUniqueTechs = (uniqueTechOrBonuses: UniqueTech[] | Bonus[], civ: CivTechTree) => uniqueTechOrBonuses.forEach((uniqueTech: UniqueTech | Bonus) => uniqueTech.civ = civ)

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

export const getAllCivRegularUnits = (civ: CivTechTree): Unit[] => ([
    ...civ.barracks.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.archery.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.stable.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.siege.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.castle.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.blacksmith.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.monastery.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.university.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.townCenter.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.lumberCamp.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.mill.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.miningCamp.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.market.unitLines.reduce(reduceRegularUnits, []), 
    ...civ.dock.unitLines.reduce(reduceRegularUnits, [])
])

export const getAllCivUniqueUnits = (civ: CivTechTree): Unit[] => ([
    ...civ.barracks.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.archery.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.stable.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.siege.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.castle.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.blacksmith.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.monastery.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.university.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.townCenter.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.lumberCamp.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.mill.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.miningCamp.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.market.unitLines.reduce(reduceUniqueUnits, []),
    ...civ.dock.unitLines.reduce(reduceUniqueUnits, [])
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

export const getAllCivRegularUpgrades = (civ: CivTechTree): Upgrade[] => ([
    ...civ.barracks.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.archery.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.stable.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.siege.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.castle.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.blacksmith.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.monastery.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.university.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.townCenter.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.lumberCamp.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.mill.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.miningCamp.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.market.upgrades.list.filter(upgrade => !upgrade.unique),
    ...civ.dock.upgrades.list.filter(upgrade => !upgrade.unique)
])

export const getAllCivUniqueUpgrades = (civ: CivTechTree): Upgrade[] => (civ.castle.upgrades.list.filter(upgrade => upgrade.unique))

export const getChainedUpgrades = (upgrade: Upgrade): Upgrade[] => {
    return [
        ...(upgrade.previousLineTech ? getPreviousChainedUpgrades(upgrade.previousLineTech) : []),
        upgrade,
        ...(upgrade.nextLineTech ? getNextChainedUpgrades(upgrade.nextLineTech) : [])
    ]
}

export const rechainUpgradesInList = (upgrades: Upgrade[]): Upgrade[][] => {
    return upgrades.reduce((lines: Upgrade[][], upgrade: Upgrade) => {
        const line = lines.find(line => line.some(up => arePartsOfTheSameUpgradeLine(up, upgrade)))
        if (line) {
            let index = 0
            while (!line[index] || (upgrade.previousLineTech?.id !== line[index]?.id && upgrade.nextLineTech?.id !== line[index]?.id)) {
                index++
            }
            if (line[index] === upgrade.nextLineTech) {
                line[index-1] = upgrade
            } else {
                line[index+1] = upgrade
            }
        } else {
            const baseLine = getChainedUpgrades(upgrade)
            const index = baseLine.findIndex(up => up.id === upgrade.id)
            const newLine: Upgrade[] = []
            newLine[index] = upgrade
            lines.push(newLine)
        }
        return lines
    }, [])
}

const arePartsOfTheSameUpgradeLine = (upgrade1: Upgrade, upgrade2: Upgrade): boolean => {
    let upgrade = upgrade1
    if (upgrade1.id === upgrade2.id) {
        return true
    }
    while (upgrade.previousLineTech) {
        if (upgrade.previousLineTech.id === upgrade2.id) {
            return true
        }
        upgrade = upgrade.previousLineTech
    }
    while (upgrade.nextLineTech) {
        if (upgrade.nextLineTech.id === upgrade2.id) {
            return true
        }
        upgrade = upgrade.nextLineTech
    }
    return false
}

// export const getAllUnitAffectingBonuses = (unit: Unit): Bonus[] => {
    // return allCivTechTrees
    //     .map(civ => civ.bonuses)
    //     .reduce((allBonuses: Bonus[], civBonuses: Bonus[]) => allBonuses.concat(civBonuses), [])
    //     .filter(bonus => bonus.affectedUnits.some(u => u.id === unit.id))
// }

export const getLastUnitsInLineInList = (units: Unit[]): Unit[] => {
    return units.reduce((lastUnits: Unit[], unit: Unit) => {
        const index = lastUnits.findIndex(u => u.id === unit.previousLineTech?.id)
        if (index > 0) {
            lastUnits.splice(index, 1)
        }
        return lastUnits
    }, [...units])
}

export const getNextUpgradesInLine = (upgrade: Upgrade): Upgrade[] => {
    if (upgrade.nextLineTech) {
        return [upgrade, ...getNextUpgradesInLine(upgrade.nextLineTech)]
    }
    return [upgrade]
}

export const getpreviousUpgradesInLine = (upgrade: Upgrade): Upgrade[] => {
    if (upgrade.previousLineTech) {
        return [upgrade, ...getpreviousUpgradesInLine(upgrade.previousLineTech)]
    }
    return [upgrade]
}

const getNextChainedUpgrades = (upgrade: Upgrade): Upgrade[] => {
    if (upgrade.nextLineTech) {
        return [upgrade, ...getNextChainedUpgrades(upgrade.nextLineTech)]
    }
    return [upgrade]
}

const getPreviousChainedUpgrades = (upgrade: Upgrade): Upgrade[] => {
    if (upgrade.previousLineTech) {
        return [...getPreviousChainedUpgrades(upgrade.previousLineTech), upgrade]
    }
    return [upgrade]
}

const reduceUnits = (units: Unit[], unitLine: UnitLine) => {
    units.push(...unitLine.list)
    return units
}

const reduceRegularUnits = (units: Unit[], unitLine: UnitLine) => {
    units.push(...unitLine.list.filter(unit => !unit.unique))
    return units
}

const reduceUniqueUnits = (units: Unit[], unitLine: UnitLine) => {
    if (unitLine.list[0].unique) {
        units.push(...unitLine.list)
    }
    return units
}