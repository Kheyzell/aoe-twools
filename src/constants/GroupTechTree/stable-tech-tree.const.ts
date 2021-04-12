import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { stableUnits, stableUpgrades } from "../techs/stable-techs.const";

export const stableTechs: GroupTechTree = {
    name: 'Stable',
    units: [
        new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
        new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant]),
        new UnitLine([stableUnits.steppeLancer, stableUnits.eliteSteppeLancer]),
    ],
    upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
};