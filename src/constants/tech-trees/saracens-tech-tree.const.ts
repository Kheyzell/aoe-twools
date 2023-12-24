import { EffectType, UniqueTech } from "../../models/bonus.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/saracens.png';
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

export const saracensUniqueUnits: { mameluke: Unit, eliteMameluke: Unit } = {
    mameluke: new Unit({
        id: 'mameluke',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 85,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 3,
            accuracy: 1,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 9, type: ArmorType.cavalry },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.mameluke },
                { value: 0, type: ArmorType.camel },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.4,
            lineOfSight: 5
        },
        duration: 23
    }),
    eliteMameluke: new Unit({
        id: 'eliteMameluke',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 85,
            stone: 0
        },
        stats: {
            health: 90,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 3,
            accuracy: 1,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 12, type: ArmorType.cavalry },
                { value: 1, type: ArmorType.mameluke },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.mameluke },
                { value: 0, type: ArmorType.camel },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.4,
            lineOfSight: 5
        },
        duration: 23
    })
}

chainTechs([saracensUniqueUnits.mameluke, saracensUniqueUnits.eliteMameluke])
const uniqueUnitLine = new UnitLine([saracensUniqueUnits.mameluke, saracensUniqueUnits.eliteMameluke])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
stableUpgrades.bloodlines, stableUpgrades.husbandry])

const uniqueTechs = [
    new UniqueTech({
        id: 'bimaristan',
        age: 3,
        effectType: EffectType.miscallenous,
        value: { radius: 5, healing: 75 },
        cost: { wood: 300, food: 0, gold: 200, stone: 0 },
        effects: [/* @TODO add multiple healing capacity */],
        duration: 50,
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'counterweights',
        age: 4,
        effectType: EffectType.damagePercent,
        value: 15,
        cost: { wood: 0, food: 650, gold: 500, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.attackComponents.forEach(attack => attack.value = multiplyNumber(attack.value, 1.15))
            }
        }],
        duration: 60,
        affectedUnits: [siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager, castleUnits.trebuchet],
        affectedUpgrades: []
    }),
]

export const saracensTechTree: CivTechTree = {
    id: 'saracens',
    crest,
    wikiUrl: 'Saracens',
    bonuses: [
        {
            id: 'saracens1',
            effectType: EffectType.miscallenous,
            value: 5,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'saracens2',
            effectType: EffectType.discoutWoodValue,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'saracens3',
            effectType: EffectType.miscallenous,
            value: null,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.health = unit.stats.health * 2
                }
            }],
            affectedUnits: [dockUnits.transportShip],
            affectedUpgrades: []
        },
        {
            id: 'saracens4',
            effectType: EffectType.fireRate,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.multiplyAttackRate(1.25)
                }
            }],
            affectedUnits: [dockUnits.galley, dockUnits.warGalley, dockUnits.galleon],
            affectedUpgrades: []
        },
        {
            id: 'saracens5',
            effectType: EffectType.health,
            value: 25,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.stats.health = multiplyNumber(unit.stats.health, 1.25)
                }
            }],
            affectedUnits: [stableUnits.camelRider, stableUnits.heavyCamelRider, saracensUniqueUnits.mameluke, saracensUniqueUnits.eliteMameluke],
            affectedUpgrades: []
        },
        {
            id: 'saracens6',
            effectType: EffectType.miscallenous,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addAttackComponent(2, ArmorType.standardBuilding)
                }
            }],
            affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
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
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight]),
            new UnitLine([stableUnits.camelRider, stableUnits.heavyCamelRider]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
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
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.devotion,
            monasteryUpgrade.heresy,
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

setCivOnUniqueTechs(uniqueTechs, saracensTechTree)
setCivOnUniqueTechs(saracensTechTree.bonuses, saracensTechTree)