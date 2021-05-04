import { GroupTechTree, UpgradePerAgeGroup } from "../../models/techs.model";
import { universityUpgrades } from "../techs/university-techs.const";

export const universityTechs: GroupTechTree = {
    name: 'University',
    units: [],
    upgrades: new UpgradePerAgeGroup([
        universityUpgrades.masonry,
        universityUpgrades.fortifiedWall,
        universityUpgrades.ballistics,
        universityUpgrades.heatedShot,
        universityUpgrades.guardTower,
        universityUpgrades.murderHoles,
        universityUpgrades.treadmillCrane,
        universityUpgrades.architecture,
        universityUpgrades.chemistry,
        universityUpgrades.bombardTower,
        universityUpgrades.siegeEngineers,
        universityUpgrades.keep,
        universityUpgrades.arrowslits,
    ])
};