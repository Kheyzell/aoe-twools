import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES, RegenCapacity } from "../../models/capacity.model";
import { UnitType, EffectOrder, ArmorType, CivTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/vikings.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
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
        stats: {
            health: 54,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.05,
            lineOfSight: 3,
        },
        capacities: [{ ...CAPACITIES.regen, healthPerMinute: 20 } as RegenCapacity],
        duration: 12
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
        stats: {
            health: 62,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee },
                { value: 3, type: ArmorType.eagleWarrior },
                { value: 3, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.05,
            lineOfSight: 5,
        },
        capacities: [{ ...CAPACITIES.regen, healthPerMinute: 40 } as RegenCapacity],
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
        stats: {
            health: 130,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            attackComponents: [
                { value: 7, type: ArmorType.pierce },
                { value: 9, type: ArmorType.ship },
                { value: 9, type: ArmorType.fishingShip },
                { value: 7, type: ArmorType.building },
                { value: 4, type: ArmorType.ram },
            ],
            secondaryAttack: {
                count: 4,
                accuracy: 1,
                components: [
                    { value: 1, type: ArmorType.pierce },
                    { value: 1, type: ArmorType.camel },
                ]
            },
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.54,
            lineOfSight: 8,
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
        stats: {
            health: 160,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 7,
            accuracy: 1,
            attackComponents: [
                { value: 8, type: ArmorType.pierce },
                { value: 10, type: ArmorType.ship },
                { value: 11, type: ArmorType.fishingShip },
                { value: 7, type: ArmorType.building },
                { value: 4, type: ArmorType.ram },
            ],
            secondaryAttack: {
                count: 4,
                accuracy: 1,
                components: [
                    { value: 1, type: ArmorType.pierce },
                    { value: 1, type: ArmorType.camel },
                ]
            },
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.54,
            lineOfSight: 9,
        },
        duration: 25
    })
}

chainTechs([vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk])
const uniqueUnitLine = new UnitLine([vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])
chainTechs([vikingsUniqueUnits.longboat, vikingsUniqueUnits.eliteLongboat])
const longboatLine = new UnitLine([vikingsUniqueUnits.longboat, vikingsUniqueUnits.eliteLongboat])
setAffectingUpgrades(longboatLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    universityUpgrades.ballistics, universityUpgrades.chemistry,
    dockUpgrades.careening, dockUpgrades.dryDock])

const uniqueTechs = [
    new UniqueTech({
        id: 'chieftains',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 600, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(5, ArmorType.cavalry)
                unit.addAttackComponent(4, ArmorType.camel)

                // @TODO generate gold on kill
            }
        }],
        duration: 40,
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion, barracksUnits.spearman, barracksUnits.pikeman, vikingsUniqueUnits.berserk, vikingsUniqueUnits.eliteBerserk],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'bogsveigar',
        age: 4,
        effectType: EffectType.damage,
        value: 1,
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(1, ArmorType.pierce)
            }
        }],
        cost: { wood: 0, food: 650, gold: 500, stone: 0 },
        duration: 40,
        affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, vikingsUniqueUnits.longboat, vikingsUniqueUnits.eliteLongboat],
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
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.2))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.2))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.2))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.2))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
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
            value: { age2: 20, age3: 20, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.stats.health = multiplyNumber(unit.stats.health, 1.2)
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
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
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
            new UnitLine([dockUnits.tradeCog]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
            longboatLine
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