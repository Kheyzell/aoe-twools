import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/franks.png';
import { setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";
import { archeryUnits } from "../techs/archery-techs.const";
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

export const franksUniqueUnits: { throwingAxeman: Unit, eliteThrowingAxeman: Unit } = {
    throwingAxeman: new Unit({
        id: 'throwingAxeman',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 25,
            stone: 0
        },
        duration: 17
    }),
    eliteThrowingAxeman: new Unit({
        id: 'eliteThrowingAxeman',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 25,
            stone: 0
        },
        duration: 17
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'beardedAxe',
        age: 3,
        effectType: EffectType.range,
        value: 1,
        cost: { wood: 0, food: 300, gold: 300, stone: 0 },
        duration: 60,
        affectedUnits: [franksUniqueUnits.throwingAxeman, franksUniqueUnits.eliteThrowingAxeman],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'chivalry',
        age: 4,
        effectType: EffectType.creationSpeed,
        value: 40,
        cost: { wood: 600, food: 0, gold: 500, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.duration = multiplyNumber(unit.duration, 1/1.40)
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.knight, stableUnits.cavalier, stableUnits.paladin],
        affectedUpgrades: [stableUpgrades.husbandry]
    })
]

export const franksTechTree: CivTechTree = {
    id: 'franks',
    crest,
    wikiUrl: 'Franks',
    bonuses: [
        {
            id: 'franks1',
            effectType: EffectType.freeUpgrade,
            value: 18,
            affectedUnits: [],
            affectedUpgrades: [millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation]
        },
        {
            id: 'franks2',
            effectType: EffectType.discount,
            value: 25,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'franks3',
            effectType: EffectType.healthPercent,
            value: { age2: 20, age3: 20, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.health = multiplyNumber(unit.stats.health, 1.2)
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry,
                stableUnits.knight, stableUnits.cavalier, stableUnits.paladin,
                archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: []
        },
        {
            id: 'franks4',
            effectType: EffectType.miscallenous,
            value: 15,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'franks5',
            effectType: EffectType.lineOfSight,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.stats.lineOfSight = unit.stats.lineOfSight + 2
                }
            }],
            affectedUnits: [stableUnits.knight, stableUnits.cavalier, stableUnits.paladin],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([franksUniqueUnits.throwingAxeman, franksUniqueUnits.eliteThrowingAxeman]),
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
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
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
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
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
        ])
    },
    mill: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            millUpgrades.horseColar,
            millUpgrades.heavyPlow,
            millUpgrades.cropRotation
        ])
    },
    miningCamp: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
            miningCampUpgrades.goldShaftMining
        ])
    },
    market: {
        unitLines: [new UnitLine([marketUnits.tradeCart])],
        upgrades: new UpgradePerAgeGroup([
            marketUpgrade.coinage,
            marketUpgrade.caravan,
            marketUpgrade.banking
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon])
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, franksTechTree)
setCivOnUniqueTechs(franksTechTree.bonuses, franksTechTree)