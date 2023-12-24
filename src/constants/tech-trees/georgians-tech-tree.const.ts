import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES } from "../../models/capacity.model";
import { ArmorType, CivTechTree, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/georgians.webp';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
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

export const georgiansUniqueUnits: { monaspa: Unit, eliteMonaspa: Unit } = {
    monaspa: new Unit({
        id: 'monaspa',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 75,
            rateOfFire: 1.8,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            capacities: [CAPACITIES.monaspaGroupBonus],
            movementSpeed: 1.4,
            lineOfSight: 4
        },
        duration: 11
    }),
    eliteMonaspa: new Unit({
        id: 'eliteMonaspa',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 90,
            rateOfFire: 1.8,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 5, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            capacities: [CAPACITIES.monaspaGroupBonus],
            movementSpeed: 1.4,
            lineOfSight: 5
        },
        duration: 11
    }),
}

const uniqueUnitLine = new UnitLine([georgiansUniqueUnits.monaspa, georgiansUniqueUnits.eliteMonaspa])
const cavalryUpgrades = [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
]
setAffectingUpgrades(uniqueUnitLine, cavalryUpgrades)
chainTechs([georgiansUniqueUnits.monaspa, georgiansUniqueUnits.eliteMonaspa])

const uniqueTechs = [
    new UniqueTech({
        id: 'svanTowers',
        age: 3,
        effectType: EffectType.damage,
        value: 2,
        cost: { wood: 300, food: 0, gold: 200, stone: 0 },
        effects: [],
        duration: 45,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'aznauriCavalry',
        age: 4,
        effectType: EffectType.miscallenous,
        value: 15,
        cost: { wood: 0, food: 750, gold: 250, stone: 0 },
        duration: 45,
        affectedUnits: [
            stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar,
            stableUnits.knight, stableUnits.cavalier,
            georgiansUniqueUnits.monaspa, georgiansUniqueUnits.eliteMonaspa,
        ],
        affectedUpgrades: []
    })
]

const reduction = 20
const calculatedReduction = Math.round((1 - (1 - .25) * (1 - reduction / 100)) * 100)
export const georgiansTechTree: CivTechTree = {
    id: 'georgians',
    crest,
    wikiUrl: 'Georgians',
    bonuses: [
        {
            id: 'georgians1',
            effectType: EffectType.miscallenous,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'georgians2',
            effectType: EffectType.miscallenous,
            value: { work: 10, square: 19 },
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'georgians3',
            effectType: EffectType.miscallenous,
            value: { reduction, calculatedReduction },
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'georgians4',
            effectType: EffectType.regen,
            value: { feudal: 5, castle: 10, imperial: 15 },
            affectedUnits: [
                stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar,
                stableUnits.knight, stableUnits.cavalier,
                georgiansUniqueUnits.monaspa, georgiansUniqueUnits.eliteMonaspa,
            ],
            affectedUpgrades: []
        },
        {
            id: 'georgians5',
            effectType: EffectType.creationSpeed,
            value: 25,
            affectedUnits: [],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
            new UnitLine([archeryUnits.handCannoneer]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.parthianTactis])
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
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            uniqueUnitLine,
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.devotion,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            townCenterUpgrade.castleAge,
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
            new UnitLine([dockUnits.tradeCog]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, georgiansTechTree)
setCivOnUniqueTechs(georgiansTechTree.bonuses, georgiansTechTree)