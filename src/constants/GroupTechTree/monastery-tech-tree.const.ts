import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { monasteryUnits, monasteryUpgrade } from "../techs/monastery-techs.const";

const monkLine = new UnitLine([monasteryUnits.monk])
setAffectingUpgrades(monkLine, [
    monasteryUpgrade.redemption,
    monasteryUpgrade.atonement,
    monasteryUpgrade.herbalMedecine,
    monasteryUpgrade.sanctity,
    monasteryUpgrade.fervor,
    monasteryUpgrade.illumination,
    monasteryUpgrade.blockPrinting,
    monasteryUpgrade.theocracy
])

export const monasteryTechs: GroupTechTree = {
    name: 'Monastery',
    units: [ monkLine ],
    upgrades: new UpgradePerAgeGroup([
        monasteryUpgrade.redemption,
        monasteryUpgrade.atonement,
        monasteryUpgrade.herbalMedecine,
        monasteryUpgrade.heresy,
        monasteryUpgrade.sanctity,
        monasteryUpgrade.fervor,
        monasteryUpgrade.faith,
        monasteryUpgrade.illumination,
        monasteryUpgrade.blockPrinting,
        monasteryUpgrade.theocracy
    ])
};