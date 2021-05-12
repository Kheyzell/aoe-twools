import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { siegeUnits } from "../techs/siege-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

const ramLine = new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam])
const mangonelLine = new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager])
const scorpionLine = new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion])
const siegeTowerLine = new UnitLine([siegeUnits.siegeTower])
const bombardCannonLine = new UnitLine([siegeUnits.bombardCannon])

setAffectingUpgrades(ramLine, [universityUpgrades.siegeEngineers])
setAffectingUpgrades(mangonelLine, [universityUpgrades.siegeEngineers, universityUpgrades.chemistry])
setAffectingUpgrades(scorpionLine, [universityUpgrades.siegeEngineers, universityUpgrades.chemistry])
setAffectingUpgrades(bombardCannonLine, [universityUpgrades.siegeEngineers])

export const siegeTechs: GroupTechTree = {
    name: 'Siege',
    units: [ ramLine, mangonelLine, scorpionLine, siegeTowerLine, bombardCannonLine],
    upgrades: new UpgradePerAgeGroup([])
};