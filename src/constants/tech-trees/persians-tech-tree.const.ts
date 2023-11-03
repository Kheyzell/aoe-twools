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
import crest from '../../resources/images/crests/persians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber } from "../../utils/utils";

export const persiansUniqueUnits: { warElephant: Unit, eliteWarElephant: Unit, savar: Unit } = {
    warElephant: new Unit({
        id: 'warElephant',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 170,
            gold: 85,
            stone: 0
        },
        stats: {
            health: 450,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 15, type: ArmorType.melee },
                { value: 30, type: ArmorType.building },
                { value: 30, type: ArmorType.stoneDefense },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.warElephant },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .8,
            lineOfSight: 7
        },
        duration: 25
    }),
    eliteWarElephant: new Unit({
        id: 'eliteWarElephant',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 170,
            gold: 85,
            stone: 0
        },
        stats: {
            health: 600,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 20, type: ArmorType.melee },
                { value: 30, type: ArmorType.building },
                { value: 30, type: ArmorType.stoneDefense },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.warElephant },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .8,
            lineOfSight: 8
        },
        duration: 25
    }),
    savar: new Unit({
        id: 'savar',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 75,
            stone: 0
        },
        stats: {
            health: 145,
            rateOfFire: 1.8,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry }
            ],
            movementSpeed: 1.35,
            lineOfSight: 5
        },
        duration: 30
    }),
}

chainTechs([persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant])
const uniqueUnitLine = new UnitLine([persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

chainTechs([stableUnits.knight, stableUnits.cavalier, persiansUniqueUnits.savar])
const knightLine = new UnitLine([stableUnits.knight, stableUnits.cavalier, persiansUniqueUnits.savar])
setAffectingUpgrades(knightLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

const uniqueTechs = [
    new UniqueTech({
        id: 'kamandaran',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 400, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.cost.wood = unit.cost.wood + unit.cost.gold
                unit.cost.gold = 0
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'citadels',
        age: 4,
        effectType: EffectType.miscallenous,
        value: { reduceDamage: 25, bulletDamage: 4, bonusInfantry: 3, bonusRam: 3 },
        cost: { wood: 600, food: 0, gold: 300, stone: 0 },
        duration: 50,
        affectedUnits: [],
        affectedUpgrades: []
    })
]

export const persiansTechTree: CivTechTree = {
    id: 'persians',
    crest,
    wikiUrl: 'Persians_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'persians1',
            effectType: EffectType.miscallenous,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'persians2',
            effectType: EffectType.creationSpeed,
            value: { age1: 5, age2: 10, age3: 15, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.duration = multiplyNumber(unit.duration, 1/1.2)
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.duration = multiplyNumber(unit.duration, 1/1.15)
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.duration = multiplyNumber(unit.duration, 1/1.1)
                    } else {
                        unit.duration = multiplyNumber(unit.duration, 1/1.05)
                    }
                }
            }],
            affectedUnits: [townCenterUnits.villager,
                dockUnits.fishingShip,
                dockUnits.transportShip,
                dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip,
                dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon],
            affectedUpgrades: [townCenterUpgrade.feudalAge, townCenterUpgrade.loom, townCenterUpgrade.castleAge, townCenterUpgrade.wheelbarrow, townCenterUpgrade.townWatch, townCenterUpgrade.imperialAge, townCenterUpgrade.handCart, townCenterUpgrade.townPatrol, dockUpgrades.gillnets, dockUpgrades.careening, dockUpgrades.dryDock]
        },
        {
            id: 'persians3',
            effectType: EffectType.miscallenous,
            value: 5,
            effects: [ /* @TODO generate gold on kill */ ],
            affectedUnits: [
                stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar,
                stableUnits.knight, stableUnits.cavalier, persiansUniqueUnits.savar,
                stableUnits.camelRider, stableUnits.heavyCamelRider,
                persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant,
            ],
            affectedUpgrades: []
        },
        {
            id: 'persians4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: [archeryUpgrades.parthianTactis]
        },
        {
            id: 'persians5',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'persians6',
            effectType: EffectType.miscallenous,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    unit.addAttackComponent(2, ArmorType.archer)
                }
            }],
            affectedUnits: [stableUnits.knight, stableUnits.cavalier, persiansUniqueUnits.savar],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
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
            knightLine,
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant]),
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
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.herbalMedecine,
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
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
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
            townCenterUpgrade.townPatrol
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
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, persiansTechTree)
setCivOnUniqueTechs(persiansTechTree.bonuses, persiansTechTree)