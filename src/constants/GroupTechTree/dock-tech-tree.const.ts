import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { dockUnits, dockUpgrades } from "../techs/dock-techs.const";

export const dockTechs: GroupTechTree = {
    name: 'Dock',
    units: [
        new UnitLine([dockUnits.fishingShip]),
        new UnitLine([dockUnits.transportShip]),
        new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
        new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
        new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
        new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
    ],
    upgrades: new UpgradePerAgeGroup([
        dockUpgrades.gillnets,
        dockUpgrades.careening,
        dockUpgrades.shipwright,
        dockUpgrades.dryDock,
    ])
};