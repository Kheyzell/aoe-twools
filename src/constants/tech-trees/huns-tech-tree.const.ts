import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
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
import crest from '../../resources/images/crests/huns.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber, addNumber } from "../../utils/utils";
import { AttackType, Unit } from "../../models/unit.model";

export const hunsUniqueUnits: { tarkan: Unit, eliteTarkan: Unit } = {
    tarkan: new Unit({
        id: 'tarkan',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 100,
            rateOfFire: 2.1,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 12, type: ArmorType.stoneDefense },
                { value: 10, type: ArmorType.castle },
                { value: 8, type: ArmorType.building },
                { value: 8, type: ArmorType.wallAndGate },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 14
    }),
    eliteTarkan: new Unit({
        id: 'eliteTarkan',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 150,
            rateOfFire: 2.1,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 11, type: ArmorType.melee },
                { value: 12, type: ArmorType.stoneDefense },
                { value: 10, type: ArmorType.castle },
                { value: 10, type: ArmorType.building },
                { value: 10, type: ArmorType.wallAndGate },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.35,
            lineOfSight: 7
        },
        duration: 14
    })
}

chainTechs([hunsUniqueUnits.tarkan, hunsUniqueUnits.eliteTarkan])
const uniqueUnitLine = new UnitLine([hunsUniqueUnits.tarkan, hunsUniqueUnits.eliteTarkan])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

const uniqueTechs = [
    new UniqueTech({
        id: 'marauders',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 300, food: 0, gold: 200, stone: 0 },
        duration: 40,
        affectedUnits: [hunsUniqueUnits.tarkan, hunsUniqueUnits.eliteTarkan],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'atheism',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 500, gold: 500, stone: 0 },
        duration: 60,
        affectedUnits: [],
        affectedUpgrades: []
    })
]

export const hunsTechTree: CivTechTree = {
    id: 'huns',
    crest,
    wikiUrl: 'Huns',
    bonuses: [
        {
            id: 'huns1',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'huns2',
            effectType: EffectType.discount,
            value: { age3: 10, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.20))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.20))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.20))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.20))
                    } else {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.10))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.10))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.10))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.10))
                    }
                }
            }],
            affectedUnits: [archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: []
        },
        {
            id: 'huns3',
            effectType: EffectType.accuracy,
            value: 30,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.accuracy! = Math.min(multiplyNumber(unit.stats.accuracy!, 30), 1)
            }
        }],
            affectedUnits: [castleUnits.trebuchet],
            affectedUpgrades: []
        },
        {
            id: 'huns4',
            effectType: EffectType.creationSpeed,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.2)
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar, stableUnits.knight, stableUnits.cavalier, stableUnits.paladin, hunsUniqueUnits.tarkan, hunsUniqueUnits.eliteTarkan],
            affectedUpgrades: [stableUpgrades.bloodlines, stableUpgrades.husbandry],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel]),
            new UnitLine([siegeUnits.scorpion]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
        ])
    },
    university: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.ballistics,
            universityUpgrades.murderHoles,
            universityUpgrades.chemistry,
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
            marketUpgrade.guilds,
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, hunsTechTree)
setCivOnUniqueTechs(hunsTechTree.bonuses, hunsTechTree)