import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { archeryUnits, archeryUpgrades } from "../techs/archery-techs.const";

console.log(archeryUnits);


export const archeryTechs: GroupTechTree = {
    name: 'Archery range',
    units: [
        new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
        new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
        new UnitLine([archeryUnits.handCannoneer]),
        new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
    ],
    upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
};