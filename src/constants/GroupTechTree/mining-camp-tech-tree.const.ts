import { GroupTechTree, UpgradePerAgeGroup } from "../../models/techs.model";
import { miningCampUpgrades } from "../techs/mining-camp-techs.const";

export const miningCampTechs: GroupTechTree = {
    name: 'Mining Camp',
    unitLines: [],
    upgrades: new UpgradePerAgeGroup([
        miningCampUpgrades.goldMining,
        miningCampUpgrades.stoneMining,
        miningCampUpgrades.goldShaftMining,
        miningCampUpgrades.stoneShaftMining,
    ])
};