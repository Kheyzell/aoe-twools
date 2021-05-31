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
import crest from '../../resources/images/crests/portuguese.png'
import { EffectType } from "../../models/bonus.model";

export const portugeseUniqueUnits: { organGun: Unit, eliteOrganGun: Unit, caravel: Unit, eliteCaravel: Unit } = {
    organGun: new Unit({
        id: 'organGun',
        name: 'Organ Gun',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 80,
            food: 0,
            gold: 70,
            stone: 0
        },
        duration: 21
    }),
    eliteOrganGun: new Unit({
        id: 'eliteOrganGun',
        name: 'Elite Organ Gun',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 80,
            food: 0,
            gold: 70,
            stone: 0
        },
        duration: 21
    }),
    caravel: new Unit({
        id: 'caravel',
        name: 'Caravel',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 43,
            stone: 0
        },
        duration: 36
    }),
    eliteCaravel: new Unit({
        id: 'eliteCaravel',
        name: 'Elite Caravel',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 43,
            stone: 0
        },
        duration: 36
    })
}

export const portugueseTechTree: CivTechTree = {
    id: 'portuguese',
    name: 'Portuguese',
    crest,
    wikiUrl: 'Portuguese_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'portuguese1',
            description: 'All units cost -20% gold',
            effectType: EffectType.discount,
            value: 20,
            affectedUnits: [
                barracksUnits.champion,
                archeryUnits.arbalester, archeryUnits.handCannoneer, archeryUnits.cavalryArcher,
                stableUnits.cavalier,
                siegeUnits.cappedRam, siegeUnits.onager, siegeUnits.scorpion, siegeUnits.siegeTower, siegeUnits.bombardCannon,
                castleUnits.petard, castleUnits.trebuchet,
                monasteryUnits.monk,
                marketUnits.tradeCart,
                dockUnits.galleon, dockUnits.fireShip, dockUnits.heavyDemolitionShip, dockUnits.eliteCannonGalleon,
                portugeseUniqueUnits.eliteOrganGun, portugeseUniqueUnits.eliteCaravel
            ],
            affectedUpgrades: [],
            hideInUnitRecap: true
        },
        {
            id: 'portuguese2',
            description: 'All ships have +10% HP',
            effectType: EffectType.discount,
            value: 20,
            affectedUnits: [dockUnits.fishingShip, dockUnits.transportShip, dockUnits.galleon, dockUnits.fireShip, dockUnits.heavyDemolitionShip, dockUnits.eliteCannonGalleon, portugeseUniqueUnits.eliteCaravel],
            affectedUpgrades: []
        },
        {
            id: 'portuguese3',
            description: 'The Feitoria becomes available for building in the Imperial Age',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'portuguese4',
            description: 'All technologies (excluding advancing ages) are researched 30% faster',
            effectType: EffectType.creationSpeed,
            value: 30,
            affectedUnits: [],
            affectedUpgrades: [
                barracksUpgrade.supplies, barracksUpgrade.arson,
                archeryUpgrades.thumbRing,
                stableUpgrades.bloodlines, stableUpgrades.husbandry,
                castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies,
                blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
                blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
                blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
                blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
                blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
                monasteryUpgrade.redemption, monasteryUpgrade.atonement, monasteryUpgrade.herbalMedecine, monasteryUpgrade.heresy, monasteryUpgrade.sanctity, monasteryUpgrade.fervor, monasteryUpgrade.faith, monasteryUpgrade.blockPrinting, monasteryUpgrade.theocracy,
                universityUpgrades.masonry, universityUpgrades.fortifiedWall, universityUpgrades.ballistics, universityUpgrades.guardTower, universityUpgrades.heatedShot, universityUpgrades.murderHoles, universityUpgrades.treadmillCrane, universityUpgrades.architecture, universityUpgrades.chemistry, universityUpgrades.bombardTower, universityUpgrades.siegeEngineers, universityUpgrades.keep,
                townCenterUpgrade.loom, townCenterUpgrade.wheelbarrow, townCenterUpgrade.townWatch, townCenterUpgrade.handCart, townCenterUpgrade.townPatrol,
                lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw, lumberCampUpgrades.twoManSaw,
                millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation,
                miningCampUpgrades.goldMining, miningCampUpgrades.stoneMining, miningCampUpgrades.stoneShaftMining,
                marketUpgrade.coinage, marketUpgrade.caravan, marketUpgrade.banking, marketUpgrade.guilds,
                dockUpgrades.gillnets, dockUpgrades.careening, dockUpgrades.dryDock
            ]
        },
        {
            id: 'portuguese5',
            description: 'The Line of Sight is shared with the team from the beginning of the game',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs: [
        {
            id: 'carrack',
            name: 'Carrack',
            description: 'ships +1/+1 armor',
            effectType: EffectType.armor,
            value: 1,
            cost: { wood: 200, food: 0, gold: 300, stone: 0 },
            duration: 40,
            affectedUnits: [dockUnits.fishingShip, dockUnits.transportShip, dockUnits.galleon, dockUnits.fireShip, dockUnits.heavyDemolitionShip, dockUnits.eliteCannonGalleon, portugeseUniqueUnits.eliteCaravel],
            affectedUpgrades: []
        },
        {
            id: 'arquebus',
            name: 'Arquebus',
            description: 'gunpowder units fire more accurately at moving targets',
            effectType: EffectType.accuracy,
            value: null,
            cost: { wood: 0, food: 700, gold: 400, stone: 0 },
            duration: 40,
            affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.eliteCannonGalleon, portugeseUniqueUnits.eliteOrganGun],
            affectedUpgrades: []
        }
    ],
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        units: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
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
            new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
            new UnitLine([portugeseUniqueUnits.organGun, portugeseUniqueUnits.eliteOrganGun]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
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
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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
            millUpgrades.cropRotation,
        ])
    },
    miningCamp: {
        units: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
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
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
            new UnitLine([portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}
