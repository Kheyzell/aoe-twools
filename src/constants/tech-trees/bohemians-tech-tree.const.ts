import { EffectType, UniqueTech } from "../../models/bonus.model";
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
import crest from '../../resources/images/crests/bohemians.png'
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber } from "../../utils/utils";
import { UnitType, EffectOrder, CivTechTree, ArmorType, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import { CAPACITIES } from "../../models/capacity.model";

export const bohemiansUniqueUnits: { hussiteWagon: Unit, eliteHussiteWagon: Unit, houfnice: Unit } = {
    hussiteWagon: new Unit({
        id: 'hussiteWagon',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 110,
            food: 0,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 200,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: .85,
            attackComponents: [
                { value: 17, type: ArmorType.pierce },
                { value: 3, type: ArmorType.ram },
                { value: 1, type: ArmorType.building },
            ],
            secondaryAttack: {
                count: 2,
                accuracy: .75,
                components: [{ value: 2, type: ArmorType.trueDamage }]
            },
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 7, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
                { value: 0, type: ArmorType.hussiteWagon },
            ],
            capacities: [CAPACITIES.projectileProtection],
            movementSpeed: .85,
            lineOfSight: 8,
        },
        duration: 21
    }),
    eliteHussiteWagon: new Unit({
        id: 'eliteHussiteWagon',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 110,
            food: 0,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 250,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: .9,
            attackComponents: [
                { value: 20, type: ArmorType.pierce },
                { value: 3, type: ArmorType.ram },
                { value: 2, type: ArmorType.building },
            ],
            secondaryAttack: {
                count: 3,
                components: [{ value: 2, accuracy: .75, type: ArmorType.trueDamage }]
            },
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 10, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
                { value: 0, type: ArmorType.hussiteWagon },
            ],
            capacities: [CAPACITIES.projectileProtection],
            movementSpeed: .85,
            lineOfSight: 8,
        },
        duration: 21
    }),
    houfnice: new Unit({
        id: 'houfnice',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 225,
            food: 0,
            gold: 225,
            stone: 0
        },
        stats: {
            health: 90,
            rateOfFire: 6.5,
            attackType: AttackType.projectile,
            range: 12,
            accuracy: 1,
            attackComponents: [
                { value: 55, type: ArmorType.melee },
                { value: 250, type: ArmorType.building },
                { value: 55, type: ArmorType.ship },
                { value: 55, type: ArmorType.fishingShip },
                { value: 55, type: ArmorType.stoneDefense },
                { value: 20, type: ArmorType.siegeWeapon },
                { value: 55, type: ArmorType.hussiteWagon },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.gunpowderUnit }
            ],
            movementSpeed: .7,
            lineOfSight: 14,
        },
        duration: 56
    })
}

chainTechs([bohemiansUniqueUnits.hussiteWagon, bohemiansUniqueUnits.eliteHussiteWagon])
chainTechs([siegeUnits.bombardCannon, bohemiansUniqueUnits.houfnice])

const uniqueUnitLine = new UnitLine([bohemiansUniqueUnits.hussiteWagon, bohemiansUniqueUnits.eliteHussiteWagon])
const houfniceLine = new UnitLine([siegeUnits.bombardCannon, bohemiansUniqueUnits.houfnice])
setAffectingUpgrades(uniqueUnitLine, [universityUpgrades.siegeEngineers])
setAffectingUpgrades(houfniceLine, [universityUpgrades.siegeEngineers])

const uniqueTechs = [
    new UniqueTech({
        id: 'wagenburgTactics',
        age: 3,
        effectType: EffectType.movementSpeed,
        value: 15,
        cost: { wood: 0, food: 300, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.15)
            }
        }],
        duration: 45,
        affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, bohemiansUniqueUnits.houfnice, bohemiansUniqueUnits.hussiteWagon, bohemiansUniqueUnits.eliteHussiteWagon],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'hussiteReforms',
        age: 4,
        effectType: EffectType.discoutGold,
        value: null,
        cost: { wood: 0, food: 800, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.cost.food = unit.cost.food + unit.cost.gold
                unit.cost.gold = 0
            }
        }],
        duration: 45,
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: [monasteryUpgrade.redemption, monasteryUpgrade.atonement, monasteryUpgrade.herbalMedecine, monasteryUpgrade.heresy, monasteryUpgrade.sanctity, monasteryUpgrade.fervor, monasteryUpgrade.faith, monasteryUpgrade.illumination, monasteryUpgrade.blockPrinting, monasteryUpgrade.theocracy]
    })
]

export const bohemiansTechTree: CivTechTree = {
    id: 'bohemians',
    crest,
    wikiUrl: 'Bohemians',
    bonuses: [
        {
            id: 'bohemians1',
            effectType: EffectType.discoutWood,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'bohemians2',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [archeryUnits.handCannoneer],
            affectedUpgrades: [universityUpgrades.chemistry]
        },
        {
            id: 'bohemians3',
            effectType: EffectType.damagePercent,
            value: 25,
            effects: [{
                order: EffectOrder.first,
                apply: (unit) => {
                    unit?.stats.attackComponents
                        .filter(attack => attack.type !== ArmorType.melee && attack.type !== ArmorType.pierce)
                        .forEach(attack => attack.value = multiplyNumber(attack.value, 1.25))
                }
            }],
            affectedUnits: [barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier],
            affectedUpgrades: []
        },
        {
            id: 'bohemians4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: [monasteryUpgrade.fervor, monasteryUpgrade.sanctity]
        },
        {
            id: 'bohemians5',
            effectType: EffectType.freeUpgrade,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [miningCampUpgrades.goldMining, miningCampUpgrades.goldShaftMining, miningCampUpgrades.stoneMining, miningCampUpgrades.stoneShaftMining]
        },
        {
            id: 'bohemians6',
            effectType: EffectType.miscallenous,
            value: 80,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.8)
                }
            }],
            affectedUnits: [marketUnits.tradeCart],
            affectedUpgrades: [marketUpgrade.coinage, marketUpgrade.caravan, marketUpgrade.banking, marketUpgrade.guilds],
            team: true
        },
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier])
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier])
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            houfniceLine,
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            uniqueUnitLine,
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
            universityUpgrades.architecture,
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
            millUpgrades.heavyPlow
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
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, bohemiansTechTree)
setCivOnUniqueTechs(bohemiansTechTree.bonuses, bohemiansTechTree)