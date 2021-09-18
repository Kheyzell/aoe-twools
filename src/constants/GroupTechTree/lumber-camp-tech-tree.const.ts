import { GroupTechTree, UpgradePerAgeGroup } from "../../models/techs.model";
import { lumberCampUpgrades } from "../techs/lumber-camp-techs.const";

export const lumberCampTechs: GroupTechTree = {
    name: 'Lumber Camp',
    unitLines: [],
    upgrades: new UpgradePerAgeGroup([
        lumberCampUpgrades.doubleBitAxe,
        lumberCampUpgrades.bowSaw,
        lumberCampUpgrades.twoManSaw,
    ])
};