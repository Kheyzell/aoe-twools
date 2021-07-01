import { GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { setAffectingUpgrades } from "../../utils/techs.utils";
import { marketUnits, marketUpgrade } from "../techs/market-techs.const";

const tradeCartLine = new UnitLine([marketUnits.tradeCart])

setAffectingUpgrades(tradeCartLine, [marketUpgrade.caravan])

export const marketTechs: GroupTechTree = {
    name: 'Market',
    unitLines: [ tradeCartLine ],
    upgrades: new UpgradePerAgeGroup([
        marketUpgrade.coinage,
        marketUpgrade.caravan,
        marketUpgrade.banking,
        marketUpgrade.guilds,
    ])
}