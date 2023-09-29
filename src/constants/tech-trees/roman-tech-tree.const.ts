import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES, ChargedAttackCapacity, MovementSpeedAndAttackSpeedAuraBonus } from '../../models/capacity.model';
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/romans.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber } from "../../utils/utils";
import { archeryUnits } from "../techs/archery-techs.const";
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

export const romansUniqueUnits: { centurion: Unit, eliteCenturion: Unit, legionary: Unit } = {
    centurion: new Unit({
        id: 'centurion',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 75,
            gold: 85,
            stone: 0
        },
        stats: {
            health: 110,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 13, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            capacities: [{ ...CAPACITIES.movementSpeedAndAttackSpeedAuraBonus, range: 10, movementSpeed: 10, attackSpeed: 25 } as MovementSpeedAndAttackSpeedAuraBonus],
            movementSpeed: 1.35,
            lineOfSight: 4
        },
        duration: 24
    }),
    eliteCenturion: new Unit({
        id: 'eliteCenturion',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 75,
            gold: 85,
            stone: 0
        },
        stats: {
            health: 155,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 15, type: ArmorType.melee },
            ],
            armorComponents: [
                { value: 3, type: ArmorType.melee },
                { value: 3, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            capacities: [{ ...CAPACITIES.movementSpeedAndAttackSpeedAuraBonus, range: 12, movementSpeed: 15, attackSpeed: 33 } as MovementSpeedAndAttackSpeedAuraBonus],
            movementSpeed: 1.35,
            lineOfSight: 4
        },
        duration: 24
    }),
    legionary: new Unit({
        id: 'legionary',
        wikiUrl: 'Legionary_(Age_of_Empires_II)',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 75,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 8, type: ArmorType.eagleWarrior },
                { value: 4, type: ArmorType.infantry },
                { value: 4, type: ArmorType.condottiero },
                { value: 4, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry }
            ],
            movementSpeed: .9,
            lineOfSight: 5,
        },
        duration: 21
    }),
}

const centurionAura = romansUniqueUnits.centurion.stats.capacities[0] as MovementSpeedAndAttackSpeedAuraBonus
const eliteCenturionAura = romansUniqueUnits.eliteCenturion.stats.capacities[0] as MovementSpeedAndAttackSpeedAuraBonus
centurionAura.units = eliteCenturionAura.units = [romansUniqueUnits.legionary]

chainTechs([romansUniqueUnits.centurion, romansUniqueUnits.eliteCenturion])
const uniqueUnitLine = new UnitLine([romansUniqueUnits.centurion, romansUniqueUnits.eliteCenturion])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

chainTechs([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, romansUniqueUnits.legionary])
const legionaryLine = new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, romansUniqueUnits.legionary])
setAffectingUpgrades(legionaryLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])

const uniqueTechs = [
    new UniqueTech({
        id: 'ballistas',
        age: 3,
        effectType: EffectType.fireRate,
        value: { scorpion: 33, galley: 2 },
        cost: { wood: 0, food: 400, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                const isScorpion = unit.id === siegeUnits.scorpion.id || unit.id === siegeUnits.heavyScorpion.id
                const isGalley = unit.id === dockUnits.galley.id || unit.id === dockUnits.warGalley.id || unit.id === dockUnits.galleon.id
                
                if (isScorpion) {
                    unit.multiplyAttackRate(1.33)
                }
                if (isGalley) {
                    unit.addAttackComponent(2, ArmorType.pierce)
                }
            }
        }],
        duration: 45,
        affectedUnits: [siegeUnits.scorpion, siegeUnits.heavyScorpion, dockUnits.galley, dockUnits.warGalley, dockUnits.galleon],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'comitatenses',
        age: 4,
        effectType: EffectType.miscallenous,
        value: 50,
        cost: { wood: 0, food: 700, gold: 800, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.duration /= 2
                unit.addCapacity({ ...CAPACITIES.chargedAttack, reloadTime: 20, damage: 5 } as ChargedAttackCapacity)
            }
        }],
        duration: 60,
        affectedUnits: [
            barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, romansUniqueUnits.legionary,
            stableUnits.knight, stableUnits.cavalier,
            romansUniqueUnits.centurion, romansUniqueUnits.eliteCenturion,
        ],
        affectedUpgrades: []
    })
]

export const romanTechTree: CivTechTree = {
    id: 'romans',
    crest,
    wikiUrl: 'Romans_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'romans1',
            effectType: EffectType.miscallenous,
            value: 5,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'romans2',
            effectType: EffectType.discoutWoodValue,
            value: 1,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.addArmorComponent(1, ArmorType.melee)
                    unit.addArmorComponent(1, ArmorType.pierce)
                }
            }],
            affectedUnits: [dockUnits.galley, dockUnits.warGalley, dockUnits.galleon, dockUnits.dromon],
            affectedUpgrades: []
        },
        {
            id: 'romans3',
            effectType: EffectType.armor,
            value: null,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    // @TODO implements effect
                }
            }],
            affectedUnits: [
                barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, romansUniqueUnits.legionary,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
            ],
            affectedUpgrades: [blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor]
        },
        {
            id: 'romans4',
            effectType: EffectType.discoutGold,
            value: 60,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.cost.gold = multiplyNumber(unit.cost.gold, 1 - .6)
                    addElementIfNotInArray(unit.affectingUpgrades, universityUpgrades.ballistics)
                }
            }],
            affectedUnits: [siegeUnits.scorpion, siegeUnits.heavyScorpion],
            affectedUpgrades: []
        },
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            legionaryLine,
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
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
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
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
            new UnitLine([castleUnits.uniqueUnit, castleUnits.eliteUniqueUnit]),
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
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.redemption,
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
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
            new UnitLine([dockUnits.dromon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, romanTechTree)
setCivOnUniqueTechs(romanTechTree.bonuses, romanTechTree)