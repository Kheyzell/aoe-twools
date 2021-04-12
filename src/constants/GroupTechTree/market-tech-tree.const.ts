import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { marketUnits, marketUpgrade } from "../techs/market-techs.const";

export const marketTechs: GroupTechTree = {
    name: 'Market',
    units: [ new UnitLine([marketUnits.tradeCart]) ],
    upgrades: new UpgradePerAgeGroup([
        marketUpgrade.coinage,
        marketUpgrade.caravan,
        marketUpgrade.banking,
        marketUpgrade.guilds,
    ])
};