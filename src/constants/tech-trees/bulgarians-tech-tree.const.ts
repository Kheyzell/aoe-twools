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
import crest from '../../resources/images/crests/bulgarians.png'
import { EffectType } from "../../models/bonus.model";

export const bulgariansUniqueUnits: { konnik: Unit, eliteKonnik: Unit } = {
    konnik: new Unit({
        id: 'konnik',
        name: 'Konnik',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 70,
            stone: 0
        },
        duration: 19
    }),
    eliteKonnik: new Unit({
        id: 'eliteKonnik',
        name: 'Elite Konnik',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 70,
            stone: 0
        },
        duration: 19
    })
}

export const bulgariansTechTree: CivTechTree = {
    id: 'bulgarians',
    name: 'Bulgarians',
    crest,
    wikiUrl: 'Bulgarians',
    bonuses: [
        {
            id: 'bulgarians1',
            description: 'Militia line upgrades are free',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [barracksUnits.twoHandedSwordsman],
            affectedUpgrades: []
        },
        {
            id: 'bulgarians2',
            description: 'Town Centers cost -50% stone',
            effectType: EffectType.discoutWood,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'bulgarians3',
            description: 'The Krepost becomes available for construction in the Castle Age',
            effectType: EffectType.uniqueBuilding,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'bulgarians4',
            description: 'Blacksmith and Siege Workshop upgrades cost -50% food',
            effectType: EffectType.discoutFood,
            value: 50,
            affectedUnits: [siegeUnits.siegeRam, siegeUnits.siegeOnager, siegeUnits.heavyScorpion],
            affectedUpgrades: [blacksmithUpgrades.blastFurnace, blacksmithUpgrades.plateMailArmor, blacksmithUpgrades.plateBardingArmor, blacksmithUpgrades.bracer, blacksmithUpgrades.leatherArcherArmor]
        },
        {
            id: 'bulgarians5',
            description: 'Blacksmiths work 80% faster',
            effectType: EffectType.creationSpeed,
            value: 80,
            affectedUnits: [],
            affectedUpgrades: [blacksmithUpgrades.blastFurnace, blacksmithUpgrades.plateMailArmor, blacksmithUpgrades.plateBardingArmor, blacksmithUpgrades.bracer, blacksmithUpgrades.leatherArcherArmor],
            team: true
        }
    ],
    uniqueTechs: [
        {
            id: 'stirrups',
            name: 'Stirrups',
            description: 'Light Cavalry, Knight line and Konniks attack 33% faster',
            effectType: EffectType.fireRate,
            value: 33,
            cost: { wood: 0, food: 400, gold: 200, stone: 0 },
            duration: 35,
            affectedUnits: [stableUnits.hussar, stableUnits.cavalier, bulgariansUniqueUnits.eliteKonnik],
            affectedUpgrades: []
        },
        {
            id: 'bagains',
            name: 'Bagains',
            description: 'Militia line +5 melee armor',
            effectType: EffectType.meleeArmor,
            value: 5,
            cost: { wood: 0, food: 900, gold: 450, stone: 0 },
            duration: 40,
            affectedUnits: [barracksUnits.twoHandedSwordsman],
            affectedUpgrades: []
        }
    ],
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
            new UnitLine([bulgariansUniqueUnits.konnik, bulgariansUniqueUnits.eliteKonnik]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.conscription, castleUpgrades.spies])
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
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.heresy,
            monasteryUpgrade.fervor,
            monasteryUpgrade.illumination,
            monasteryUpgrade.theocracy,
        ])
    },
    university: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
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
        ])
    }
}
