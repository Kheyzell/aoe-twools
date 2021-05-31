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
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";
import crest from '../../resources/images/crests/aztecs.png'
import { Bonus, EffectType } from "../../models/bonus.model";
import { getAllCivMilitaryUnits } from "../../utils/techs.utils";

export const aztecsUniqueUnits: { jaguarWarrior: Unit, eliteJaguarWarrior: Unit } = {
    jaguarWarrior: new Unit({
        id: 'jaguarWarrior',
        name: 'Jaguar Warrior',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 30,
            stone: 0
        },
        duration: 12
    }),
    eliteJaguarWarrior: new Unit({
        id: 'eliteJaguarWarrior',
        name: 'Elite Jaguar Warrior',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 30,
            stone: 0
        },
        duration: 12
    })
}

export const aztecsTechTree: CivTechTree = {
    id: 'aztecs',
    name: 'Aztecs',
    crest,
    wikiUrl: 'Aztecs_(Age_of_Empires_II)',
    bonuses: [],
    uniqueTechs: [
        {
            id: 'atlatl',
            name: 'Atlatl',
            description: 'Skirmishers +1 attack, +1 range',
            effectType: EffectType.miscallenous,
            value: null,
            cost: { wood: 0, food: 400, gold: 350, stone: 0 },
            duration: 40,
            affectedUnits: [archeryUnits.eliteSkirmisher],
            affectedUpgrades: []
        },
        {
            id: 'garlandWars',
            name: 'Garland Wars',
            description: '+4 infantry attack',
            effectType: EffectType.damage,
            value: 4,
            cost: { wood: 0, food: 450, gold: 750, stone: 0 },
            duration: 60,
            affectedUnits: [barracksUnits.champion, barracksUnits.pikeman, barracksUnits.eliteEagleWarrior, aztecsUniqueUnits.eliteJaguarWarrior],
            affectedUpgrades: []
        }
    ],
    barracks: {
        units: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
            new UnitLine([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        units: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: { units: [], upgrades: new UpgradePerAgeGroup([]) },
    siege: {
        units: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion]),
            new UnitLine([siegeUnits.siegeTower]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        units: [
            new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
            new UnitLine([aztecsUniqueUnits.jaguarWarrior, aztecsUniqueUnits.eliteJaguarWarrior]),
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
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
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
        ])
    },
    dock: {
        units: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

const bonuses: Bonus[] = [
    {
        id: 'aztecs1',
        description: 'Villagers carry +3 extra resources',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    },
    {
        id: 'aztecs2',
        description: 'All military units are created 11% faster',
        effectType: EffectType.creationSpeed,
        value: 11,
        affectedUnits: getAllCivMilitaryUnits(aztecsTechTree),
        affectedUpgrades: [],
        hideInUnitRecap: true
    },
    {
        id: 'aztecs3',
        description: 'Monks gain 5 HP for every researched Monastery technology',
        effectType: EffectType.miscallenous,
        value: 5,
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: []
    },
    {
        id: 'aztecs4',
        description: 'Start with +50 gold',
        effectType: EffectType.resourceGold,
        value: 50,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'aztecs5',
        description: 'Relics generate +33% gold',
        effectType: EffectType.miscallenous,
        value: 33,
        affectedUnits: [],
        affectedUpgrades: [],
        team: true
    }
]

aztecsTechTree.bonuses = bonuses