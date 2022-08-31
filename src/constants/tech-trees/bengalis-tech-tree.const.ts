import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES, RegenCapacity, SwapUnit } from "../../models/capacity.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/bengalis.png';
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

export const bengalisUniqueUnits: { rathaRanged: Unit, rathaMelee: Unit, eliteRathaRanged: Unit, eliteRathaMelee: Unit } = {
    rathaRanged: new Unit({
        id: 'rathaRanged',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 105,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .8,
            attackComponents: [
                { value: 5, type: ArmorType.pierce },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.3,
            lineOfSight: 6,
        },
        duration: 18
    }),
    rathaMelee: new Unit({
        id: 'rathaMelee',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 105,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.15,
            lineOfSight: 6,
        },
        duration: 18
    }),
    eliteRathaRanged: new Unit({
        id: 'eliteRathaRanged',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 115,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .9,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.3,
            lineOfSight: 6,
        },
        duration: 18
    }),
    eliteRathaMelee: new Unit({
        id: 'eliteRathaMelee',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 115,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.15,
            lineOfSight: 6,
        },
        duration: 18
    }),
}

chainTechs([bengalisUniqueUnits.rathaRanged, bengalisUniqueUnits.eliteRathaRanged])
const uniqueUnitLine = new UnitLine([bengalisUniqueUnits.rathaRanged, bengalisUniqueUnits.eliteRathaRanged])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    archeryUpgrades.parthianTactis,
    universityUpgrades.ballistics, universityUpgrades.chemistry
])

chainTechs([bengalisUniqueUnits.rathaMelee, bengalisUniqueUnits.eliteRathaMelee])
const rathaMeleeLine = new UnitLine([bengalisUniqueUnits.rathaMelee, bengalisUniqueUnits.eliteRathaMelee])
setAffectingUpgrades(rathaMeleeLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    archeryUpgrades.parthianTactis,
])

bengalisUniqueUnits.rathaRanged.addCapacity({ ...CAPACITIES.swapUnit, unit: bengalisUniqueUnits.rathaMelee } as SwapUnit)
bengalisUniqueUnits.rathaMelee.addCapacity({ ...CAPACITIES.swapUnit, unit: bengalisUniqueUnits.rathaRanged } as SwapUnit)
bengalisUniqueUnits.eliteRathaRanged.addCapacity({ ...CAPACITIES.swapUnit, unit: bengalisUniqueUnits.eliteRathaMelee } as SwapUnit)
bengalisUniqueUnits.eliteRathaMelee.addCapacity({ ...CAPACITIES.swapUnit, unit: bengalisUniqueUnits.eliteRathaRanged } as SwapUnit)

const uniqueTechs = [
    new UniqueTech({
        id: 'paiks',
        age: 3,
        effectType: EffectType.fireRate,
        value: 20,
        cost: { wood: 375, food: 0, gold: 275, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.multiplyAttackRate(1.20)
            }
        }],
        duration: 45,
        affectedUnits: [archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher, stableUnits.battleElephant, stableUnits.eliteBattleElephant, siegeUnits.armoredElephant, siegeUnits.siegeElephant, bengalisUniqueUnits.rathaRanged, bengalisUniqueUnits.rathaMelee, bengalisUniqueUnits.eliteRathaRanged, bengalisUniqueUnits.eliteRathaMelee],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'mahayana',
        age: 4,
        effectType: EffectType.miscallenous,
        value: 10,
        cost: { wood: 800, food: 0, gold: 650, stone: 0 },
        duration: 60,
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    })
]

export const bengalisTechTree: CivTechTree = {
    id: 'bengalis',
    crest,
    wikiUrl: 'bengalis',
    bonuses: [
        {
            id: 'bengalis1',
            effectType: EffectType.miscallenous,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: (unit, _, targetedUnit) => {
                    targetedUnit?.stats.attackComponents
                        .filter(attack => attack.type !== ArmorType.melee && attack.type !== ArmorType.pierce)
                        .filter(attack => unit.stats.armorComponents.some(armor => armor.type === attack.type))
                        .forEach(attack => multiplyNumber(attack.value, 3/4))

                    /* @TODO: figure out the conversion resistance bonus */
                }
            }],
            affectedUnits: [archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher, stableUnits.battleElephant, stableUnits.eliteBattleElephant, siegeUnits.armoredElephant, siegeUnits.siegeElephant],
            affectedUpgrades: []
        },
        {
            id: 'bengalis2',
            effectType: EffectType.miscallenous,
            value: 2,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'bengalis3',
            effectType: EffectType.regen,
            value: 15,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addCapacity({ ...CAPACITIES.regen, healthPerMinute: 15 } as RegenCapacity)
                }
            }],
            affectedUnits: [
                dockUnits.fishingShip,
                dockUnits.transportShip,
                dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip,
                dockUnits.demolitionRaft, dockUnits.demotionShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon,
            ],
            affectedUpgrades: []
        },
        {
            id: 'bengalis4',
            effectType: EffectType.armor,
            value: 3,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addArmorComponent(3, ArmorType.melee)
                    unit.addArmorComponent(3, ArmorType.pierce)
                }
            }],
            affectedUnits: [monasteryUnits.monk],
            affectedUpgrades: []
        },
        {
            id: 'bengalis5',
            effectType: EffectType.miscallenous,
            value: 10,
            affectedUnits: [marketUnits.tradeCart, dockUnits.tradeCog],
            affectedUpgrades: [],
            team: true
        }
    ],
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
            new UnitLine([archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.armoredElephant, siegeUnits.siegeElephant]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
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
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
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

setCivOnUniqueTechs(uniqueTechs, bengalisTechTree)
setCivOnUniqueTechs(bengalisTechTree.bonuses, bengalisTechTree)