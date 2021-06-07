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
import crest from '../../resources/images/crests/teutons.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { getAllCivUnits } from "../../utils/techs.utils";

export const teutonsUniqueUnits: { teutonicKnight: Unit, eliteTeutonicKnight: Unit } = {
    teutonicKnight: new Unit({
        id: 'teutonicKnight',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 85,
            gold: 40,
            stone: 0
        },
        duration: 12
    }),
    eliteTeutonicKnight: new Unit({
        id: 'eliteTeutonicKnight',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 85,
            gold: 40,
            stone: 0
        },
        duration: 12
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'ironclad',
        age: 3,
        effectType: EffectType.meleeArmor,
        value: 4,
        cost: { wood: 400, food: 0, gold: 350, stone: 0 },
        duration: 60,
        affectedUnits: [siegeUnits.cappedRam, siegeUnits.siegeOnager, siegeUnits.heavyScorpion, siegeUnits.siegeTower, siegeUnits.bombardCannon],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'crenellations',
        age: 4,
        effectType: EffectType.range,
        value: 3,
        cost: { wood: 0, food: 600, gold: 0, stone: 400 },
        duration: 60,
        affectedUnits: [],
        affectedUpgrades: []
    })
]

export const teutonsTechTree: CivTechTree = {
    id: 'teutons',
    crest,
    wikiUrl: 'Teutons',
    bonuses: [],
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
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([teutonsUniqueUnits.teutonicKnight, teutonsUniqueUnits.eliteTeutonicKnight]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        units: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.heresy,
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
            universityUpgrades.treadmillCrane,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
            universityUpgrades.siegeEngineers,
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
            millUpgrades.cropRotation,
        ])
    },
    miningCamp: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
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
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
        ])
    }
}

teutonsTechTree.bonuses = [
    {
        id: 'teutons1',
        effectType: EffectType.miscallenous,
        value: 100,
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: []
    },
    {
        id: 'teutons2',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'teutons3',
        effectType: EffectType.freeUpgrade,
        value: null,
        affectedUnits: [],
        affectedUpgrades: [monasteryUpgrade.herbalMedecine, universityUpgrades.murderHoles]
    },
    {
        id: 'teutons4',
        effectType: EffectType.discount,
        value: 40,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'teutons5',
        effectType: EffectType.meleeArmor,
        value: { age3: 1, age4: 2 },
        affectedUnits: [barracksUnits.champion, barracksUnits.halberdier, stableUnits.scoutCavalry, stableUnits.paladin],
        affectedUpgrades: []
    },
    {
        id: 'teutons6',
        effectType: EffectType.miscallenous,
        value: 10,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'teutons7',
        effectType: EffectType.convertionResistance,
        value: 2,
        affectedUnits: getAllCivUnits(teutonsTechTree),
        affectedUpgrades: [],
        hideInUnitRecap: true,
        team: true
    },
]