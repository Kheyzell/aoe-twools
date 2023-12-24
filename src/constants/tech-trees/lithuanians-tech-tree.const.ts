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
import { monasteryUnits, monasteryUpgrade, relicsUpgrade } from "../techs/monastery-techs.const";
import { siegeUnits } from "../techs/siege-techs.const";
import { stableUnits, stableUpgrades } from "../techs/stable-techs.const";
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";
import crest from '../../resources/images/crests/lithuanians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber } from "../../utils/utils";
import { CAPACITIES } from "../../models/capacity.model";

export const lithuaniansUniqueUnits: { leitis: Unit, eliteLeitis: Unit } = {
    leitis: new Unit({
        id: 'leitis',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 100,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 13, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            capacities: [CAPACITIES.ignoreArmor],
            movementSpeed: 1.4,
            lineOfSight: 5
        },
        duration: 20
    }),
    eliteLeitis: new Unit({
        id: 'eliteLeitis',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 70,
            gold: 50,
            stone: 0
        },
        stats: {
            health: 130,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 16, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            capacities: [CAPACITIES.ignoreArmor],
            movementSpeed: 1.4,
            lineOfSight: 5
        },
        duration: 18
    })
}

chainTechs([lithuaniansUniqueUnits.leitis, lithuaniansUniqueUnits.eliteLeitis])
const uniqueUnitLine = new UnitLine([lithuaniansUniqueUnits.leitis, lithuaniansUniqueUnits.eliteLeitis])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
    blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

const uniqueTechs = [
    new UniqueTech({
        id: 'hillForts',
        age: 3,
        effectType: EffectType.range,
        value: 3,
        cost: { wood: 0, food: 250, gold: 250, stone: 0 },
        duration: 40,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'towerShields',
        age: 4,
        effectType: EffectType.pierceArmor,
        value: 2,
        cost: { wood: 0, food: 500, gold: 200, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(2, ArmorType.pierce)
            }
        }],
        duration: 40,
        affectedUnits: [barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher],
        affectedUpgrades: []
    })
]

export const lithuaniansTechTree: CivTechTree = {
    id: 'lithuanians',
    crest,
    wikiUrl: 'Lithuanians',
    bonuses: [
        {
            id: 'lithuanians1',
            effectType: EffectType.miscallenous,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'lithuanians2',
            effectType: EffectType.movementSpeed,
            value: 10,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
                }
            }],
            affectedUnits: [barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher],
            affectedUpgrades: []
        },
        {
            id: 'lithuanians3',
            effectType: EffectType.miscallenous,
            value: null,
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, relicsUpgrade.relic1)
                    addElementIfNotInArray(unit.affectingUpgrades, relicsUpgrade.relic2)
                    addElementIfNotInArray(unit.affectingUpgrades, relicsUpgrade.relic3)
                    addElementIfNotInArray(unit.affectingUpgrades, relicsUpgrade.relic4)
                    if (upgrades?.some(upgrade => upgrade.id === relicsUpgrade.relic1.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === relicsUpgrade.relic2.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === relicsUpgrade.relic3.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === relicsUpgrade.relic4.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                }
            }],
            affectedUnits: [stableUnits.knight, stableUnits.cavalier, stableUnits.paladin, lithuaniansUniqueUnits.leitis, lithuaniansUniqueUnits.eliteLeitis],
            affectedUpgrades: []
        },
        {
            id: 'lithuanians4',
            effectType: EffectType.creationSpeed,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.2)
                }
            }],
            affectedUnits: [monasteryUnits.monk],
            affectedUpgrades: [monasteryUpgrade.redemption, monasteryUpgrade.atonement, monasteryUpgrade.herbalMedecine, monasteryUpgrade.heresy, monasteryUpgrade.sanctity, monasteryUpgrade.fervor, monasteryUpgrade.faith, monasteryUpgrade.illumination, monasteryUpgrade.blockPrinting, monasteryUpgrade.theocracy],
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
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.wingedHussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting,
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
            monasteryUpgrade.devotion,
            monasteryUpgrade.heresy,
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
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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

setCivOnUniqueTechs(uniqueTechs, lithuaniansTechTree)
setCivOnUniqueTechs(lithuaniansTechTree.bonuses, lithuaniansTechTree)