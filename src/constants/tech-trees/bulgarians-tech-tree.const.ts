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
import crest from '../../resources/images/crests/bulgarians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { AttackType, Unit } from "../../models/unit.model";

export const bulgariansUniqueUnits: { konnik: Unit, dismountedKonnik: Unit, eliteKonnik: Unit, eliteDismountedKonnik: Unit } = {
    konnik: new Unit({
        id: 'konnik',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 100,
            rateOfFire: 2.4 ,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 19
    }),
    dismountedKonnik: new Unit({
        id: 'dismountedKonnik',
        unique: true,
        age: 3,
        UnitType: UnitType.military,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 2.4,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 4, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .9,
            lineOfSight: 3,
        },
        duration: 0
    }),
    eliteKonnik: new Unit({
        id: 'eliteKonnik',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 120,
            rateOfFire: 2.4 ,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 19
    }),
    eliteDismountedKonnik: new Unit({
        id: 'eliteDismountedKonnik',
        unique: true,
        age: 3,
        UnitType: UnitType.military,
        cost: {
            wood: 0,
            food: 0,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 2.4,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 13, type: ArmorType.melee },
                { value: 4, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .9,
            lineOfSight: 3,
        },
        duration: 0
    }),
}

const uniqueUnitLine = new UnitLine([bulgariansUniqueUnits.konnik, bulgariansUniqueUnits.eliteKonnik])
const cavalryUpgrades = [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
]
setAffectingUpgrades(uniqueUnitLine, cavalryUpgrades)
const infantryUpgrades = [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson,
]
bulgariansUniqueUnits.dismountedKonnik.affectingUpgrades = infantryUpgrades
bulgariansUniqueUnits.eliteDismountedKonnik.affectingUpgrades = infantryUpgrades
chainTechs([bulgariansUniqueUnits.konnik, bulgariansUniqueUnits.dismountedKonnik, bulgariansUniqueUnits.eliteKonnik, bulgariansUniqueUnits.eliteDismountedKonnik])

const uniqueTechs = [
    new UniqueTech({
        id: 'stirrups',
        age: 3,
        effectType: EffectType.fireRate,
        value: 33,
        cost: { wood: 0, food: 400, gold: 200, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.multiplyAttackRate(1.33)
            }
        }],
        duration: 35,
        affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar, stableUnits.knight, stableUnits.cavalier, bulgariansUniqueUnits.konnik, bulgariansUniqueUnits.eliteKonnik],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'bagains',
        age: 4,
        effectType: EffectType.meleeArmor,
        value: 5,
        cost: { wood: 0, food: 900, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(5, ArmorType.melee)
            }
        }],
        duration: 40,
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman],
        affectedUpgrades: []
    })
]

export const bulgariansTechTree: CivTechTree = {
    id: 'bulgarians',
    crest,
    wikiUrl: 'Bulgarians',
    bonuses: [
        {
            id: 'bulgarians1',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [barracksUnits.twoHandedSwordsman],
            affectedUpgrades: []
        },
        {
            id: 'bulgarians2',
            effectType: EffectType.discoutWood,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'bulgarians3',
            effectType: EffectType.uniqueBuilding,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'bulgarians4',
            effectType: EffectType.discoutFood,
            value: 50,
            affectedUnits: [siegeUnits.siegeRam, siegeUnits.siegeOnager, siegeUnits.heavyScorpion],
            affectedUpgrades: [blacksmithUpgrades.blastFurnace, blacksmithUpgrades.plateMailArmor, blacksmithUpgrades.plateBardingArmor, blacksmithUpgrades.bracer, blacksmithUpgrades.leatherArcherArmor]
        },
        {
            id: 'bulgarians5',
            effectType: EffectType.creationSpeed,
            value: 80,
            affectedUnits: [],
            affectedUpgrades: [blacksmithUpgrades.blastFurnace, blacksmithUpgrades.plateMailArmor, blacksmithUpgrades.plateBardingArmor, blacksmithUpgrades.bracer, blacksmithUpgrades.leatherArcherArmor],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.conscription, castleUpgrades.spies])
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
            monasteryUpgrade.heresy,
            monasteryUpgrade.fervor,
            monasteryUpgrade.illumination,
            monasteryUpgrade.theocracy,
        ])
    },
    university: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
            universityUpgrades.keep,
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
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, bulgariansTechTree)
setCivOnUniqueTechs(bulgariansTechTree.bonuses, bulgariansTechTree)