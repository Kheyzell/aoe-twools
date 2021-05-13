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
import crest from '../../resources/images/crests/vikings.png'
import { EffectType } from "../../models/bonus.model";

export const vikingsUniqueUnits: { berserk: Unit, eliteBerserk: Unit, longboat: Unit, eliteLongboat: Unit } = {
    berserk: new Unit({
        id: 'berserk',
        name: 'Berserk',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 25,
            stone: 0
        },
        duration: 14
    }),
    eliteBerserk: new Unit({
        id: 'eliteBerserk',
        name: 'Elite Berserk',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 25,
            stone: 0
        },
        duration: 14
    }),
    longboat: new Unit({
        id: 'longboat',
        name: 'Longboat',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 50,
            stone: 0
        },
        duration: 25
    }),
    eliteLongboat: new Unit({
        id: 'eliteLongboat',
        name: 'Elite Longboat',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 50,
            stone: 0
        },
        duration: 25
    })
}

export const vikingsTechTree: CivTechTree = {
    id: 'vikings',
    name: 'Vikings',
    crest,
    bonuses: [
        {
            id: 'vikings1',
            description: 'Warships are 15%/15%/20% cheaper in the Feudal/Castle/Imperial Age',
            effectType: EffectType.discount,
            value: { age2: 15, age3: 15, age4: 20 },
            affectedUnits: [dockUnits.galleon, dockUnits.heavyDemolitionShip, dockUnits.eliteCannonGalleon, vikingsUniqueUnits.eliteLongboat],
            affectedUpgrades: []
        },
        {
            id: 'vikings2',
            description: 'Infantry have +10%/+15%/+20% HP in the Feudal/Castle/Imperial Age',
            effectType: EffectType.healthPercent,
            value: { age2: 10, age3: 15, age4: 20 },
            affectedUnits: [barracksUnits.champion, barracksUnits.pikeman, vikingsUniqueUnits.eliteBerserk],
            affectedUpgrades: []
        },
        {
            id: 'vikings3',
            description: 'Wheelbarrow and Hand Cart are free',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart]
        },
        {
            id: 'vikings4',
            description: 'Docks are 15% cheaper',
            effectType: EffectType.discount,
            value: 15,
            affectedUnits: [],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs: [
        {
            id: 'chieftains',
            name: 'Chieftains',
            description: 'Infantry +5 attack against cavalry and +4 attack against camels',
            effectType: EffectType.miscallenous,
            value: null,
            cost: { wood: 0, food: 700, gold: 500, stone: 0 },
            duration: 40,
            affectedUnits: [barracksUnits.champion, barracksUnits.pikeman, vikingsUniqueUnits.eliteBerserk],
            affectedUpgrades: []
        },
        {
            id: 'berserkergang',
            name: 'Berserkergang',
            description: 'Berserks regenerate faster (40HP/min)',
            effectType: EffectType.regen,
            value: 40,
            cost: { wood: 0, food: 850, gold: 400, stone: 0 },
            duration: 40,
            affectedUnits: [vikingsUniqueUnits.eliteBerserk],
            affectedUpgrades: []
        }
    ],
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
            new UnitLine([vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk]),
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
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        units: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.heresy,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
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
            miningCampUpgrades.goldShaftMining,
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
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
            new UnitLine([vikingsUniqueUnits.longboat, vikingsUniqueUnits.eliteLongboat]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}
