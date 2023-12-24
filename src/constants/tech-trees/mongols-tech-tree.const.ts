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
import crest from '../../resources/images/crests/mongols.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber, roundHundredth } from "../../utils/utils";

export const mongolsUniqueUnits: { mangudai: Unit, eliteMangudai: Unit } = {
    mangudai: new Unit({
        id: 'mangudai',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 55,
            food: 0,
            gold: 65,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2.1,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .95,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 3, type: ArmorType.siegeWeapon },
                { value: 1, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.4,
            lineOfSight: 6,
        },
        duration: 26
    }),
    eliteMangudai: new Unit({
        id: 'eliteMangudai',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 55,
            food: 0,
            gold: 65,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2.1,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .95,
            attackComponents: [
                { value: 8, type: ArmorType.pierce },
                { value: 5, type: ArmorType.siegeWeapon },
                { value: 1, type: ArmorType.spearman },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.4,
            lineOfSight: 6,
        },
        duration: 26
    })
}

chainTechs([mongolsUniqueUnits.mangudai, mongolsUniqueUnits.eliteMangudai])
const uniqueUnitLine = new UnitLine([mongolsUniqueUnits.mangudai, mongolsUniqueUnits.eliteMangudai])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor,
    archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const uniqueTechs = [
    new UniqueTech({
        id: 'nomads',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 300, food: 0, gold: 150, stone: 0 },
        duration: 40,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'drill',
        age: 4,
        effectType: EffectType.movementSpeed,
        value: 50,
        cost: { wood: 500, food: 0, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.5)
            }
        }],
        duration: 60,
        affectedUnits: [siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam, siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager, siegeUnits.scorpion, siegeUnits.heavyScorpion, siegeUnits.siegeTower],
        affectedUpgrades: []
    })
]

export const mongolsTechTree: CivTechTree = {
    id: 'mongols',
    crest,
    wikiUrl: 'Mongols_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'mongols1',
            effectType: EffectType.fireRate,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.multiplyAttackRate(1.25)
                }
            }],
            affectedUnits: [archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher, mongolsUniqueUnits.mangudai, mongolsUniqueUnits.eliteMangudai],
            affectedUpgrades: []
        },
        {
            id: 'mongols2',
            effectType: EffectType.healthPercent,
            value: 30,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.health = multiplyNumber(unit.stats.health, 1.3)
                }
            }],
            affectedUnits: [stableUnits.lightCavalry, stableUnits.hussar, stableUnits.steppeLancer, stableUnits.eliteSteppeLancer],
            affectedUpgrades: []
        },
        {
            id: 'mongols3',
            effectType: EffectType.miscallenous,
            value: 40,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'mongols4',
            effectType: EffectType.lineOfSight,
            value: 2,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.stats.lineOfSight = unit.stats.lineOfSight + 2
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar],
            affectedUpgrades: [],
            team: true
        },
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.devotion,
            monasteryUpgrade.heresy,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            universityUpgrades.chemistry,
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
            new UnitLine([dockUnits.tradeCog]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, mongolsTechTree)
setCivOnUniqueTechs(mongolsTechTree.bonuses, mongolsTechTree)