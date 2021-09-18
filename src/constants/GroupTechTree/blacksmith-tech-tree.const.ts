import { GroupTechTree, UpgradePerAgeGroup } from "../../models/techs.model";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";

export const blacksmithTechs: GroupTechTree = {
    name: 'Blacksmith',
    unitLines: [],
    upgrades: new UpgradePerAgeGroup([
        blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
        blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
        blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
        blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
        blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
    ])
};