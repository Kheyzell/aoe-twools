import { mongolsUniqueUnits, berbersUniqueUnits, italiansUniqueUnits, mayansUniqueUnits, cumansUniqueUnits, koreansUniqueUnits, chineseUniqueUnits } from "..";
import { EffectOrder, GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { Unit } from "../../models/unit.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";
import { indiansUniqueUnits } from "../tech-trees/indians-tech-tree.const";
import { vietnameseUniqueUnits } from "../tech-trees/vietnamese-tech-tree.const";
import { archeryUnits, archeryUpgrades } from "../techs/archery-techs.const";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";
import { stableUpgrades } from "../techs/stable-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

const archerLine = new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester])
const skirmisherLine = new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher])
const handCannoneerLine = new UnitLine([archeryUnits.handCannoneer])
const cavalryArcherLine = new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher])

archeryUpgrades.thumbRing.effects = [
    {
        order: EffectOrder.first,
        apply: (unit: Unit) => {
            unit.stats.accuracy = 1
        }
    },
    {
        order: EffectOrder.last,
        apply: (unit: Unit) => {
            if (unit.id === archeryUnits.archer.id || unit.id === archeryUnits.crossbowman.id || unit.id === archeryUnits.arbalester.id ||
                unit.id === mongolsUniqueUnits.mangudai.id || unit.id === mongolsUniqueUnits.eliteMangudai.id ||
                unit.id === berbersUniqueUnits.camelArcher.id || unit.id === berbersUniqueUnits.eliteCamelArcher.id ||
                unit.id === italiansUniqueUnits.genoeseCrossbowman.id || unit.id === italiansUniqueUnits.eliteGenoeseCrossbowman.id ||
                unit.id === indiansUniqueUnits.elephantArcher.id || unit.id === indiansUniqueUnits.eliteElephantArcher.id ||
                unit.id === mayansUniqueUnits.plumedArcher.id || unit.id === mayansUniqueUnits.elitePlumedArcher.id ||
                unit.id === vietnameseUniqueUnits.rattanArcher.id || unit.id === vietnameseUniqueUnits.eliteRattanArcher.id ||
                unit.id === cumansUniqueUnits.kipchak.id || unit.id === cumansUniqueUnits.eliteKipchak.id
            ) {
                unit.stats.attackRate = multiplyNumber(unit.stats.attackRate, 1.18)
                unit.stats.rateOfFire = 1/unit.stats.attackRate
            }
            if (unit.id === archeryUnits.cavalryArcher.id || unit.id === archeryUnits.heavyCavalryArcher.id ||
                unit.id === koreansUniqueUnits.warWagon.id || unit.id === koreansUniqueUnits.eliteWarWagon.id
            ) {
                unit.stats.attackRate = multiplyNumber(unit.stats.attackRate, 1.11)
                unit.stats.rateOfFire = 1/unit.stats.attackRate
            }
            if (unit.id === chineseUniqueUnits.chukonu.id || unit.id === chineseUniqueUnits.eliteChukonu.id) {
                unit.stats.attackRate = multiplyNumber(unit.stats.attackRate, 1.25)
                unit.stats.rateOfFire = 1/unit.stats.attackRate
            }
        }
    }
]

setAffectingUpgrades(archerLine, [ 
    blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])
setAffectingUpgrades(skirmisherLine, [
    blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])
setAffectingUpgrades(handCannoneerLine, [blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor])
setAffectingUpgrades(cavalryArcherLine, [
    blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

export const archeryTechs: GroupTechTree = {
    name: 'Archery range',
    unitLines: [archerLine, skirmisherLine, handCannoneerLine, cavalryArcherLine],
    upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
};