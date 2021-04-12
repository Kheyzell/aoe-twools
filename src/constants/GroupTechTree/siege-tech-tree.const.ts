import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { siegeUnits } from "../techs/siege-techs.const";

export const siegeTechs: GroupTechTree = {
    name: 'Stable',
    units: [
        new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
        new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
        new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
        new UnitLine([siegeUnits.siegeTower, siegeUnits.bombardCannon]),
    ],
    upgrades: new UpgradePerAgeGroup([])
};