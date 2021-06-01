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
import crest from '../../resources/images/crests/ethiopians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";

export const ethiopiansUniqueUnits: { shotelWarrior: Unit, eliteShotelWarrior: Unit } = {
    shotelWarrior: new Unit({
        id: 'shotelWarrior',
        name: 'Shotel Warrior',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 50,
            gold: 30,
            stone: 0
        },
        duration: 8
    }),
    eliteShotelWarrior: new Unit({
        id: 'eliteShotelWarrior',
        name: 'Elite Shotel Warrior',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 50,
            gold: 30,
            stone: 0
        },
        duration: 8
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'royalHeirs',
        name: 'Royal Heirs',
        age: 3,
        description: 'halves Shotel Warrior training time',
        effectType: EffectType.creationSpeed,
        value: 100,
        cost: { wood: 0, food: 300, gold: 300, stone: 0 },
        duration: 40,
        affectedUnits: [ethiopiansUniqueUnits.eliteShotelWarrior],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'torsionEngines',
        name: 'Torsion Engines',
        age: 4,
        description: `Siege Workshop units' blast radius increased`,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 1000, gold: 600, stone: 0 },
        duration: 40,
        affectedUnits: [siegeUnits.siegeRam, siegeUnits.siegeOnager, siegeUnits.heavyScorpion, siegeUnits.bombardCannon],
        affectedUpgrades: []
    })
]

export const ethiopiansTechTree: CivTechTree = {
    id: 'ethiopians',
    name: 'Ethiopians',
    crest,
    wikiUrl: 'Ethiopians',
    bonuses: [
        {
            id: 'ethiopians1',
            description: 'The Archer line fires 18% faster',
            effectType: EffectType.fireRate,
            value: 18,
            affectedUnits: [archeryUnits.arbalester],
            affectedUpgrades: []
        },
        {
            id: 'ethiopians2',
            description: 'Receive 100 gold and 100 food when advancing to the next Age',
            effectType: EffectType.miscallenous,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'ethiopians3',
            description: 'The Pikeman upgrade is free',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [barracksUnits.pikeman],
            affectedUpgrades: []
        },
        {
            id: 'ethiopians4',
            description: 'Towers and Outposts have +3 LOS',
            effectType: EffectType.lineOfSight,
            value: 3,
            affectedUnits: [],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([ethiopiansUniqueUnits.shotelWarrior, ethiopiansUniqueUnits.eliteShotelWarrior]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        units: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
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
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
            universityUpgrades.keep,
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
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}
