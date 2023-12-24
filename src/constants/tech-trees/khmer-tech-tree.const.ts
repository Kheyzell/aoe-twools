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
import crest from '../../resources/images/crests/khmer.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";

export const khmerUniqueUnits: { ballistaElephant: Unit, eliteBallistaElephant: Unit } = {
    ballistaElephant: new Unit({
        id: 'ballistaElephant',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 80,
            stone: 0
        },
        stats: {
            health: 250,
            rateOfFire: 2.5,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: 1,
            attackComponents: [
                { value: 10, type: ArmorType.pierce },
                { value: 8, type: ArmorType.ship },
                { value: 8, type: ArmorType.fishingShip },
                { value: 3, type: ArmorType.stoneDefense },
                { value: 3, type: ArmorType.standardBuilding },
                { value: 2, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.warElephant },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 20, type: ArmorType.heavySiege },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .8,
            lineOfSight: 7,
        },
        duration: 25
    }),
    eliteBallistaElephant: new Unit({
        id: 'eliteBallistaElephant',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 100,
            gold: 80,
            stone: 0
        },
        stats: {
            health: 290,
            rateOfFire: 2.5,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: 1,
            attackComponents: [
                { value: 11, type: ArmorType.pierce },
                { value: 8, type: ArmorType.ship },
                { value: 8, type: ArmorType.fishingShip },
                { value: 4, type: ArmorType.stoneDefense },
                { value: 4, type: ArmorType.standardBuilding },
                { value: 4, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.warElephant },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 20, type: ArmorType.heavySiege },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .8,
            lineOfSight: 7,
        },
        duration: 25
    })
}

chainTechs([khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant])
const uniqueUnitLine = new UnitLine([khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    universityUpgrades.siegeEngineers, universityUpgrades.chemistry
])

const uniqueTechs = [
    new UniqueTech({
        id: 'tuskSwords',
        age: 3,
        effectType: EffectType.damage,
        value: 3,
        cost: { wood: 300, food: 0, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(3, ArmorType.melee)
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.battleElephant, stableUnits.eliteBattleElephant],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'doubleCrossbow',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 700, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.secondaryAttack = {
                    count: 1,
                    accuracy: 1,
                    components: [
                        { value: 6, type: ArmorType.pierce },
                        { value: 3, type: ArmorType.warElephant },
                        { value: 1, type: ArmorType.building },
                    ]
                }
            }
        }],
        duration: 40,
        affectedUnits: [siegeUnits.scorpion, siegeUnits.heavyScorpion, khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant],
        affectedUpgrades: []
    })
]

export const khmerTechTree: CivTechTree = {
    id: 'khmer',
    crest,
    wikiUrl: 'Khmer',
    bonuses: [
        {
            id: 'khmer1',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'khmer2',
            effectType: EffectType.movementSpeed,
            value: 10,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
                }
            }],
            affectedUnits: [stableUnits.battleElephant, stableUnits.eliteBattleElephant],
            affectedUpgrades: []
        },
        {
            id: 'khmer3',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'khmer4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'khmer5',
            effectType: EffectType.range,
            value: 1,
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    unit.stats.range! += 1
                }
            }],
            affectedUnits: [siegeUnits.scorpion, siegeUnits.heavyScorpion],
            affectedUpgrades: [],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant]),
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
            new UnitLine([khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
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
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.devotion,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
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
            universityUpgrades.siegeEngineers,
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
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, khmerTechTree)
setCivOnUniqueTechs(khmerTechTree.bonuses, khmerTechTree)