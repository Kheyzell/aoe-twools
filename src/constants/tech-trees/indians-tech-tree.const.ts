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
import crest from '../../resources/images/crests/indians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber, addNumber } from "../../utils/utils";
import { Unit } from "../../models/unit.model";

export const indiansUniqueUnits: { elephantArcher: Unit, eliteElephantArcher: Unit, imperialCamelRider: Unit } = {
    elephantArcher: new Unit({
        id: 'elephantArcher',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 70,
            stone: 0
        },
        duration: 25
    }),
    eliteElephantArcher: new Unit({
        id: 'eliteElephantArcher',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 70,
            stone: 0
        },
        duration: 25
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
        duration: 20
    })
}

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
                unit.stats.range! += 1
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.handCannoneer],
        affectedUpgrades: []
    })
]

export const indiansTechTree: CivTechTree = {
    id: 'indians',
    crest,
    wikiUrl: 'Indians_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'indians1',
            effectType: EffectType.miscallenous,
            value: 10,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'indians2',
            effectType: EffectType.discount,
            value: { age1: 10, age2: 15, age3: 20, age4: 25 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.casteAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.25))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.25))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.25))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.25))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.casteAge.id)) {
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
            id: 'indians3',
            effectType: EffectType.pierceArmor,
            value: { age3: 1, age4: 2 },
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    unit.addArmorComponent(1, ArmorType.pierce)                    
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.addArmorComponent(1, ArmorType.pierce)
                    }
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar, stableUnits.camelRider, stableUnits.heavyCamelRider, indiansUniqueUnits.imperialCamelRider],
            affectedUpgrades: []
        },
        {
            id: 'indians4',
            effectType: EffectType.miscallenous,
            value: 4,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addAttackComponent(4, ArmorType.standardBuilding)
                }
            }],
            affectedUnits: [stableUnits.camelRider, stableUnits.heavyCamelRider, indiansUniqueUnits.imperialCamelRider],
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
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider, indiansUniqueUnits.imperialCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([indiansUniqueUnits.elephantArcher, indiansUniqueUnits.eliteElephantArcher]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
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
            universityUpgrades.heatedShot,
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

setCivOnUniqueTechs(uniqueTechs, indiansTechTree)
setCivOnUniqueTechs(indiansTechTree.bonuses, indiansTechTree)