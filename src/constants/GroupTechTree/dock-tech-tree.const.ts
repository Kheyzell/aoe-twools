import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";
import { dockUnits, dockUpgrades } from "../techs/dock-techs.const";
import { marketUpgrade } from "../techs/market-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

const fishingShipLine = new UnitLine([dockUnits.fishingShip])
const transportShipLine = new UnitLine([dockUnits.transportShip])
const tradeCogLine = new UnitLine([dockUnits.tradeCog])
const galleyLine = new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon])
const fireGalleyLine = new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip])
const demolitionRaftLine = new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip])
const cannonGalleonLine = new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon])
const dromonLine = new UnitLine([dockUnits.dromon])

const shipUpgrades = [dockUpgrades.careening, dockUpgrades.shipwright, dockUpgrades.dryDock]

setAffectingUpgrades(fishingShipLine, [dockUpgrades.gillnets, ...shipUpgrades])
setAffectingUpgrades(transportShipLine, [...shipUpgrades])
setAffectingUpgrades(tradeCogLine, [marketUpgrade.caravan, ...shipUpgrades])
setAffectingUpgrades(galleyLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, universityUpgrades.chemistry, universityUpgrades.ballistics, ...shipUpgrades])
setAffectingUpgrades(fireGalleyLine, [...shipUpgrades])
setAffectingUpgrades(demolitionRaftLine, [...shipUpgrades])
setAffectingUpgrades(cannonGalleonLine, [...shipUpgrades, universityUpgrades.siegeEngineers])
setAffectingUpgrades(dromonLine, [...shipUpgrades, universityUpgrades.siegeEngineers])
export const dockTechs: GroupTechTree = {
    name: 'Dock',
    unitLines: [fishingShipLine, transportShipLine, galleyLine, fireGalleyLine, demolitionRaftLine, cannonGalleonLine, dromonLine],
    upgrades: new UpgradePerAgeGroup([
        dockUpgrades.gillnets,
        dockUpgrades.careening,
        dockUpgrades.shipwright,
        dockUpgrades.dryDock,
    ])
};