import { EffectType, UniqueTech } from "../../models/bonus.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import { Upgrade } from "../../models/upgrade.model";
import crest from '../../resources/images/crests/incas.png';
import { chainTechs, getAllCivMilitaryUnits, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray } from "../../utils/utils";
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
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

export const incasUniqueUnits: { kamayuk: Unit, eliteKamayuk: Unit, slinger: Unit } = {
    kamayuk: new Unit({
        id: 'kamayuk',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 2,
            attackType: AttackType.melee,
            range: 1,
            attackComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 20, type: ArmorType.warElephant },
                { value: 8, type: ArmorType.cavalry },
                { value: 6, type: ArmorType.camel },
                { value: 1, type: ArmorType.mameluke }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1,
            lineOfSight: 4,
        },
        duration: 10
    }),
    eliteKamayuk: new Unit({
        id: 'eliteKamayuk',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 2,
            attackType: AttackType.melee,
            range: 1,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 20, type: ArmorType.warElephant },
                { value: 12, type: ArmorType.cavalry },
                { value: 10, type: ArmorType.camel },
                { value: 1, type: ArmorType.mameluke }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1,
            lineOfSight: 5,
        },
        duration: 10
    }),
    slinger: new Unit({
        id: 'slinger',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 40,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .9,
            attackComponents: [
                { value: 4, type: ArmorType.pierce },
                { value: 10, type: ArmorType.infantry },
                { value: 10, type: ArmorType.condottiero },
                { value: 3, type: ArmorType.ram },
                { value: 1, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 7,
        },
        duration: 25
    })
}

chainTechs([incasUniqueUnits.kamayuk, incasUniqueUnits.eliteKamayuk])
const uniqueUnitLine = new UnitLine([incasUniqueUnits.kamayuk, incasUniqueUnits.eliteKamayuk])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])
const slingerLine = new UnitLine([incasUniqueUnits.slinger])
setAffectingUpgrades(slingerLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const uniqueTechs = [
    new UniqueTech({
        id: 'andeanSling',
        age: 3,
        effectType: EffectType.minimumRange,
        value: 1,
        cost: { wood: 0, food: 200, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                if (unit.id === incasUniqueUnits.slinger.id) {
                    unit.addAttackComponent(1, ArmorType.pierce)
                }
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, incasUniqueUnits.slinger],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'fabricShields',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 600, gold: 600, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(2, ArmorType.pierce)
            }
        }],
        duration: 60,
        affectedUnits: [barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior, incasUniqueUnits.kamayuk, incasUniqueUnits.eliteKamayuk, incasUniqueUnits.slinger],
        affectedUpgrades: []
    })
]

export const incasTechTree: CivTechTree = {
    id: 'incas',
    crest,
    wikiUrl: 'Incas',
    bonuses: [],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
            new UnitLine([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            slingerLine
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [],
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
        upgrades: new UpgradePerAgeGroup([...uniqueTechs, castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
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
            universityUpgrades.treadmillCrane,
            universityUpgrades.chemistry,
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
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

const bonuses = [
    {
        id: 'incas1',
        effectType: EffectType.miscallenous,
        value: null,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                addElementIfNotInArray(unit.affectingUpgrades, blacksmithUpgrades.forging)
                addElementIfNotInArray(unit.affectingUpgrades, blacksmithUpgrades.ironCasting)
                addElementIfNotInArray(unit.affectingUpgrades, blacksmithUpgrades.blastFurnace)
                addElementIfNotInArray(unit.affectingUpgrades, blacksmithUpgrades.scaleMailArmor)
                addElementIfNotInArray(unit.affectingUpgrades, blacksmithUpgrades.chainMailArmor)
                addElementIfNotInArray(unit.affectingUpgrades, blacksmithUpgrades.plateMailArmor)
            }
        }],
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: [
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor
        ]
    },
    {
        id: 'incas2',
        effectType: EffectType.miscallenous,
        value: 10,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'incas3',
        effectType: EffectType.discoutStone,
        value: 15,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'incas4',
        effectType: EffectType.discoutFood,
        value: { age1: 15, age2: 20, age3: 25, age4: 30 },
        affectedUnits: getAllCivMilitaryUnits(incasTechTree),
        affectedUpgrades: []
    },
    {
        id: 'incas5',
        effectType: EffectType.lineOfSight,
        value: 2,
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.lineOfSight = unit.stats.lineOfSight + 2
            }
        }],
        affectedUnits: [barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher],
        affectedUpgrades: [],
        team: true
    }
]

incasTechTree.bonuses = bonuses

setCivOnUniqueTechs(uniqueTechs, incasTechTree)
setCivOnUniqueTechs(incasTechTree.bonuses, incasTechTree)