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
import crest from '../../resources/images/crests/hindustanis.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber, addNumber } from "../../utils/utils";
import { AttackType, Unit } from "../../models/unit.model";
import { CAPACITIES } from "../../models/capacity.model";

export const hindustanisUniqueUnits: { ghulam: Unit, eliteGhulam: Unit, imperialCamelRider: Unit } = {
    ghulam: new Unit({
        id: 'ghulam',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 30,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 5, type: ArmorType.archer },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.15,
            lineOfSight: 6,
            capacities: [CAPACITIES.attackPassThrough]
        },
        duration: 12
    }),
    eliteGhulam: new Unit({
        id: 'eliteGhulam',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 30,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 65,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 6, type: ArmorType.archer },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.2,
            lineOfSight: 6,
            capacities: [CAPACITIES.attackPassThrough]
        },
        duration: 12
    }),
    imperialCamelRider: new Unit({
        id: 'imperialCamelRider',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 140,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 18, type: ArmorType.cavalry },
                { value: 9, type: ArmorType.camel },
                { value: 9, type: ArmorType.ship },
                { value: 9, type: ArmorType.fishingShip },
                { value: 7, type: ArmorType.mameluke },
                { value: 4, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.camel },
            ],
            movementSpeed: 1.45,
            lineOfSight: 5
        },
        duration: 20
    })
}

chainTechs([hindustanisUniqueUnits.ghulam, hindustanisUniqueUnits.eliteGhulam])
const uniqueUnitLine = new UnitLine([hindustanisUniqueUnits.ghulam, hindustanisUniqueUnits.eliteGhulam])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson,])

chainTechs([stableUnits.camelRider, stableUnits.heavyCamelRider, hindustanisUniqueUnits.imperialCamelRider])
const camelLine = new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider, hindustanisUniqueUnits.imperialCamelRider])
setAffectingUpgrades(camelLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

const uniqueTechs = [
    new UniqueTech({
        id: 'sultans',
        age: 3,
        effectType: EffectType.miscallenous,
        value: 10,
        cost: { wood: 400, food: 400, gold: 0, stone: 0 },
        duration: 40,
        affectedUnits: [townCenterUnits.villager, marketUnits.tradeCart, dockUnits.tradeCog],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'shatagni',
        age: 4,
        effectType: EffectType.range,
        value: 1,
        cost: { wood: 0, food: 500, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.range! += 2
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.handCannoneer],
        affectedUpgrades: []
    })
]

export const hindustanisTechTree: CivTechTree = {
    id: 'hindustanis',
    crest,
    wikiUrl: 'Hindustanis',
    bonuses: [
        {
            id: 'hindustanis1',
            effectType: EffectType.discount,
            value: { age1: 10, age2: 15, age3: 20, age4: 25 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.25))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.25))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.25))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.25))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.20))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.20))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.20))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.20))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.15))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.15))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.15))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.15))
                    } else {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.10))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.10))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.10))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.10))
                    }
                }
            }],
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'hindustanis2',
            effectType: EffectType.fireRate,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.multiplyAttackRate(1.25)
                }
            }],
            affectedUnits: [stableUnits.camelRider, stableUnits.heavyCamelRider, hindustanisUniqueUnits.imperialCamelRider],
            affectedUpgrades: []
        },
        {
            id: 'hindustanis3',
            effectType: EffectType.armor,
            value: 1,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addArmorComponent(1, ArmorType.melee)
                    unit.addArmorComponent(1, ArmorType.pierce)
                }
            }],
            affectedUnits: [archeryUnits.handCannoneer],
            affectedUpgrades: []
        },
        {
            id: 'hindustanis4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'hindustanis5',
            effectType: EffectType.miscallenous,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addAttackComponent(2, ArmorType.standardBuilding)
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar,
                stableUnits.camelRider, stableUnits.heavyCamelRider, hindustanisUniqueUnits.imperialCamelRider],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman,]),
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
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            camelLine
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.armoredElephant, siegeUnits.siegeElephant]),
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
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
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
            universityUpgrades.murderHoles,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
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
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, hindustanisTechTree)
setCivOnUniqueTechs(hindustanisTechTree.bonuses, hindustanisTechTree)