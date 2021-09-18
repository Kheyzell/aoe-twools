import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model"
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const"

export const townCenterTechs: GroupTechTree = {
    name: 'Town Center',
    unitLines: [ new UnitLine([townCenterUnits.villager]) ],
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