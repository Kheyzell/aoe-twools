import { EffectType, UniqueTech } from "../../models/bonus.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/japanese.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";
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
import { berbersUniqueUnits } from "./berbers-tech-tree.const";
import { vietnameseUniqueUnits } from "./vietnamese-tech-tree.const";

export const japaneseUniqueUnits: { samurai: Unit, eliteSamurai: Unit } = {
    samurai: new Unit({
        id: 'samurai',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 50,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 10, type: ArmorType.uniqueUnit },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1,
            lineOfSight: 4,
        },
        duration: 9
    }),
    eliteSamurai: new Unit({
        id: 'eliteSamurai',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 50,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 12, type: ArmorType.uniqueUnit },
                { value: 3, type: ArmorType.eagleWarrior },
                { value: 3, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1,
            lineOfSight: 5,
        },
        duration: 9
    })
}

chainTechs([japaneseUniqueUnits.samurai, japaneseUniqueUnits.eliteSamurai])
const uniqueUnitLine = new UnitLine([japaneseUniqueUnits.samurai, japaneseUniqueUnits.eliteSamurai])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])


const uniqueTechs = [
    new UniqueTech({
        id: 'yasama',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 300, food: 300, gold: 0, stone: 0 },
        duration: 40,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'kataparuto',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 550, food: 0, gold: 300, stone: 0 },
        duration: 60,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.multiplyAttackRate(1.33)
            }
        }],
        affectedUnits: [castleUnits.trebuchet],
        affectedUpgrades: []
    })
]

export const japaneseTechTree: CivTechTree = {
    id: 'japanese',
    crest,
    wikiUrl: 'Japanese_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'japanese1',
            effectType: EffectType.miscallenous,
            value: null,
            effects: [
                {
                    order: EffectOrder.first,
                    apply: (unit: Unit) => {
                        unit.addArmorComponent(2, ArmorType.pierce)
                    }
                },
                {
                    order: EffectOrder.last,
                    apply: (unit: Unit) => {
                        unit.stats.health = multiplyNumber(unit.stats.health, 2)
                    }
                }
            ],
            affectedUnits: [dockUnits.fishingShip],
            affectedUpgrades: []
        },
        {
            id: 'japanese2',
            effectType: EffectType.discount,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'japanese3',
            effectType: EffectType.fireRate,
            value: 33,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.multiplyAttackRate(1.33)
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                japaneseUniqueUnits.samurai, japaneseUniqueUnits.eliteSamurai],
            affectedUpgrades: []
        },
        {
            id: 'japanese4',
            effectType: EffectType.damage,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit, _, targetUnit) => {
                    const isTargetSkirmisher = targetUnit?.id === archeryUnits.skirmisher.id || targetUnit?.id === archeryUnits.eliteSkirmisher.id
                        || targetUnit?.id === vietnameseUniqueUnits.imperialSkirmisher.id
                        || targetUnit?.id === berbersUniqueUnits.genitour.id || targetUnit?.id === berbersUniqueUnits.eliteGenitour.id
                    if (!isTargetSkirmisher) {
                        unit.addAttackComponent(2, ArmorType.archer)
                    }
                }
            }],
            affectedUnits: [archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: []
        },
        {
            id: 'japanese5',
            effectType: EffectType.lineOfSightPercent,
            value: 50,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.lineOfSight = multiplyNumber(unit.stats.lineOfSight, 1.5)
                }
            }],
            affectedUnits: [dockUnits.galley, dockUnits.warGalley, dockUnits.galleon],
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
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
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
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.devotion,
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
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, japaneseTechTree)
setCivOnUniqueTechs(japaneseTechTree.bonuses, japaneseTechTree)