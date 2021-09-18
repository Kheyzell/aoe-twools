import { GroupTechTree, UpgradePerAgeGroup } from "../../models/techs.model";
import { millUpgrades } from "../techs/mill-techs.const";

export const millTechs: GroupTechTree = {
    name: 'Mill',
    unitLines: [],
    upgrades: new UpgradePerAgeGroup([
        millUpgrades.horseColar,
        millUpgrades.heavyPlow,
        millUpgrades.cropRotation,
    ])
};