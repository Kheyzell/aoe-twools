import { EffectType, UniqueTech } from "../../models/bonus.model";
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
import crest from '../../resources/images/crests/bohemians.png'
import { chainTechs } from "../../utils/techs.utils";

export const bohemiansUniqueUnits: { hussiteWagon: Unit, eliteHussiteWagon: Unit, houfnice: Unit } = {
    hussiteWagon: new Unit({
        id: 'hussiteWagon',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 110,
            food: 0,
            gold: 70,
            stone: 0
        },
        duration: 21
    }),
    eliteHussiteWagon: new Unit({
        id: 'eliteHussiteWagon',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 110,
            food: 0,
            gold: 70,
            stone: 0
        },
        duration: 21
    }),
    houfnice: new Unit({
        id: 'houfnice',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 225,
            food: 0,
            gold: 225,
            stone: 0
        },
        duration: 56
    })
}

chainTechs([bohemiansUniqueUnits.hussiteWagon, bohemiansUniqueUnits.eliteHussiteWagon])
chainTechs([siegeUnits.bombardCannon, bohemiansUniqueUnits.houfnice])

const uniqueTechs = [
    new UniqueTech({
        id: 'wagenburgTactics',
        age: 3,
        effectType: EffectType.movementSpeed,
        value: 15,
        cost: { wood: 0, food: 300, gold: 300, stone: 0 },
        duration: 45,
        affectedUnits: [archeryUnits.handCannoneer, bohemiansUniqueUnits.houfnice, bohemiansUniqueUnits.eliteHussiteWagon],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'hussiteReforms',
        age: 4,
        effectType: EffectType.discoutGold,
        value: null,
        cost: { wood: 0, food: 800, gold: 450, stone: 0 },
        duration: 45,
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: [monasteryUpgrade.redemption, monasteryUpgrade.atonement, monasteryUpgrade.herbalMedecine, monasteryUpgrade.heresy, monasteryUpgrade.sanctity, monasteryUpgrade.fervor, monasteryUpgrade.faith, monasteryUpgrade.illumination, monasteryUpgrade.blockPrinting, monasteryUpgrade.theocracy]
    })
]

export const bohemiansTechTree: CivTechTree = {
    id: 'bohemians',
    crest,
    wikiUrl: 'Bohemians',
    bonuses: [
        {
            id: 'bohemians1',
            effectType: EffectType.discoutWood,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'bohemians2',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [archeryUnits.handCannoneer],
            affectedUpgrades: [universityUpgrades.chemistry]
        },
        {
            id: 'bohemians3',
            effectType: EffectType.damagePercent,
            value: 25,
            affectedUnits: [barracksUnits.halberdier],
            affectedUpgrades: []
        },
        {
            id: 'bohemians4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: [monasteryUpgrade.fervor, monasteryUpgrade.sanctity]
        },
        {
            id: 'bohemians5',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [miningCampUpgrades.goldMining, miningCampUpgrades.goldShaftMining, miningCampUpgrades.stoneMining, miningCampUpgrades.stoneShaftMining]
        },
        {
            id: 'bohemians6',
            effectType: EffectType.miscallenous,
            value: 80,
            affectedUnits: [marketUnits.tradeCart],
            affectedUpgrades: [marketUpgrade.coinage, marketUpgrade.caravan, marketUpgrade.banking, marketUpgrade.guilds],
            team: true
        },
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier])
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier])
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon, bohemiansUniqueUnits.houfnice]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([bohemiansUniqueUnits.hussiteWagon, bohemiansUniqueUnits.eliteHussiteWagon]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
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
        unitLines: [],
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
            universityUpgrades.siegeEngineers,
            universityUpgrades.keep,
            universityUpgrades.arrowslits,
        ])
    },
    townCenter: {
        unitLines: [new UnitLine([townCenterUnits.villager])],
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
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            lumberCampUpgrades.doubleBitAxe,
            lumberCampUpgrades.bowSaw,
            lumberCampUpgrades.twoManSaw
        ])
    },
    mill: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            millUpgrades.horseColar,
            millUpgrades.heavyPlow
        ])
    },
    miningCamp: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
            miningCampUpgrades.goldShaftMining,
            miningCampUpgrades.stoneShaftMining,
        ])
    },
    market: {
        unitLines: [new UnitLine([marketUnits.tradeCart])],
        upgrades: new UpgradePerAgeGroup([
            marketUpgrade.coinage,
            marketUpgrade.caravan,
            marketUpgrade.banking,
            marketUpgrade.guilds,
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening
        ])
    }
}
