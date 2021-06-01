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
import crest from '../../resources/images/crests/persians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";

export const persiansUniqueUnits: { warElephant: Unit, eliteWarElephant: Unit } = {
    warElephant: new Unit({
        id: 'warElephant',
        name: 'War Elephant',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 200,
            gold: 75,
            stone: 0
        },
        duration: 31
    }),
    eliteWarElephant: new Unit({
        id: 'eliteWarElephant',
        name: 'Elite War Elephant',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 200,
            gold: 75,
            stone: 0
        },
        duration: 31
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'kamandaran',
        name: 'Kamandaran',
        age: 3,
        description: 'turns Archer gold cost into wood cost',
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 400, gold: 300, stone: 0 },
        duration: 40,
        affectedUnits: [archeryUnits.crossbowman],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'mahouts',
        name: 'Mahouts',
        age: 4,
        description: 'War Elephants move +30% faster',
        effectType: EffectType.movementSpeed,
        value: 30,
        cost: { wood: 0, food: 300, gold: 300, stone: 0 },
        duration: 50,
        affectedUnits: [persiansUniqueUnits.eliteWarElephant],
        affectedUpgrades: []
    })
]

export const persiansTechTree: CivTechTree = {
    id: 'persians',
    name: 'Persians',
    crest,
    wikiUrl: 'Persians_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'persians1',
            description: 'Start the game with +50 food and +50 wood',
            effectType: EffectType.miscallenous,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'persians2',
            description: 'Town Centers and Docks have double HP and work 10%/15%/20% faster in the Feudal/Castle/Imperial Age',
            effectType: EffectType.creationSpeed,
            value: { age2: 10, age3: 15, age4: 20 },
            affectedUnits: [townCenterUnits.villager, dockUnits.fishingShip, dockUnits.transportShip, dockUnits.galleon, dockUnits.fastFireShip, dockUnits.heavyDemolitionShip, dockUnits.eliteCannonGalleon],
            affectedUpgrades: [townCenterUpgrade.feudalAge, townCenterUpgrade.loom, townCenterUpgrade.casteAge, townCenterUpgrade.wheelbarrow, townCenterUpgrade.townWatch, townCenterUpgrade.imperialAge, townCenterUpgrade.handCart, townCenterUpgrade.townPatrol, dockUpgrades.gillnets, dockUpgrades.careening, dockUpgrades.dryDock]
        },
        {
            id: 'persians3',
            description: 'Knights have +2 attack against archers',
            effectType: EffectType.miscallenous,
            value: 2,
            affectedUnits: [stableUnits.paladin],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman]),
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
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant]),
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
            monasteryUpgrade.herbalMedecine,
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
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
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
            townCenterUpgrade.townPatrol
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
