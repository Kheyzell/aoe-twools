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
import crest from '../../resources/images/crests/malay.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber, addNumber } from "../../utils/utils";
import { CAPACITIES } from "../../models/capacity.model";

export const malayUniqueUnits: { karambitWarrior: Unit, eliteKarambitWarrior: Unit } = {
    karambitWarrior: new Unit({
        id: 'karambitWarrior',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 25,
            gold: 15,
            stone: 0
        },
        stats: {
            health: 30,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.2,
            lineOfSight: 3,
            capacities: [CAPACITIES.halfPopulation]
        },
        duration: 6
    }),
    eliteKarambitWarrior: new Unit({
        id: 'eliteKarambitWarrior',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 25,
            gold: 15,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: 1.2,
            lineOfSight: 3,
            capacities: [CAPACITIES.halfPopulation]
        },
        duration: 6
    })
}

chainTechs([malayUniqueUnits.karambitWarrior, malayUniqueUnits.eliteKarambitWarrior])
const uniqueUnitLine = new UnitLine([malayUniqueUnits.karambitWarrior, malayUniqueUnits.eliteKarambitWarrior])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])

const uniqueTechs = [
    new UniqueTech({
        id: 'thalassocracy',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 300, gold: 300, stone: 0 },
        duration: 40,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'forcedLevy',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 850, gold: 500, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.cost.food += unit.cost.gold
                unit.cost.gold = 0
            }
        }],
        duration: 40,
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman],
        affectedUpgrades: []
    })
]

export const malayTechTree: CivTechTree = {
    id: 'malay',
    crest,
    wikiUrl: 'Malay',
    bonuses: [
        {
            id: 'malay1',
            effectType: EffectType.miscallenous,
            value: 66,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.feudalAge, townCenterUpgrade.castleAge, townCenterUpgrade.imperialAge]
        },
        {
            id: 'malay2',
            effectType: EffectType.discount,
            value: 33,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'malay3',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'malay4',
            effectType: EffectType.discount,
            value: { age3: 30, age4: 40 },
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.40))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.40))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.40))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.40))
                    } else
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.30))
                        unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.30))
                        unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.30))
                        unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.30))
                    }
                }
            }],
            affectedUnits: [stableUnits.battleElephant, stableUnits.eliteBattleElephant],
            affectedUpgrades: []
        },
        {
            id: 'malay5',
            effectType: EffectType.armor,
            value: null,
            effects: [],
            affectedUnits: [
                barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                malayUniqueUnits.karambitWarrior, malayUniqueUnits.eliteKarambitWarrior,
            ],
            affectedUpgrades: [blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor]
        },
        {
            id: 'malay6',
            effectType: EffectType.lineOfSightPercent,
            value: 100,
            affectedUnits: [],
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
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
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
            new UnitLine([malayUniqueUnits.karambitWarrior, malayUniqueUnits.eliteKarambitWarrior]),
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
            blacksmithUpgrades.scaleBardingArmor,
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
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
        ])
    },
    university: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.ballistics,
            universityUpgrades.guardTower,
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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

setCivOnUniqueTechs(uniqueTechs, malayTechTree)
setCivOnUniqueTechs(malayTechTree.bonuses, malayTechTree)