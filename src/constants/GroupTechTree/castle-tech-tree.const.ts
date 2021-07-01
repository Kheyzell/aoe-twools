import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { castleUnits, castleUpgrades } from "../techs/castle-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

const uniqueUnitLine = new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit])
const petardLine = new UnitLine([castleUnits.petard])
const trebuchetLine = new UnitLine([castleUnits.trebuchet])

setAffectingUpgrades(petardLine, [universityUpgrades.siegeEngineers])
setAffectingUpgrades(trebuchetLine, [universityUpgrades.siegeEngineers])
export const castleTechs: GroupTechTree = {
    name: 'Castle',
    unitLines: [uniqueUnitLine, petardLine, trebuchetLine],
    upgrades: new UpgradePerAgeGroup([castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
};