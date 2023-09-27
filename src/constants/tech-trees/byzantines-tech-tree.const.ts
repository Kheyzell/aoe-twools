import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES, CapacityId, ChargedAttackCapacity, HealingCapacity } from "../../models/capacity.model";
import { UnitType, EffectOrder, CivTechTree, UnitLine, UpgradePerAgeGroup, ArmorType } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/byzantines.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addNumber, multiplyNumber } from "../../utils/utils";
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

export const byzantinesUniqueUnits: { cataphract: Unit, eliteCataphract: Unit } = {
    cataphract: new Unit({
        id: 'cataphract',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 110,
            rateOfFire: 1.8,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 9, type: ArmorType.melee },
                { value: 9, type: ArmorType.infantry },
                { value: 9, type: ArmorType.condottiero },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 12, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.35,
            lineOfSight: 4
        },
        duration: 20
    }),
    eliteCataphract: new Unit({
        id: 'eliteCataphract',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 150,
            rateOfFire: 1.7,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 12, type: ArmorType.infantry },
                { value: 10, type: ArmorType.condottiero },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 16, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 20
    })
}

chainTechs([byzantinesUniqueUnits.cataphract, byzantinesUniqueUnits.eliteCataphract])
const uniqueUnitLine = new UnitLine([byzantinesUniqueUnits.cataphract, byzantinesUniqueUnits.eliteCataphract])
const cavalryUpgrades = [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.husbandry,
]
setAffectingUpgrades(uniqueUnitLine, cavalryUpgrades)

const uniqueTechs = [
    new UniqueTech({
        id: 'greekFire',
        age: 3,
        effectType: EffectType.range,
        value: 1,
        cost: { wood: 0, food: 250, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.range! += 1
            }
        }],
        duration: 40,
        affectedUnits: [dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'logistica',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 800, gold: 600, stone: 0 },
        duration: 50,
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(6, ArmorType.infantry)
                unit.stats.capacities.push(CAPACITIES.trampleLogistica)
            }
        }],
        affectedUnits: [byzantinesUniqueUnits.cataphract, byzantinesUniqueUnits.eliteCataphract],
        affectedUpgrades: []
    })
]

export const byzantinesTechTree: CivTechTree = {
    id: 'byzantines',
    crest,
    wikiUrl: 'Byzantines',
    bonuses: [
        {
            id: 'byzantines1',
            effectType: EffectType.healthPercent,
            value: { age1: 10, age2: 20, age3: 30, age4: 40 },
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'byzantines2',
            effectType: EffectType.discount,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.25))
                    unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.25))
                    unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.25))
                    unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.25))
                }
            }],
            affectedUnits: [barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, stableUnits.camelRider, stableUnits.heavyCamelRider],
            affectedUpgrades: []
        },
        {
            id: 'byzantines3',
            effectType: EffectType.fireRate,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.multiplyAttackRate(1.25)
                }
            }],
            affectedUnits: [dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip],
            affectedUpgrades: []
        },
        {
            id: 'byzantines4',
            effectType: EffectType.discount,
            value: 33,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.imperialAge]
        },
        {
            id: 'byzantines5',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.townWatch, townCenterUpgrade.townPatrol]
        },
        {
            id: 'byzantines6',
            effectType: EffectType.miscallenous,
            value: 50,
            effects: [{
                order: EffectOrder.first,
                apply: unit => {
                    const healingCapacity = unit.getCapacity(CapacityId.healing) as HealingCapacity
                    if (healingCapacity) {
                        healingCapacity.healthPerMinute = multiplyNumber(healingCapacity.healthPerMinute, 2)
                    }
                }
            }],
            affectedUnits: [monasteryUnits.monk],
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
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            uniqueUnitLine,
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
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
            universityUpgrades.fortifiedWall,
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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
            miningCampUpgrades.goldShaftMining,
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
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, byzantinesTechTree)
setCivOnUniqueTechs(byzantinesTechTree.bonuses, byzantinesTechTree)