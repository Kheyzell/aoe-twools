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
import crest from '../../resources/images/crests/italians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";

export const italiansUniqueUnits: { genoeseCrossbowman: Unit, eliteGenoeseCrossbowman: Unit, condottiero: Unit } = {
    genoeseCrossbowman: new Unit({
        id: 'genoeseCrossbowman',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 45,
            food: 0,
            gold: 40,
            stone: 0
        },
        duration: 18
    }),
    eliteGenoeseCrossbowman: new Unit({
        id: 'eliteGenoeseCrossbowman',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 45,
            food: 0,
            gold: 40,
            stone: 0
        },
        duration: 14
    }),
    condottiero: new Unit({
        id: 'condottiero',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 50,
            gold: 35,
            stone: 0
        },
        duration: 18
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'pavise',
        age: 3,
        effectType: EffectType.armor,
        value: 1,
        cost: { wood: 0, food: 300, gold: 150, stone: 0 },
        duration: 40,
        affectedUnits: [archeryUnits.arbalester, italiansUniqueUnits.condottiero],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'silkRoad',
        age: 4,
        effectType: EffectType.discount,
        value: 50,
        cost: { wood: 0, food: 500, gold: 250, stone: 0 },
        duration: 60,
        affectedUnits: [marketUnits.tradeCart],
        affectedUpgrades: []
    })
]

export const italiansTechTree: CivTechTree = {
    id: 'italians',
    crest,
    wikiUrl: 'Italians',
    bonuses: [
        {
            id: 'italians1',
            effectType: EffectType.discount,
            value: 33,
            affectedUnits: [dockUnits.galleon, dockUnits.fastFireShip, dockUnits.demotionShip, dockUnits.eliteCannonGalleon],
            affectedUpgrades: [dockUpgrades.gillnets, dockUpgrades.careening, dockUpgrades.shipwright, dockUpgrades.dryDock, universityUpgrades.masonry, universityUpgrades.fortifiedWall, universityUpgrades.ballistics, universityUpgrades.guardTower, universityUpgrades.heatedShot, universityUpgrades.murderHoles, universityUpgrades.treadmillCrane, universityUpgrades.architecture, universityUpgrades.chemistry, universityUpgrades.bombardTower, universityUpgrades.keep, universityUpgrades.arrowslits]
        },
        {
            id: 'italians2',
            effectType: EffectType.discount,
            value: 15,
            affectedUnits: [dockUnits.fishingShip],
            affectedUpgrades: []
        },
        {
            id: 'italians3',
            effectType: EffectType.discount,
            value: 20,
            affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.eliteCannonGalleon],
            affectedUpgrades: []
        },
        {
            id: 'italians4',
            effectType: EffectType.discount,
            value: 15,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.feudalAge, townCenterUpgrade.casteAge, townCenterUpgrade.imperialAge]
        },
        {
            id: 'italians5',
            effectType: EffectType.uniqueUnit,
            value: null,
            affectedUnits: [italiansUniqueUnits.condottiero],
            affectedUpgrades: [],
            team: true
        },
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
            new UnitLine([italiansUniqueUnits.condottiero])
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([italiansUniqueUnits.genoeseCrossbowman, italiansUniqueUnits.eliteGenoeseCrossbowman]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
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
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
            monasteryUpgrade.theocracy
        ])
    },
    university: {
        unitLines: [],
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
            universityUpgrades.bombardTower,
            universityUpgrades.keep,
            universityUpgrades.arrowslits
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
            townCenterUpgrade.townPatrol
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
            millUpgrades.heavyPlow,
            millUpgrades.cropRotation,
        ])
    },
    miningCamp: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
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
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock
        ])
    }
}
