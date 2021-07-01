import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model"
import { setAffectingUpgrades } from "../../utils/techs.utils"
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const"

const villagerLine = new UnitLine([townCenterUnits.villager])

setAffectingUpgrades(villagerLine, [townCenterUpgrade.loom, townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart])

export const townCenterTechs: GroupTechTree = {
    name: 'Town Center',
    unitLines: [ villagerLine ],
    upgrades: new UpgradePerAgeGroup([
        townCenterUpgrade.feudalAge,
        townCenterUpgrade.loom,
        townCenterUpgrade.casteAge,
        townCenterUpgrade.wheelbarrow,
        townCenterUpgrade.townWatch,
        townCenterUpgrade.imperialAge,
        townCenterUpgrade.handCart,
        townCenterUpgrade.townPatrol,
    ])
}