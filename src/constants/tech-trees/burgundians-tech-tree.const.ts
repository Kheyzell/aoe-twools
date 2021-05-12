import { CivTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { archeryUnits, archeryUpgrades } from "../techs/archery-techs.const";
import { barracksUnits, barracksUpgrade } from "../techs/barracks-techs.const";
import { blacksmithUpgrades } from "../techs/blacksmith-techs.const";
import { castleUnits, castleUpgrades } from "../techs/castle-techs.const";
import { dockUnits, dockUpgrades } from "../techs/dock-techs.const";
import { lumberCampUpgrades } from "../techs/lumber-camp-techs.const";
import { marketUnits, marketUpgrade } from "../techs/market-techs.const";
import { millUpgrades } from "../techs/mill-techs.const";
import { miningCampUpgrades } from "../techs/mining-camp-techs.const";
import { monasteryUnits, monasteryUpgrade } from "../techs/monastery-techs.const";
import { siegeUnits } from "../techs/siege-techs.const";
import { stableUnits, stableUpgrades } from "../techs/stable-techs.const";
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";
import crest from '../../resources/images/crests/burgundians.png'
import { EffectType } from "../../models/bonus.model";

export const burgundiansTechTree: CivTechTree = {
    id: 'burgundians',
    name: 'Burgundians',
    crest,
    bonuses: [
        {
            id: 'burgundians1',
            description: 'Economic upgrades cost -50% food and are available one Age earlier than other civilizations',
            effectType: EffectType.miscallenous,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: [
                townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart,
                lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw, lumberCampUpgrades.twoManSaw,
                millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation,
                miningCampUpgrades.goldMining, miningCampUpgrades.stoneMining, miningCampUpgrades.goldShaftMining, miningCampUpgrades.stoneShaftMining,
                marketUpgrade.caravan, marketUpgrade.guilds,
                dockUpgrades.gillnets
            ]
        },
        {
            id: 'burgundians2',
            description: 'Stable technologies are 50% cheaper',
            effectType: EffectType.discount,
            value: 50,
            affectedUnits: [stableUnits.hussar, stableUnits.paladin],
            affectedUpgrades: []
        },
        {
            id: 'burgundians3',
            description: 'Gunpowder units gain a +25% bonus to their attack',
            effectType: EffectType.damagePercent,
            value: 25,
            affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.eliteCannonGalleon],
            affectedUpgrades: []
        },
        {
            id: 'burgundians4',
            description: 'Cavalier upgrade available in the Castle Age',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [stableUnits.paladin],
            affectedUpgrades: []
        },
        {
            id: 'burgundians5',
            description: 'Relics generate both gold and food at the same rate',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs: [
        {
            id: 'burgundianVineyards',
            name: 'Burgundian Vineyards',
            description: `Transforms half of the player's food into gold at a 2:1 ratio. Farmers slowly produce gold (about 0.012 gold/s)`,
            effectType: EffectType.miscallenous,
            value: null,
            cost: { wood: 0, food: 400, gold: 300, stone: 0 },
            duration: 45,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'flemishRevolution',
            name: 'Flemish Revolution',
            description: `Transforms player's Villagers into Flemish Militia. Flemish Militia becomes trainable at the Town Center`,
            effectType: EffectType.miscallenous,
            value: null,
            cost: { wood: 0, food: 800, gold: 450, stone: 0 },
            duration: 10,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        }
    ],
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        units: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
        ])
    },
    university: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.fortifiedWall,
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
            universityUpgrades.keep,
            universityUpgrades.arrowslits,
        ])
    },
    townCenter: {
        units: [new UnitLine([townCenterUnits.villager])],
        upgrades: new UpgradePerAgeGroup([
            townCenterUpgrade.feudalAge,
            townCenterUpgrade.loom,
            townCenterUpgrade.casteAge,
            townCenterUpgrade.wheelbarrow,
            townCenterUpgrade.townWatch,
            townCenterUpgrade.imperialAge,
            townCenterUpgrade.handCart,
            townCenterUpgrade.townPatrol,
        ])
    },
    lumberCamp: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            lumberCampUpgrades.doubleBitAxe,
            lumberCampUpgrades.bowSaw,
            lumberCampUpgrades.twoManSaw
        ])
    },
    mill: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            millUpgrades.horseColar,
            millUpgrades.heavyPlow,
            millUpgrades.cropRotation
        ])
    },
    miningCamp: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
            miningCampUpgrades.goldShaftMining,
            miningCampUpgrades.stoneShaftMining
        ])
    },
    market: {
        units: [new UnitLine([marketUnits.tradeCart])],
        upgrades: new UpgradePerAgeGroup([
            marketUpgrade.coinage,
            marketUpgrade.caravan,
            marketUpgrade.banking,
            marketUpgrade.guilds
        ])
    },
    dock: {
        units: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
        ])
    }
}
