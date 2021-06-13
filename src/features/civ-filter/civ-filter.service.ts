import { castleUnits, castleUpgrades } from "../../constants/techs/castle-techs.const"
import { CivTechTree, Tech, TechType, Unit, Upgrade, GroupTechTree, UpgradePerAgeGroup, UnitLine } from "../../models/techs.model"
import { chainTechs } from "../../utils/techs.utils"

class CivFilterService {

    generateTechTreeToDisplayFrom(baseCivTechTree: CivTechTree, civTechTree: CivTechTree): CivTechTree {
        return {
            ...civTechTree,
            blacksmith: this.mergeGroupTechTrees(baseCivTechTree.blacksmith, civTechTree.blacksmith),
            barracks: this.mergeGroupTechTrees(baseCivTechTree.barracks, civTechTree.barracks),
            archery: this.mergeGroupTechTrees(baseCivTechTree.archery, civTechTree.archery),
            stable: this.mergeGroupTechTrees(baseCivTechTree.stable, civTechTree.stable),
            siege: this.mergeGroupTechTrees(baseCivTechTree.siege, civTechTree.siege),
            castle: this.castleReplaceAndMergeGroupTechTrees(baseCivTechTree.castle, civTechTree.castle),
            monastery: this.mergeGroupTechTrees(baseCivTechTree.monastery, civTechTree.monastery),
            university: this.mergeGroupTechTrees(baseCivTechTree.university, civTechTree.university),
            townCenter: this.mergeGroupTechTrees(baseCivTechTree.townCenter, civTechTree.townCenter),
            lumberCamp: this.mergeGroupTechTrees(baseCivTechTree.lumberCamp, civTechTree.lumberCamp),
            mill: this.mergeGroupTechTrees(baseCivTechTree.mill, civTechTree.mill),
            miningCamp: this.mergeGroupTechTrees(baseCivTechTree.miningCamp, civTechTree.miningCamp),
            market: this.mergeGroupTechTrees(baseCivTechTree.market, civTechTree.market),
            dock: this.mergeGroupTechTrees(baseCivTechTree.dock, civTechTree.dock)
        }
    }

    civHasTech(civTechTree: CivTechTree, tech: Tech): boolean {
        if (tech.type === TechType.unit) {
            return this.civHasUnit(civTechTree, tech as Unit)
        } else {
            return this.civHasUpgrade(civTechTree, tech as Upgrade)
        }
    }

    civHasUnit(civTechTree: CivTechTree, unit: Unit): boolean {
        return this.hasBarracksUnit(civTechTree, unit) || this.hasArcheryUnit(civTechTree, unit) || this.hasStableUnit(civTechTree, unit) || this.hasSiegeUnit(civTechTree, unit) || this.hasCastleUnit(civTechTree, unit) || this.hasMonasteryUnit(civTechTree, unit) || this.hasTownCenterUnit(civTechTree, unit) || this.hasMarketUnit(civTechTree, unit) || this.hasDockUnit(civTechTree, unit)
    }

    civHasUpgrade(civTechTree: CivTechTree, upgrade: Upgrade) {
        return this.hasBarracksUpgrade(civTechTree, upgrade) || this.hasArcheryUpgrade(civTechTree, upgrade) || this.hasStableUpgrade(civTechTree, upgrade) || this.hasCastleUpgrade(civTechTree, upgrade) || this.hasBlacksmithUpgrade(civTechTree, upgrade) || this.hasMonasteryUpgrade(civTechTree, upgrade) || this.hasUniversityUpgrade(civTechTree, upgrade) || this.hasTownCenterUpgrade(civTechTree, upgrade) || this.hasLumberCampUpgrade(civTechTree, upgrade) || this.hasMillUpgrade(civTechTree, upgrade) || this.hasMiningCampUpgrade(civTechTree, upgrade) || this.hasMarketUpgrade(civTechTree, upgrade) || this.hasDockUpgrade(civTechTree, upgrade)
    }

    private hasBarracksUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.barracks.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasArcheryUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.archery.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasStableUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.stable.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasSiegeUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.siege.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasCastleUnit(civTechs: CivTechTree, unit: Unit): boolean {
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

    private hasMonasteryUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.monastery.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasTownCenterUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.townCenter.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasMarketUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.market.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasDockUnit(civTechs: CivTechTree, unit: Unit): boolean {
        return !!civTechs.dock.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    private hasBarracksUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.barracks.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.barracks.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.barracks.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.barracks.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasArcheryUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.archery.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.archery.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.archery.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.archery.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasStableUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.stable.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.stable.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.stable.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.stable.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasCastleUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.castle.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.castle.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.castle.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.castle.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasBlacksmithUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.blacksmith.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.blacksmith.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.blacksmith.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.blacksmith.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasMonasteryUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.monastery.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.monastery.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.monastery.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.monastery.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasUniversityUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.university.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.university.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.university.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.university.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasTownCenterUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.townCenter.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.townCenter.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.townCenter.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.townCenter.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasLumberCampUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.lumberCamp.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.lumberCamp.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.lumberCamp.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.lumberCamp.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasMillUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.mill.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.mill.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.mill.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.mill.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasMiningCampUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.miningCamp.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.miningCamp.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.miningCamp.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.miningCamp.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasMarketUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.market.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.market.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.market.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.market.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private hasDockUpgrade(civTechs: CivTechTree, upgrade: Upgrade): boolean {
        return !!(civTechs.dock.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.dock.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.dock.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.dock.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    private mergeGroupTechTrees(baseGroup: GroupTechTree, otherGroup: GroupTechTree): GroupTechTree {
        return {
            name: baseGroup.name,
            units: this.mergeUnitLine(baseGroup.units, otherGroup.units),
            upgrades: this.mergeUpgrades(baseGroup.upgrades, otherGroup.upgrades)
        }
    }

    private castleReplaceAndMergeGroupTechTrees(baseGroup: GroupTechTree, otherGroup: GroupTechTree) {
        let unitLines = [...baseGroup.units]
        if (unitLines[0].list[0].id === castleUnits.uniqueUnit.id) { // in the case of the default full tech tree, we replace the Unique Unit
            unitLines[0] = otherGroup.units[0]
        } else { // otherwise we add the other unique unit to the group
            unitLines.unshift(baseGroup.units[0])
            unitLines[1] = otherGroup.units[0]
        }
        let upgrades = [...baseGroup.upgrades.list]
        if (upgrades[0].id === castleUpgrades.castleUniqueTech.id) { // in the case of the default full tech tree, we replace the Unique Technology
            upgrades[0] = otherGroup.upgrades.list[0]
            upgrades[1] = otherGroup.upgrades.list[1]
        } else { // otherwise we add the other unique technology to the list
            upgrades.unshift(baseGroup.upgrades.list[0], baseGroup.upgrades.list[1])
            upgrades[2] = otherGroup.upgrades.list[0]
            upgrades[3] = otherGroup.upgrades.list[1]
        }
        const upgradePerAgeGroup = new UpgradePerAgeGroup(upgrades)
        return {
            name: baseGroup.name,
            units: this.mergeUnitLine(unitLines, otherGroup.units),
            upgrades: upgradePerAgeGroup
        }
    }

    private mergeUnitLine(baseUnitLines: UnitLine[], otherUnitLines: UnitLine[]): UnitLine[] {
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

    private mergeUpgrades(baseUpgrades: UpgradePerAgeGroup, otherUpgrades: UpgradePerAgeGroup): UpgradePerAgeGroup {
        const upgrades = baseUpgrades.list.concat(otherUpgrades.list.filter(o => !baseUpgrades.list.find(b => b.id === o.id)))
        return new UpgradePerAgeGroup(upgrades)
    }

}

export default new CivFilterService()