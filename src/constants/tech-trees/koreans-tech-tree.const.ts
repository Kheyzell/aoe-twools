import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
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
import crest from '../../resources/images/crests/koreans.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber, addNumber } from "../../utils/utils";

export const koreansUniqueUnits: { warWagon: Unit, eliteWarWagon: Unit, turtleShip: Unit, eliteTurtleShip: Unit } = {
    warWagon: new Unit({
        id: 'warWagon',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 125,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 150,
            rateOfFire: 2.5,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: 1,
            attackComponents: [
                { value: 9, type: ArmorType.pierce },
                { value: 5, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: -1, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.2,
            lineOfSight: 7,
        },
        duration: 21
    }),
    eliteWarWagon: new Unit({
        id: 'eliteWarWagon',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 125,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 200,
            rateOfFire: 2.5,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: 1,
            attackComponents: [
                { value: 9, type: ArmorType.pierce },
                { value: 5, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: -1, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.2,
            lineOfSight: 8,
        },
        duration: 21
    }),
    turtleShip: new Unit({
        id: 'turtleShip',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 190,
            food: 0,
            gold: 180,
            stone: 0
        },
        stats: {
            health: 200,
            rateOfFire: 6,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            attackComponents: [
                { value: 50, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 6, type: ArmorType.melee },
                { value: 5, type: ArmorType.pierce },
                { value: 8, type: ArmorType.ship },
                { value: 0, type: ArmorType.turtleShip },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .9,
            lineOfSight: 8,
        },
        duration: 50
    }),
    eliteTurtleShip: new Unit({
        id: 'eliteTurtleShip',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 190,
            food: 0,
            gold: 180,
            stone: 0
        },
        stats: {
            health: 300,
            rateOfFire: 6,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            attackComponents: [
                { value: 50, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 11, type: ArmorType.ship },
                { value: 1, type: ArmorType.turtleShip },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.035,
            lineOfSight: 8,
        },
        duration: 50
    })
}

chainTechs([koreansUniqueUnits.warWagon, koreansUniqueUnits.eliteWarWagon])
const uniqueUnitLine = new UnitLine([koreansUniqueUnits.warWagon, koreansUniqueUnits.eliteWarWagon])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    stableUpgrades.husbandry,
    universityUpgrades.ballistics, universityUpgrades.chemistry
])
chainTechs([koreansUniqueUnits.turtleShip, koreansUniqueUnits.eliteTurtleShip])
const turtleShipLine = new UnitLine([koreansUniqueUnits.turtleShip, koreansUniqueUnits.eliteTurtleShip])
setAffectingUpgrades(turtleShipLine, [dockUpgrades.careening, dockUpgrades.dryDock, dockUpgrades.shipwright])

const uniqueTechs = [
    new UniqueTech({
        id: 'eupseong',
        age: 3,
        effectType: EffectType.range,
        value: 2,
        cost: { wood: 300, food: 300, gold: 0, stone: 0 },
        duration: 40,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'shinkichon',
        age: 4,
        effectType: EffectType.range,
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.range! += 1
            }
        }],
        value: 1,
        cost: { wood: 800, food: 0, gold: 500, stone: 0 },
        duration: 60,
        affectedUnits: [siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager],
        affectedUpgrades: []
    })
]

export const koreansTechTree: CivTechTree = {
    id: 'koreans',
    crest,
    wikiUrl: 'Koreans',
    bonuses: [
        {
            id: 'koreans1',
            effectType: EffectType.lineOfSight,
            value: 3,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.stats.lineOfSight = unit.stats.lineOfSight + 3
                }
            }],
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'koreans2',
            effectType: EffectType.miscallenous,
            value: 20,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'koreans3',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [universityUpgrades.guardTower, universityUpgrades.keep, universityUpgrades.bombardTower]
        },
        {
            id: 'koreans4',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor]
        },
        {
            id: 'koreans5',
            effectType: EffectType.discoutWood,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.20))
                }
            }],
            affectedUnits: [barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester,
                archeryUnits.skirmisher, archeryUnits.eliteSkirmisher,
                archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher,
                dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon,
                koreansUniqueUnits.turtleShip, koreansUniqueUnits.eliteTurtleShip],
            affectedUpgrades: []
        },
        {
            id: 'koreans6',
            effectType: EffectType.minimumRange,
            value: 1,
            affectedUnits: [siegeUnits.siegeOnager],
            affectedUpgrades: [],
            team: true
        },
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
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.herbalMedecine,
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
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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
            new UnitLine([dockUnits.tradeCog]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
            turtleShipLine
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, koreansTechTree)
setCivOnUniqueTechs(koreansTechTree.bonuses, koreansTechTree)