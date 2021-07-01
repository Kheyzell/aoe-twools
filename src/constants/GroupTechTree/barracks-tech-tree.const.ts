import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { barracksUnits, barracksUpgrade } from "../techs/barracks-techs.const";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";
import { townCenterUpgrade } from "../techs/town-center-techs.const";

const militiaLine = new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion])
const spearLine = new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier])
const eagleLine = new UnitLine([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior])

const infantryUpgrades = [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson,
]
setAffectingUpgrades(militiaLine, [...infantryUpgrades, barracksUpgrade.supplies])
setAffectingUpgrades(spearLine, infantryUpgrades)
setAffectingUpgrades(eagleLine, infantryUpgrades)
barracksUnits.eagleScout.affectingUpgrades = [...barracksUnits.eagleScout.affectingUpgrades, townCenterUpgrade.feudalAge]

export const barracksTechs: GroupTechTree = {
    name: 'Barracks',
    unitLines: [militiaLine, spearLine, eagleLine],
    upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
};