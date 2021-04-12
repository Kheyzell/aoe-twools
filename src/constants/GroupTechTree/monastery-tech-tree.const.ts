import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { monasteryUnits, monasteryUpgrade } from "../techs/monastery-techs.const";

export const monasteryTechs: GroupTechTree = {
    name: 'Monastery',
    units: [ new UnitLine([monasteryUnits.monk]) ],
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
        monasteryUpgrade.theocracy,
    ])
};