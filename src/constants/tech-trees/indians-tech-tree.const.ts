import { CivTechTree, Unit, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
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
import crest from '../../resources/images/crests/indians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs } from "../../utils/techs.utils";

export const indiansUniqueUnits: { elephantArcher: Unit, eliteElephantArcher: Unit, imperialCamelRider: Unit } = {
    elephantArcher: new Unit({
        id: 'elephantArcher',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 70,
            stone: 0
        },
        duration: 25
    }),
    eliteElephantArcher: new Unit({
        id: 'eliteElephantArcher',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 70,
            stone: 0
        },
        duration: 25
    }),
    imperialCamelRider: new Unit({
        id: 'imperialCamelRider',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        duration: 20
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'sultans',
        age: 3,
        effectType: EffectType.miscallenous,
        value: 10,
        cost: { wood: 400, food: 400, gold: 0, stone: 0 },
        duration: 40,
        affectedUnits: [townCenterUnits.villager, marketUnits.tradeCart, dockUnits.tradeCog],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'shatagni',
        age: 4,
        effectType: EffectType.range,
        value: 1,
        cost: { wood: 0, food: 500, gold: 300, stone: 0 },
        duration: 40,
        affectedUnits: [archeryUnits.handCannoneer],
        affectedUpgrades: []
    })
]

export const indiansTechTree: CivTechTree = {
    id: 'indians',
    crest,
    wikiUrl: 'Indians_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'indians1',
            effectType: EffectType.miscallenous,
            value: 10,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'indians2',
            effectType: EffectType.discount,
            value: { age1: 10, age2: 15, age3: 20, age4: 25 },
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'indians3',
            effectType: EffectType.pierceArmor,
            value: { age3: 1, age4: 2 },
            affectedUnits: [stableUnits.hussar, indiansUniqueUnits.imperialCamelRider],
            affectedUpgrades: []
        },
        {
            id: 'indians4',
            effectType: EffectType.miscallenous,
            value: 4,
            affectedUnits: [indiansUniqueUnits.imperialCamelRider],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider, indiansUniqueUnits.imperialCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
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
            new UnitLine([indiansUniqueUnits.elephantArcher, indiansUniqueUnits.eliteElephantArcher]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        units: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
            monasteryUpgrade.theocracy,
        ])
    },
    university: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.fortifiedWall,
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
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
        ])
    },
    miningCamp: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
            miningCampUpgrades.goldShaftMining,
            miningCampUpgrades.stoneShaftMining,
        ])
    },
    market: {
        units: [new UnitLine([marketUnits.tradeCart])],
        upgrades: new UpgradePerAgeGroup([
            marketUpgrade.coinage,
            marketUpgrade.caravan,
            marketUpgrade.banking,
            marketUpgrade.guilds,
        ])
    },
    dock: {
        units: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}
