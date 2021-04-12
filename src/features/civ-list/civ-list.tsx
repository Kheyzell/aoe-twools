import React from "react"
import { useSelector } from "react-redux"

import { allCivTechTrees } from "../../constants"
import { CivTechTree, Tech, TechType, Unit, Upgrade } from "../../models/techs.model"
import { selectedTechsSelector } from "../tech-tree/techSlice"
import './civ-list.css'


type Props = {}
type State = {}

const CivList: React.FC<Props> = () => {
    const allCivTechs: CivTechTree[] = [...allCivTechTrees]
    const selectedTechs = useSelector(selectedTechsSelector)

    const hasTech = (civTechs: CivTechTree, tech: Tech): boolean => {
        if (tech.type === TechType.unit) {
            return hasUnit(civTechs, tech)
        } else {
            return hasUpgrade(civTechs, tech)
        }
    }

    const hasUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return hasBarracksUnit(civTechs, unit) || hasArcheryUnit(civTechs, unit) || hasStableUnit(civTechs, unit) || hasSiegeUnit(civTechs, unit) || hasCastleUnit(civTechs, unit) || hasMonasteryUnit(civTechs, unit) || hasTownCenterUnit(civTechs, unit) || hasMarketUnit(civTechs, unit) || hasDockUnit(civTechs, unit)
    }

    const hasBarracksUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.barracks.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasArcheryUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.archery.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasStableUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.stable.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasSiegeUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.siege.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasCastleUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.castle.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasMonasteryUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.monastery.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasTownCenterUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.townCenter.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasMarketUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.market.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasDockUnit = (civTechs: CivTechTree, unit: Unit): boolean => {
        return !!civTechs.dock.units.find(unitLine => {
            return (unitLine.age1.find(u1 => u1.id === unit.id) ||
                unitLine.age2.find(u2 => u2.id === unit.id) ||
                unitLine.age3.find(u3 => u3.id === unit.id) ||
                unitLine.age4.find(u4 => u4.id === unit.id))
        })
    }

    const hasUpgrade = (civTechs: CivTechTree, upgrade: Upgrade) => {
        return hasBarracksUpgrade(civTechs, upgrade) || hasArcheryUpgrade(civTechs, upgrade) || hasStableUpgrade(civTechs, upgrade) || hasCastleUpgrade(civTechs, upgrade) || hasBlacksmithUpgrade(civTechs, upgrade) || hasMonasteryUpgrade(civTechs, upgrade) || hasUniversityUpgrade(civTechs, upgrade) || hasTownCenterUpgrade(civTechs, upgrade) || hasLumberCampUpgrade(civTechs, upgrade) || hasMillUpgrade(civTechs, upgrade) || hasMiningCampUpgrade(civTechs, upgrade) || hasMarketUpgrade(civTechs, upgrade) || hasDockUpgrade(civTechs, upgrade)
    }

    const hasBarracksUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.barracks.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.barracks.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.barracks.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.barracks.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasArcheryUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.archery.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.archery.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.archery.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.archery.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasStableUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.stable.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.stable.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.stable.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.stable.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasCastleUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.castle.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.castle.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.castle.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.castle.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasBlacksmithUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.blacksmith.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.blacksmith.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.blacksmith.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.blacksmith.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasMonasteryUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.monastery.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.monastery.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.monastery.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.monastery.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasUniversityUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.university.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.university.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.university.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.university.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasTownCenterUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.townCenter.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.townCenter.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.townCenter.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.townCenter.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasLumberCampUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.lumberCamp.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.lumberCamp.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.lumberCamp.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.lumberCamp.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasMillUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.mill.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.mill.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.mill.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.mill.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasMiningCampUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.miningCamp.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.miningCamp.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.miningCamp.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.miningCamp.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasMarketUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.market.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.market.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.market.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.market.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const hasDockUpgrade = (civTechs: CivTechTree, upgrade: Upgrade): boolean => {
        return !!(civTechs.dock.upgrades.age1.find(u1 => u1.id === upgrade.id) ||
            civTechs.dock.upgrades.age2.find(u2 => u2.id === upgrade.id) ||
            civTechs.dock.upgrades.age3.find(u3 => u3.id === upgrade.id) ||
            civTechs.dock.upgrades.age4.find(u4 => u4.id === upgrade.id))
    }

    const filteredTechTrees = allCivTechs.filter(civTechs => {
        return selectedTechs.reduce((hasAllTechs: Boolean, currentTech: Tech) => {
            return hasAllTechs && hasTech(civTechs, currentTech)
        }, true)
    })

    return (
        <div className="CivList">
            {filteredTechTrees.map(civ => {
                return (
                    <div className="CivTree" key={civ.id}>
                        <span> {civ.name} </span>
                        <img src={civ.crest} alt={civ.name} />
                    </div>
                )
            })}
        </div>
    )
}

export default CivList