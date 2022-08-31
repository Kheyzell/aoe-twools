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
import crest from '../../resources/images/crests/vietnamese.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades } from "../../utils/techs.utils";
import { setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

export const vietnameseUniqueUnits: { rattanArcher: Unit, eliteRattanArcher: Unit, imperialSkirmisher: Unit } = {
    rattanArcher: new Unit({
        id: 'rattanArcher',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 50,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .8,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.1,
            lineOfSight: 6,
        },
        duration: 16
    }),
    eliteRattanArcher: new Unit({
        id: 'eliteRattanArcher',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 50,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .9,
            attackComponents: [
                { value: 7, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.1,
            lineOfSight: 6,
        },
        duration: 16
    }),
    imperialSkirmisher: new Unit({
        id: 'imperialSkirmisher',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 25,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 35,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .95,
            attackComponents: [
                { value: 4, type: ArmorType.pierce },
                { value: 5, type: ArmorType.archer },
                { value: 3, type: ArmorType.spearman },
                { value: 3, type: ArmorType.cavalryArcher },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 5, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 7,
        },
        duration: 22
    })
}

chainTechs([vietnameseUniqueUnits.rattanArcher, vietnameseUniqueUnits.eliteRattanArcher])
const uniqueUnitLine = new UnitLine([vietnameseUniqueUnits.rattanArcher, vietnameseUniqueUnits.eliteRattanArcher])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

chainTechs([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, vietnameseUniqueUnits.imperialSkirmisher])
const imperialSkirmisherLine = new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, vietnameseUniqueUnits.imperialSkirmisher])
setAffectingUpgrades(imperialSkirmisherLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const uniqueTechs = [
    new UniqueTech({
        id: 'chatras',
        age: 3,
        effectType: EffectType.health,
        value: 50,
        cost: { wood: 0, food: 250, gold: 250, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.health += 100
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.battleElephant, stableUnits.eliteBattleElephant],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'paperMoney',
        age: 4,
        effectType: EffectType.miscallenous,
        value: 500,
        cost: { wood: 600, food: 0, gold: 350, stone: 0 },
        duration: 60,
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    })
]

export const vietnameseTechTree: CivTechTree = {
    id: 'vietnamese',
    crest,
    wikiUrl: 'Vietnamese',
    bonuses: [
        {
            id: 'vietnamese1',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'vietnamese2',
            effectType: EffectType.healthPercent,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.health = multiplyNumber(unit.stats.health, 1.2)
                }
            }],
            affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: []
        },
        {
            id: 'vietnamese3',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [castleUpgrades.conscription]
        },
        {
            id: 'vietnamese4',
            effectType: EffectType.discoutWood,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: [
                townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart,
                lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw, lumberCampUpgrades.twoManSaw,
                millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation,
                miningCampUpgrades.goldMining, miningCampUpgrades.stoneMining, miningCampUpgrades.goldShaftMining, miningCampUpgrades.stoneShaftMining,
                marketUpgrade.caravan, marketUpgrade.guilds,
                dockUpgrades.gillnets
            ]
        },
        {
            id: 'vietnamese5',
            effectType: EffectType.uniqueUnit,
            value: null,
            affectedUnits: [vietnameseUniqueUnits.imperialSkirmisher],
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
            imperialSkirmisherLine,
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant]),
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
            uniqueUnitLine,
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
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
            universityUpgrades.fortifiedWall,
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
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
            millUpgrades.cropRotation,
        ])
    },
    miningCamp: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            miningCampUpgrades.goldMining,
            miningCampUpgrades.stoneMining,
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


setCivOnUniqueTechs(uniqueTechs, vietnameseTechTree)
setCivOnUniqueTechs(vietnameseTechTree.bonuses, vietnameseTechTree)