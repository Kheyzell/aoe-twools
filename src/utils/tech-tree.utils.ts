import { CivTechTree, GroupTechTree, Tech, TechType, Unit, UnitLine, Upgrade, UpgradePerAgeGroup } from "../models/techs.model"
import { castleUnits } from "../constants/techs/castle-techs.const"
import { chainTechs } from "./techs.utils"

export const generateTechTreeToDisplayFrom = (baseCivTechTree: CivTechTree, civTechTree: CivTechTree): CivTechTree => {
    return {
        ...civTechTree,
        blacksmith: mergeGroupTechTrees(baseCivTechTree.blacksmith, civTechTree.blacksmith),
        barracks: mergeGroupTechTrees(baseCivTechTree.barracks, civTechTree.barracks),
        archery: mergeGroupTechTrees(baseCivTechTree.archery, civTechTree.archery),
        stable: mergeGroupTechTrees(baseCivTechTree.stable, civTechTree.stable),
        siege: mergeGroupTechTrees(baseCivTechTree.siege, civTechTree.siege),
        castle: castleReplaceAndMergeGroupTechTrees(baseCivTechTree.castle, civTechTree.castle),
        monastery: mergeGroupTechTrees(baseCivTechTree.monastery, civTechTree.monastery),
        university: mergeGroupTechTrees(baseCivTechTree.university, civTechTree.university),
        townCenter: mergeGroupTechTrees(baseCivTechTree.townCenter, civTechTree.townCenter),
        lumberCamp: mergeGroupTechTrees(baseCivTechTree.lumberCamp, civTechTree.lumberCamp),
        mill: mergeGroupTechTrees(baseCivTechTree.mill, civTechTree.mill),
        miningCamp: mergeGroupTechTrees(baseCivTechTree.miningCamp, civTechTree.miningCamp),
        market: mergeGroupTechTrees(baseCivTechTree.market, civTechTree.market),
        dock: mergeGroupTechTrees(baseCivTechTree.dock, civTechTree.dock)
    }
}

export const civHasTech = (civTechTree: CivTechTree, tech: Tech): boolean => {
    if (tech.type === TechType.unit) {
        return civHasUnit(civTechTree, tech as Unit)
    } else {
        return civHasUpgrade(civTechTree, tech as Upgrade)
    }
}

export const civHasUnit = (civTechTree: CivTechTree, unit: Unit): boolean => {
    return hasBarracksUnit(civTechTree, unit) || hasArcheryUnit(civTechTree, unit) || hasStableUnit(civTechTree, unit) || hasSiegeUnit(civTechTree, unit) || hasCastleUnit(civTechTree, unit) || hasMonasteryUnit(civTechTree, unit) || hasTownCenterUnit(civTechTree, unit) || hasMarketUnit(civTechTree, unit) || hasDockUnit(civTechTree, unit)
}

export const hasBarracksUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.barracks.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasArcheryUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.archery.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasStableUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.stable.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasSiegeUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.siege.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasCastleUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    if (unit.id === castleUnits.uniqueUnit.id || unit.id === castleUnits.eliteUniqueUnit.id) {
        return true
    }
    return !!civTechs.castle.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasMonasteryUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.monastery.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasTownCenterUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.townCenter.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasMarketUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.market.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const hasDockUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
    return !!civTechs.dock.units.find(unitLine => {
        return (unitLine.age1.find(u1 => u1.id === unit.id) ||
            unitLine.age2.find(u2 => u2.id === unit.id) ||
            unitLine.age3.find(u3 => u3.id === unit.id) ||
            unitLine.age4.find(u4 => u4.id === unit.id))
    })
}

export const civHasUpgrade = (civTechTree: CivTechTree, upgrade: Upgrade) => {
    return hasBarracksUpgrade(civTechTree, upgrade) || hasArcheryUpgrade(civTechTree, upgrade) || hasStableUpgrade(civTechTree, upgrade) || hasCastleUpgrade(civTechTree, upgrade) || hasBlacksmithUpgrade(civTechTree, upgrade) || hasMonasteryUpgrade(civTechTree, upgrade) || hasUniversityUpgrade(civTechTree, upgrade) || hasTownCenterUpgrade(civTechTree, upgrade) || hasLumberCampUpgrade(civTechTree, upgrade) || hasMillUpgrade(civTechTree, upgrade) || hasMiningCampUpgrade(civTechTree, upgrade) || hasMarketUpgrade(civTechTree, upgrade) || hasDockUpgrade(civTechTree, upgrade)
}

export const hasBarracksUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.barracks.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.barracks.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.barracks.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.barracks.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasArcheryUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.archery.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.archery.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.archery.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.archery.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasStableUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.stable.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.stable.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.stable.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.stable.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasCastleUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.castle.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.castle.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.castle.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.castle.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasBlacksmithUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.blacksmith.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.blacksmith.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.blacksmith.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.blacksmith.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasMonasteryUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.monastery.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.monastery.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.monastery.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.monastery.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasUniversityUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.university.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.university.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.university.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.university.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasTownCenterUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.townCenter.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.townCenter.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.townCenter.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.townCenter.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasLumberCampUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.lumberCamp.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.lumberCamp.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.lumberCamp.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.lumberCamp.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasMillUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.mill.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.mill.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.mill.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.mill.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasMiningCampUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.miningCamp.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.miningCamp.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.miningCamp.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.miningCamp.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasMarketUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.market.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.market.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.market.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.market.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

export const hasDockUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
    return !!(civTechs.dock.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
        civTechs.dock.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
        civTechs.dock.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
        civTechs.dock.upgrades.age4.find(u4 => u4.id === upgrade.id))
}

function mergeGroupTechTrees(baseGroup: GroupTechTree, otherGroup: GroupTechTree): GroupTechTree {
    return {
        name: baseGroup.name,
        units: mergeUnitLine(baseGroup.units, otherGroup.units),
        upgrades: mergeUpgrades(baseGroup.upgrades, otherGroup.upgrades)
    }
}

function castleReplaceAndMergeGroupTechTrees(baseGroup: GroupTechTree, otherGroup: GroupTechTree) {
    let unitLines = [...baseGroup.units]
    unitLines[0] = otherGroup.units[0]
    let upgrades = [...baseGroup.upgrades.list]
    upgrades[0] = otherGroup.upgrades.list[0]
    upgrades[1] = otherGroup.upgrades.list[1]
    const upgradePerAgeGroup = new UpgradePerAgeGroup(upgrades)
    return {
        name: baseGroup.name,
        units: mergeUnitLine(unitLines, otherGroup.units),
        upgrades: upgradePerAgeGroup
    }
}

function mergeUnitLine(baseUnitLines: UnitLine[], otherUnitLines: UnitLine[]): UnitLine[] {
    const baseUnitsWithUniqueUnitLine = baseUnitLines.map(unitLine => {
        const correspondOtherUnitLine = otherUnitLines.find(o => o.list[0].id === unitLine.list[0].id)
        if (correspondOtherUnitLine && correspondOtherUnitLine?.list.length > unitLine.list.length) {
            chainTechs(correspondOtherUnitLine.list)
            return correspondOtherUnitLine
        }
        return unitLine
    })
    return baseUnitsWithUniqueUnitLine.concat(otherUnitLines.filter(o => !baseUnitLines.find(b => b.list[0].id === o.list[0].id)))
}

function mergeUpgrades(baseUpgrades: UpgradePerAgeGroup, otherUpgrades: UpgradePerAgeGroup): UpgradePerAgeGroup {
    const upgrades = baseUpgrades.list.concat(otherUpgrades.list.filter(o => !baseUpgrades.list.find(b => b.id === o.id)))
    return new UpgradePerAgeGroup(upgrades)
}