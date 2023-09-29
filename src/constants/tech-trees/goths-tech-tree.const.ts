import { EffectType, UniqueTech } from "../../models/bonus.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/goths.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, addNumber, multiplyNumber } from "../../utils/utils";
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

export const gothsUniqueUnits: { huskarl: Unit, eliteHuskarl: Unit } = {
    huskarl: new Unit({
        id: 'huskarl',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 6, type: ArmorType.archer },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 6, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.05,
            lineOfSight: 3,
        },
        duration: 16
    }),
    eliteHuskarl: new Unit({
        id: 'eliteHuskarl',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 80,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 10, type: ArmorType.archer },
                { value: 3, type: ArmorType.eagleWarrior },
                { value: 3, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.05,
            lineOfSight: 5,
        },
        duration: 16
    })
}

chainTechs([gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl])
const uniqueUnitLine = new UnitLine([gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])

const uniqueTechs = [
    new UniqueTech({
        id: 'anarchy',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 450, gold: 250, stone: 0 },
        duration: 40,
        affectedUnits: [gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'perfusion',
        age: 4,
        effectType: EffectType.creationSpeed,
        value: 40,
        cost: { wood: 400, food: 0, gold: 600, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.duration = multiplyNumber(unit.duration, 1/2)
            }
        }],
        duration: 40,
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion, barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier, gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl],
        affectedUpgrades: []
    })
]

export const gothsTechTree: CivTechTree = {
    id: 'goths',
    crest,
    wikiUrl: 'Goths',
    bonuses: [
        {
            id: 'goths1',
            effectType: EffectType.discount,
            value: { age1: 20, age2: 25, age3: 30, age4: 35 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.35))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.35))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.35))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.35))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.30))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.30))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.30))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.30))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.25))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.25))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.25))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.25))
                    } else {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.20))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.20))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.20))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.20))
                    }
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl],
            affectedUpgrades: []
        },
        {
            id: 'goths2',
            effectType: EffectType.miscallenous,
            value: { age2: 1, age3: 2, age4: 3 },
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.addAttackComponent(1, ArmorType.standardBuilding)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.addAttackComponent(1, ArmorType.standardBuilding)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.addAttackComponent(1, ArmorType.standardBuilding)
                    }
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl],
            affectedUpgrades: []
        },
        {
            id: 'goths3',
            effectType: EffectType.miscallenous,
            value: 15,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'goths4',
            effectType: EffectType.miscallenous,
            value: 10,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'goths5',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.loom]
        },
        {
            id: 'goths6',
            effectType: EffectType.miscallenous,
            value: 20,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'goths7',
            effectType: EffectType.creationSpeed,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.2)
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                gothsUniqueUnits.huskarl, gothsUniqueUnits.eliteHuskarl],
            affectedUpgrades: [barracksUpgrade.squires],
            team: true
        }
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.squires])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
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
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.herbalMedecine,
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
            universityUpgrades.ballistics,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
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
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.dromon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, gothsTechTree)
setCivOnUniqueTechs(gothsTechTree.bonuses, gothsTechTree)