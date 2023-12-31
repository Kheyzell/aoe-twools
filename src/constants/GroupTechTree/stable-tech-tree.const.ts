import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";
import { stableUnits, stableUpgrades } from "../techs/stable-techs.const";
import { townCenterUpgrade } from "../techs/town-center-techs.const";

const scoutLine = new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar])
const wingedLine = new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.wingedHussar])
const knightLine = new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin])
const camelLine = new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider])
const elephantLine = new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant])
const steppeLancerLine = new UnitLine([stableUnits.steppeLancer, stableUnits.eliteSteppeLancer])

const cavalryUpgrades = [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
]
setAffectingUpgrades(scoutLine, cavalryUpgrades)
setAffectingUpgrades(wingedLine, cavalryUpgrades)
setAffectingUpgrades(knightLine, cavalryUpgrades)
setAffectingUpgrades(camelLine, cavalryUpgrades)
setAffectingUpgrades(elephantLine, cavalryUpgrades)
setAffectingUpgrades(steppeLancerLine, cavalryUpgrades)
stableUnits.scoutCavalry.affectingUpgrades = [...stableUnits.scoutCavalry.affectingUpgrades, townCenterUpgrade.feudalAge]
stableUnits.lightCavalry.affectingUpgrades = [...stableUnits.lightCavalry.affectingUpgrades, townCenterUpgrade.imperialAge]

export const stableTechs: GroupTechTree = {
    name: 'Stable',
    unitLines: [
        scoutLine,
        knightLine,
        camelLine,
        elephantLine,
        steppeLancerLine,
    ],
    upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
};