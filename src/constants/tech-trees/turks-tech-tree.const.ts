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
import crest from '../../resources/images/crests/turks.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

export const turksUniqueUnits: { janissary: Unit, eliteJanissary: Unit } = {
    janissary: new Unit({
        id: 'janissary',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 55,
            stone: 0
        },
        stats: {
            health: 35,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 8,
            accuracy: .5,
            attackComponents: [
                { value: 17, type: ArmorType.pierce },
                { value: 2, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .96,
            lineOfSight: 10,
        },
        duration: 21
    }),
    eliteJanissary: new Unit({
        id: 'eliteJanissary',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 55,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 8,
            accuracy: .65,
            attackComponents: [
                { value: 22, type: ArmorType.pierce },
                { value: 3, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .96,
            lineOfSight: 10,
        },
        duration: 21
    })
}

chainTechs([turksUniqueUnits.janissary, turksUniqueUnits.eliteJanissary])
const uniqueUnitLine = new UnitLine([turksUniqueUnits.janissary, turksUniqueUnits.eliteJanissary])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor])

const uniqueTechs = [
    new UniqueTech({
        id: 'sipahi',
        age: 3,
        effectType: EffectType.health,
        value: 20,
        cost: { wood: 0, food: 350, gold: 150, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.health += 20
            }
        }],
        duration: 60,
        affectedUnits: [archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'artillery',
        age: 4,
        effectType: EffectType.range,
        value: 2,
        cost: { wood: 0, food: 0, gold: 500, stone: 450 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.range! += 2
            }
        }],
        duration: 40,
        affectedUnits: [siegeUnits.bombardCannon, dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon],
        affectedUpgrades: []
    })
]

export const turksTechTree: CivTechTree = {
    id: 'turks',
    crest,
    wikiUrl: 'Turks',
    bonuses: [
        {
            id: 'turks1',
            effectType: EffectType.healthPercent,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.health = multiplyNumber(unit.stats.health, 1.2)
                }
            }],
            affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon, turksUniqueUnits.janissary, turksUniqueUnits.eliteJanissary],
            affectedUpgrades: []
        },
        {
            id: 'turks2',
            effectType: EffectType.discount,
            value: 50,
            affectedUnits: [dockUnits.eliteCannonGalleon],
            affectedUpgrades: [universityUpgrades.bombardTower]
        },
        {
            id: 'turks3',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [universityUpgrades.chemistry]
        },
        {
            id: 'turks4',
            effectType: EffectType.miscallenous,
            value: 20,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'turks5',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [stableUnits.hussar],
            affectedUpgrades: []
        },
        {
            id: 'turks6',
            effectType: EffectType.pierceArmor,
            value: 1,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addArmorComponent(1, ArmorType.pierce)
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar],
            affectedUpgrades: []
        },
        {
            id: 'turks7',
            effectType: EffectType.creationSpeed,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.25)
                }
            }],
            affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon, turksUniqueUnits.janissary, turksUniqueUnits.eliteJanissary],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher]),
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
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([turksUniqueUnits.janissary, turksUniqueUnits.eliteJanissary]),
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
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            marketUpgrade.guilds,
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
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

setCivOnUniqueTechs(uniqueTechs, turksTechTree)
setCivOnUniqueTechs(turksTechTree.bonuses, turksTechTree)