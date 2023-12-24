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
import crest from '../../resources/images/crests/berbers.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber } from "../../utils/utils";
import { CAPACITIES, RegenCapacity } from "../../models/capacity.model";
import { UnitType, EffectOrder, CivTechTree, UnitLine, UpgradePerAgeGroup, ArmorType } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import { Upgrade } from '../../models/upgrade.model';

export const berbersUniqueUnits: { camelArcher: Unit, eliteCamelArcher: Unit, genitour: Unit, eliteGenitour: Unit } = {
    camelArcher: new Unit({
        id: 'camelArcher',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 50,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .95,
            attackComponents: [
                { value: 7, type: ArmorType.pierce },
                { value: 4, type: ArmorType.cavalryArcher },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.camel },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.4,
            lineOfSight: 5,
        },
        duration: 25
    }),
    eliteCamelArcher: new Unit({
        id: 'eliteCamelArcher',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 50,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .95,
            attackComponents: [
                { value: 8, type: ArmorType.pierce },
                { value: 6, type: ArmorType.cavalryArcher },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.camel },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.4,
            lineOfSight: 5,
        },
        duration: 25
    }),
    genitour: new Unit({
        id: 'genitour',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 40,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .90,
            attackComponents: [
                { value: 3, type: ArmorType.pierce },
                { value: 4, type: ArmorType.archer },
                { value: 3, type: ArmorType.spearman },
                { value: 2, type: ArmorType.cavalryArcher },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 1, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.skirmisher },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.35,
            lineOfSight: 5,
        },
        duration: 25
    }),
    eliteGenitour: new Unit({
        id: 'eliteGenitour',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 40,
            gold: 0,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: .90,
            attackComponents: [
                { value: 4, type: ArmorType.pierce },
                { value: 5, type: ArmorType.archer },
                { value: 3, type: ArmorType.spearman },
                { value: 2, type: ArmorType.cavalryArcher },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 1, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.skirmisher },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.35,
            lineOfSight: 6,
        },
        duration: 25
    })
}

chainTechs([berbersUniqueUnits.camelArcher, berbersUniqueUnits.eliteCamelArcher])
chainTechs([berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour])
const uniqueUnitsLine = new UnitLine([berbersUniqueUnits.camelArcher, berbersUniqueUnits.eliteCamelArcher])
const genitourLine = new UnitLine([berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour])
const cavArcherUpgrades = [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing, archeryUpgrades.parthianTactis,
    stableUpgrades.bloodlines, stableUpgrades.husbandry,
    universityUpgrades.ballistics, universityUpgrades.chemistry]
setAffectingUpgrades(uniqueUnitsLine, [...cavArcherUpgrades])
setAffectingUpgrades(genitourLine, [...cavArcherUpgrades])

const uniqueTechs = [
    new UniqueTech({
        id: 'kasbah',
        age: 3,
        effectType: EffectType.creationSpeed,
        value: 25,
        cost: { wood: 0, food: 250, gold: 250, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.duration = multiplyNumber(unit.duration, 1/1.25)
            }
        }],
        duration: 40,
        affectedUnits: [berbersUniqueUnits.camelArcher, berbersUniqueUnits.eliteCamelArcher, castleUnits.petard, castleUnits.trebuchet],
        affectedUpgrades: [castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies],
    }),
    new UniqueTech({
        id: 'maghrebiCamels',
        age: 4,
        effectType: EffectType.regen,
        value: 15,
        cost: { wood: 0, food: 700, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.capacities.push({ ...CAPACITIES.regen, healthPerMinute: 15 } as RegenCapacity)
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.camelRider, stableUnits.heavyCamelRider, berbersUniqueUnits.camelArcher, berbersUniqueUnits.eliteCamelArcher],
        affectedUpgrades: []
    })
]

export const berbersTechTree: CivTechTree = {
    id: 'berbers',
    crest,
    wikiUrl: 'Berbers_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'berbers1',
            effectType: EffectType.movementSpeed,
            value: 10,
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    const isFeudalAgeOrMore = upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)
                    if (isFeudalAgeOrMore) {
                        unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
                    } else {
                        unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.05)
                    }
                }
            }],
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'berbers2',
            effectType: EffectType.discount,
            value: { age3: 15, age4: 20 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, 1 - .2)
                        unit.cost.food = multiplyNumber(unit.cost.food, 1 - .2)
                        unit.cost.gold = multiplyNumber(unit.cost.gold, 1 - .2)
                        unit.cost.stone = multiplyNumber(unit.cost.stone, 1 - .2)
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, 1 - .15)
                        unit.cost.food = multiplyNumber(unit.cost.food, 1 - .15)
                        unit.cost.gold = multiplyNumber(unit.cost.gold, 1 - .15)
                        unit.cost.stone = multiplyNumber(unit.cost.stone, 1 - .15)
                    }
                }
            }],
            affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar, stableUnits.knight, stableUnits.cavalier, stableUnits.camelRider, stableUnits.heavyCamelRider],
            affectedUpgrades: []
        },
        {
            id: 'berbers3',
            effectType: EffectType.movementSpeed,
            value: 10,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.1)
                }
            }],
            affectedUnits: [
                dockUnits.fishingShip, dockUnits.transportShip,
                dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip,
                dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon
            ],
            affectedUpgrades: []
        },
        {
            id: 'berbers4',
            effectType: EffectType.uniqueUnit,
            value: null,
            affectedUnits: [berbersUniqueUnits.eliteGenitour],
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
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
            genitourLine,
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
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
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            uniqueUnitsLine,
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
            universityUpgrades.treadmillCrane,
            universityUpgrades.chemistry,
            universityUpgrades.siegeEngineers,
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

setCivOnUniqueTechs(uniqueTechs, berbersTechTree)
setCivOnUniqueTechs(berbersTechTree.bonuses, berbersTechTree)