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
import crest from '../../resources/images/crests/tatars.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { CAPACITIES, GenerateGoldWhenFightingCapacity } from "../../models/capacity.model";

export const tatarsUniqueUnits: { keshik: Unit, eliteKeshik: Unit, flamingCamel: Unit } = {
    keshik: new Unit({
        id: 'keshik',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 110,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 9, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.4,
            lineOfSight: 5,
            capacities: [{ ...CAPACITIES.generateGoldWhenFighting, goldPerSecond: .367 } as GenerateGoldWhenFightingCapacity]
        },
        duration: 17
    }),
    eliteKeshik: new Unit({
        id: 'eliteKeshik',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 140,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 11, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.4,
            lineOfSight: 5,
            capacities: [{ ...CAPACITIES.generateGoldWhenFighting, goldPerSecond: .367 } as GenerateGoldWhenFightingCapacity]
        },
        duration: 15
    }),
    flamingCamel: new Unit({
        id: 'flamingCamel',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 75,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 50,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 20, type: ArmorType.melee },
                { value: 200, type: ArmorType.building },
                { value: 50, type: ArmorType.cavalry },
                { value: 50, type: ArmorType.camel },
                { value: 130, type: ArmorType.warElephant },
                { value: 25, type: ArmorType.siegeWeapon },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
            ],
            movementSpeed: .8,
            lineOfSight: 4,
            capacities: [CAPACITIES.selfDestruction]
        },
        duration: 20
    })
}

chainTechs([tatarsUniqueUnits.keshik, tatarsUniqueUnits.eliteKeshik])
const uniqueUnitLine = new UnitLine([tatarsUniqueUnits.keshik, tatarsUniqueUnits.eliteKeshik])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

const flamingCamelLine = new UnitLine([tatarsUniqueUnits.flamingCamel])
setAffectingUpgrades(flamingCamelLine, [stableUpgrades.bloodlines, stableUpgrades.husbandry,
    universityUpgrades.siegeEngineers])
    

const uniqueTechs = [
    new UniqueTech({
        id: 'silkArmor',
        age: 3,
        effectType: EffectType.armor,
        value: 1,
        cost: { wood: 400, food: 0, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(1, ArmorType.pierce)
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar, stableUnits.steppeLancer, stableUnits.eliteSteppeLancer, archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'timuridSiegecraft',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 400, food: 0, gold: 500, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                if (unit.id === castleUnits.trebuchet.id) {
                    unit.stats.range! += 2
                }
            }
        }],
        duration: 50,
        affectedUnits: [castleUnits.trebuchet, tatarsUniqueUnits.flamingCamel],
        affectedUpgrades: []
    })
]

export const tatarsTechTree: CivTechTree = {
    id: 'tatars',
    crest,
    wikiUrl: 'Tatars',
    bonuses: [
        {
            id: 'tatars1',
            effectType: EffectType.miscallenous,
            value: 50,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'tatars2',
            effectType: EffectType.miscallenous,
            value: 25,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'tatars3',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [archeryUpgrades.parthianTactis, archeryUpgrades.thumbRing]
        },
        {
            id: 'tatars4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'tatars5',
            effectType: EffectType.lineOfSight,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.stats.lineOfSight = unit.stats.lineOfSight + 2
                }
            }],
            affectedUnits: [archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: [],
            team: true
        },
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
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
            new UnitLine([stableUnits.steppeLancer, stableUnits.eliteSteppeLancer]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
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
            flamingCamelLine,
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.fervor,
            monasteryUpgrade.illumination,
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
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, tatarsTechTree)
setCivOnUniqueTechs(tatarsTechTree.bonuses, tatarsTechTree)