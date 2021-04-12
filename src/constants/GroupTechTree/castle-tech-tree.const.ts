import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { castleUnits, castleUpgrades } from "../techs/castle-techs.const";

export const castleTechs: GroupTechTree = {
    name: 'Castle',
    units: [
        new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
        new UnitLine([castleUnits.petard]),
        new UnitLine([castleUnits.trebuchet]),
    ],
    upgrades: new UpgradePerAgeGroup([castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
};