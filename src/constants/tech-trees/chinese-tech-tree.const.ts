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
import crest from '../../resources/images/crests/chinese.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, getAllCivUpgrades, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";
import { AttackType, Unit } from "../../models/unit.model";

export const chineseUniqueUnits: { chukonu: Unit, eliteChukonu: Unit } = {
    chukonu: new Unit({
        id: 'chukonu',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 40,
            gold: 35,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .85,
            attackComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman }
            ],
            secondaryAttack: {
                count: 3,
                accuracy: .85,
                components: [
                    { value: 0, type: ArmorType.melee },
                    { value: 3, type: ArmorType.pierce },
                ]
            },
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 6,
        },
        duration: 16
    }),
    eliteChukonu: new Unit({
        id: 'eliteChukonu',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 40,
            gold: 35,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .85,
            attackComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman }
            ],
            secondaryAttack: {
                count: 5,
                accuracy: .85,
                components: [
                    { value: 0, type: ArmorType.melee },
                    { value: 3, type: ArmorType.pierce },
                ]
            },
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 6,
        },
        duration: 13
    })
}

chainTechs([chineseUniqueUnits.chukonu, chineseUniqueUnits.eliteChukonu])
const uniqueUnitLine = new UnitLine([chineseUniqueUnits.chukonu, chineseUniqueUnits.eliteChukonu])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const uniqueTechs = [
    new UniqueTech({
        id: 'greatWall',
        age: 3,
        effectType: EffectType.healthPercent,
        value: 30,
        cost: { wood: 400, food: 0, gold: 0, stone: 200 },
        duration: 40,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'rocketry',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 600, food: 0, gold: 600, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                if (unit.id === siegeUnits.scorpion.id || unit.id === siegeUnits.heavyScorpion.id) {
                    unit.addAttackComponent(4, ArmorType.pierce)
                } else
                if (unit.id === chineseUniqueUnits.chukonu.id || unit.id === chineseUniqueUnits.eliteChukonu.id) {
                    unit.addAttackComponent(2, ArmorType.pierce)
                }
            }
        }],
        duration: 60,
        affectedUnits: [siegeUnits.scorpion, siegeUnits.heavyScorpion, chineseUniqueUnits.chukonu, chineseUniqueUnits.eliteChukonu],
        affectedUpgrades: []
    })
]

export const chineseTechTree: CivTechTree = {
    id: 'chinese',
    crest,
    wikiUrl: 'Chinese_(Age_of_Empires_II)',
    bonuses: [],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
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
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([chineseUniqueUnits.chukonu, chineseUniqueUnits.eliteChukonu]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
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
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
            universityUpgrades.keep,
            universityUpgrades.arrowslits,
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
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

chineseTechTree.bonuses = [
    {
        id: 'chinese1',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    },
    {
        id: 'chinese2',
        effectType: EffectType.lineOfSight,
        value: 5,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'chinese3',
        effectType: EffectType.discount,
        value: { age2: 10, age3: 15, age4: 20 },
        affectedUnits: [],
        affectedUpgrades: getAllCivUpgrades(chineseTechTree)
    },
    {
        id: 'chinese4',
        effectType: EffectType.healthPercent,
        value: 50,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.health = multiplyNumber(unit.stats.health, 1.5)
            }
        }],
        affectedUnits: [dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip],
        affectedUpgrades: []
    },
    {
        id: 'chinese5',
        effectType: EffectType.miscallenous,
        value: 10,
        affectedUnits: [],
        affectedUpgrades: [],
        team: true
    }
]

setCivOnUniqueTechs(uniqueTechs, chineseTechTree)
setCivOnUniqueTechs(chineseTechTree.bonuses, chineseTechTree)