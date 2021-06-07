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
import crest from '../../resources/images/crests/berbers.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs } from "../../utils/techs.utils";

export const berbersUniqueUnits: { camelArcher: Unit, eliteCamelArcher: Unit, genitour: Unit, eliteGenitour: Unit } = {
    camelArcher: new Unit({
        id: 'camelArcher',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 50,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 25
    }),
    eliteCamelArcher: new Unit({
        id: 'eliteCamelArcher',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 50,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 25
    }),
    genitour: new Unit({
        id: 'genitour',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 50,
            gold: 0,
            stone: 0
        },
        duration: 25
    }),
    eliteGenitour: new Unit({
        id: 'eliteGenitour',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 50,
            gold: 0,
            stone: 0
        },
        duration: 25
    })
}

chainTechs([berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour])

const uniqueTechs = [
    new UniqueTech({
        id: 'kasbah',
        age: 3,
        effectType: EffectType.creationSpeed,
        value: 25,
        cost: { wood: 0, food: 250, gold: 250, stone: 0 },
        duration: 40,
        affectedUnits: [berbersUniqueUnits.eliteCamelArcher],
        affectedUpgrades: [castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies],
        team: true
    }),
    new UniqueTech({
        id: 'maghrebiCamels',
        age: 4,
        effectType: EffectType.regen,
        value: 15,
        cost: { wood: 0, food: 700, gold: 300, stone: 0 },
        duration: 40,
        affectedUnits: [stableUnits.heavyCamelRider, berbersUniqueUnits.eliteCamelArcher],
        affectedUpgrades: []
    })
]

export const berbersTechTree: CivTechTree = {
    id: 'berbers',
    crest,
    wikiUrl: 'Berbers',
    bonuses: [
        {
            id: 'berbers1',
            effectType: EffectType.movementSpeed,
            value: 10,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'berbers2',
            effectType: EffectType.discount,
            value: { age3: 15, age4: 20 },
            affectedUnits: [stableUnits.hussar, stableUnits.cavalier, stableUnits.heavyCamelRider],
            affectedUpgrades: []
        },
        {
            id: 'berbers3',
            effectType: EffectType.movementSpeed,
            value: 10,
            affectedUnits: [dockUnits.fishingShip, dockUnits.transportShip, dockUnits.galleon, dockUnits.fastFireShip, dockUnits.heavyDemolitionShip, dockUnits.eliteCannonGalleon],
            affectedUpgrades: []
        },
        {
            id: 'berbers4',
            effectType: EffectType.uniqueUnit,
            value: null,
            affectedUnits: [berbersUniqueUnits.eliteGenitour],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
            new UnitLine([berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([berbersUniqueUnits.camelArcher, berbersUniqueUnits.eliteCamelArcher]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
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
            universityUpgrades.treadmillCrane,
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
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}
