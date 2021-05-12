import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { archeryUnits, archeryUpgrades } from "../techs/archery-techs.const";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";
import { stableUpgrades } from "../techs/stable-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

const archerLine = new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester])
const skirmisherLine = new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher])
const handCannoneerLine = new UnitLine([archeryUnits.handCannoneer])
const cavalryArcherLine = new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher])

setAffectingUpgrades(archerLine, [archeryUpgrades.thumbRing, 
    blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    universityUpgrades.ballistics, universityUpgrades.chemistry])
setAffectingUpgrades(skirmisherLine, [
    blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    universityUpgrades.ballistics, universityUpgrades.chemistry])
setAffectingUpgrades(handCannoneerLine, [blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor])
setAffectingUpgrades(cavalryArcherLine, [archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

export const archeryTechs: GroupTechTree = {
    name: 'Archery range',
    units: [archerLine, skirmisherLine, handCannoneerLine, cavalryArcherLine],
    upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
};