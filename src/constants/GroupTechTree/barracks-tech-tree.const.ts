import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { barracksUnits, barracksUpgrade } from "../techs/barracks-techs.const";

export const barracksTechs: GroupTechTree = {
    name: 'Barracks',
    units: [
        new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
        new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        new UnitLine([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior]),
    ],
    upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
};