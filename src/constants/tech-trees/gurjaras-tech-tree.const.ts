import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES } from "../../models/capacity.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/gurjaras.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addNumber, multiplyNumber } from "../../utils/utils";
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
import { khmerUniqueUnits } from "./khmer-tech-tree.const";
import { persiansUniqueUnits } from "./persians-tech-tree.const";

export const gurjarasUniqueUnits: { chakramThrower: Unit, eliteChakramThrower: Unit, shrivamshaRider: Unit, eliteShrivamshaRider: Unit, camelScout: Unit } = {
    chakramThrower: new Unit({
        id: 'chakramThrower',
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
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: 1,
            attackComponents: [
                { value: 5, type: ArmorType.melee },
                { value: 1, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            capacities: [CAPACITIES.projectilePassThrough],
            movementSpeed: 1.15,
            lineOfSight: 7,
        },
        duration: 15
    }),
    eliteChakramThrower: new Unit({
        id: 'eliteChakramThrower',
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
            health: 50,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            attackComponents: [
                { value: 6, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            capacities: [CAPACITIES.projectilePassThrough],
            movementSpeed: 1.15,
            lineOfSight: 8,
        },
        duration: 15
    }),
    shrivamshaRider: new Unit({
        id: 'shrivamshaRider',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 1.75,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.6,
            lineOfSight: 5
        },
        duration: 20
    }),
    eliteShrivamshaRider: new Unit({
        id: 'eliteShrivamshaRider',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 1.75,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 11, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.6,
            lineOfSight: 6
        },
        duration: 20
    }),
    camelScout: new Unit({
        id: 'camelScout',
        unique: true,
        age: 2,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 55,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 2, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.camel }
            ],
            movementSpeed: 1.2,
            lineOfSight: 4
        },
        duration: 48
    }),
}

chainTechs([gurjarasUniqueUnits.chakramThrower, gurjarasUniqueUnits.eliteChakramThrower])
const uniqueUnitLine = new UnitLine([gurjarasUniqueUnits.chakramThrower, gurjarasUniqueUnits.eliteChakramThrower])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
barracksUpgrade.arson,
])

chainTechs([gurjarasUniqueUnits.shrivamshaRider, gurjarasUniqueUnits.eliteShrivamshaRider])
const shrivamshaRiderLine = new UnitLine([gurjarasUniqueUnits.shrivamshaRider, gurjarasUniqueUnits.eliteShrivamshaRider])
setAffectingUpgrades(shrivamshaRiderLine, [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
])

chainTechs([gurjarasUniqueUnits.camelScout, stableUnits.camelRider, stableUnits.heavyCamelRider])
const camelRiderLine = new UnitLine([gurjarasUniqueUnits.camelScout, stableUnits.camelRider, stableUnits.heavyCamelRider])
setAffectingUpgrades(camelRiderLine, [
    blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
])

const uniqueTechs = [
    new UniqueTech({
        id: 'kshatriyas',
        age: 3,
        effectType: EffectType.discoutFood,
        value: 25,
        cost: { wood: 0, food: 200, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.25))
        }],
        duration: 45,
        affectedUnits: [
            barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman,
            barracksUnits.spearman,
            archeryUnits.archer, archeryUnits.crossbowman,
            archeryUnits.skirmisher, archeryUnits.eliteSkirmisher,
            archeryUnits.handCannoneer,
            archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher,
            stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar,
            gurjarasUniqueUnits.shrivamshaRider, gurjarasUniqueUnits.eliteShrivamshaRider,
            gurjarasUniqueUnits.camelScout, stableUnits.camelRider, stableUnits.heavyCamelRider,
            siegeUnits.armoredElephant, siegeUnits.siegeElephant,
            siegeUnits.mangonel, siegeUnits.onager,
            siegeUnits.scorpion, siegeUnits.heavyScorpion,
            siegeUnits.siegeTower,
            siegeUnits.bombardCannon,
            gurjarasUniqueUnits.chakramThrower, gurjarasUniqueUnits.eliteChakramThrower,
            castleUnits.petard,
            castleUnits.trebuchet,
            dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
            dockUnits.fireGalley, dockUnits.fireShip,
            dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
            dockUnits.cannonGalleon,
        ],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'frontierGuards',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 800, gold: 700, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => unit.addArmorComponent(4, ArmorType.melee)
        }],
        duration: 60,
        affectedUnits: [
            archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher,
            gurjarasUniqueUnits.camelScout, stableUnits.camelRider, stableUnits.heavyCamelRider,
        ],
        affectedUpgrades: []
    })
]

export const gurjarasTechTree: CivTechTree = {
    id: 'gurjaras',
    crest,
    wikiUrl: 'gurjaras',
    bonuses: [],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            shrivamshaRiderLine,
            camelRiderLine
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.armoredElephant, siegeUnits.siegeElephant]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
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
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.illumination,
            monasteryUpgrade.theocracy
        ])
    },
    university: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.fortifiedWall,
            universityUpgrades.ballistics,
            universityUpgrades.heatedShot,
            universityUpgrades.guardTower,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.keep,
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
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
        ])
    }
}

// Gurjaras
const bonuses = [
    {
        id: 'gurjaras1',
        effectType: EffectType.miscallenous,
        value: 2,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'gurjaras2',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'gurjaras3',
        effectType: EffectType.damagePercent,
        value: 40,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.attackComponents
                    .filter(attack => attack.type !== ArmorType.melee && attack.type !== ArmorType.pierce)
                    .forEach(attack => multiplyNumber(attack.value, 1.4))
            }
        }],
        affectedUnits: [
            stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar,
            gurjarasUniqueUnits.camelScout, stableUnits.camelRider, stableUnits.heavyCamelRider,
        ],
        affectedUpgrades: []
    },
    {
        id: 'gurjaras4',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [dockUnits.fishingShip],
        affectedUpgrades: []
    },
    {
        id: 'gurjaras5',
        effectType: EffectType.creationSpeed,
        value: 25,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.duration = multiplyNumber(unit.duration, 1 / 1.25)
            }
        }],
        affectedUnits: [
            archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher,
            stableUnits.battleElephant, stableUnits.eliteBattleElephant,
            gurjarasUniqueUnits.camelScout, stableUnits.camelRider, stableUnits.heavyCamelRider,
            siegeUnits.armoredElephant, siegeUnits.siegeElephant,
            khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant,
            persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant,
        ],
        affectedUpgrades: [],
        team: true
    }
]

gurjarasTechTree.bonuses = bonuses

setCivOnUniqueTechs(uniqueTechs, gurjarasTechTree)
setCivOnUniqueTechs(gurjarasTechTree.bonuses, gurjarasTechTree)