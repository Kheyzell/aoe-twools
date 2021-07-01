import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES, RegenCapacity } from "../../models/capacity.model";
import { UnitType, EffectOrder, ArmorType, CivTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/vikings.png';
import { chainTechs, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber, addNumber } from "../../utils/utils";
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
import { stableUnits } from "../techs/stable-techs.const";
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

export const vikingsUniqueUnits: { berserk: Unit, eliteBerserk: Unit, longboat: Unit, eliteLongboat: Unit } = {
    berserk: new Unit({
        id: 'berserk',
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

const uniqueTechs = [
    new UniqueTech({
        id: 'chieftains',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 700, gold: 500, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(5, ArmorType.cavalry)
                unit.addAttackComponent(4, ArmorType.camel)
            }
        }],
        duration: 40,
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion, barracksUnits.spearman, barracksUnits.pikeman, vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'berserkergang',
        age: 4,
        effectType: EffectType.regen,
        value: 40,
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addCapacity({ ...CAPACITIES.regen, healthPerMinute: 40 } as RegenCapacity)
            }
        }],
        cost: { wood: 0, food: 850, gold: 400, stone: 0 },
        duration: 40,
        affectedUnits: [vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk],
        affectedUpgrades: []
    })
]

chainTechs([vikingsUniqueUnits.longboat, vikingsUniqueUnits.eliteLongboat])

export const vikingsTechTree: CivTechTree = {
    id: 'vikings',
    crest,
    wikiUrl: 'Vikings',
    bonuses: [
        {
            id: 'vikings1',
            effectType: EffectType.discount,
            value: { age2: 15, age3: 15, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.casteAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.2))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.2))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.2))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.2))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.casteAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.15))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.15))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.15))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.15))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.15))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.15))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.15))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.15))
                    }
                }
            }],
            affectedUnits: [dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon,
                vikingsUniqueUnits.longboat, vikingsUniqueUnits.eliteLongboat],
            affectedUpgrades: []
        },
        {
            id: 'vikings2',
            effectType: EffectType.healthPercent,
            value: { age2: 10, age3: 15, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.casteAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.stats.health = multiplyNumber(unit.stats.health, 1.2)
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.casteAge.id)) {
                        unit.stats.health = multiplyNumber(unit.stats.health, 1.15)
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.stats.health = multiplyNumber(unit.stats.health, 1.1)
                    }
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman,
                vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk],
            affectedUpgrades: []
        },
        {
            id: 'vikings3',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart]
        },
        {
            id: 'vikings4',
            effectType: EffectType.discount,
            value: 15,
            affectedUnits: [],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk]),
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
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.heresy,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.blockPrinting,
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
        ])
    },
    market: {
        unitLines: [new UnitLine([marketUnits.tradeCart])],
        upgrades: new UpgradePerAgeGroup([
            marketUpgrade.coinage,
            marketUpgrade.caravan,
            marketUpgrade.banking,
        ])
    },
    dock: {
        unitLines: [
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

setCivOnUniqueTechs(uniqueTechs, vikingsTechTree)
setCivOnUniqueTechs(vikingsTechTree.bonuses, vikingsTechTree)