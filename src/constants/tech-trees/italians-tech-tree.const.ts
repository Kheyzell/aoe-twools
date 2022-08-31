import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
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
import crest from '../../resources/images/crests/italians.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber, addNumber } from "../../utils/utils";
import { AttackType, Unit } from "../../models/unit.model";

export const italiansUniqueUnits: { genoeseCrossbowman: Unit, eliteGenoeseCrossbowman: Unit, condottiero: Unit } = {
    genoeseCrossbowman: new Unit({
        id: 'genoeseCrossbowman',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 45,
            food: 0,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: 1,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 5, type: ArmorType.cavalry },
                { value: 5, type: ArmorType.warElephant },
                { value: 4, type: ArmorType.camel },
                { value: 4, type: ArmorType.ship },
                { value: 4, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 8,
        },
        duration: 18
    }),
    eliteGenoeseCrossbowman: new Unit({
        id: 'eliteGenoeseCrossbowman',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 45,
            food: 0,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 50,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: 1,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 7, type: ArmorType.cavalry },
                { value: 7, type: ArmorType.warElephant },
                { value: 6, type: ArmorType.camel },
                { value: 5, type: ArmorType.ship },
                { value: 5, type: ArmorType.fishingShip },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 8,
        },
        duration: 14
    }),
    condottiero: new Unit({
        id: 'condottiero',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 50,
            gold: 35,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 1.9,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 10, type: ArmorType.gunpowderUnit },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 10, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
                { value: 0, type: ArmorType.condottiero }
            ],
            movementSpeed: 1.2,
            lineOfSight: 6,
        },
        duration: 18
    })
}

chainTechs([italiansUniqueUnits.genoeseCrossbowman, italiansUniqueUnits.eliteGenoeseCrossbowman])
const uniqueUnitLine = new UnitLine([italiansUniqueUnits.genoeseCrossbowman, italiansUniqueUnits.eliteGenoeseCrossbowman])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const condottieroLine = new UnitLine([italiansUniqueUnits.condottiero])
setAffectingUpgrades(condottieroLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])

const uniqueTechs = [
    new UniqueTech({
        id: 'pavise',
        age: 3,
        effectType: EffectType.armor,
        value: 1,
        cost: { wood: 0, food: 300, gold: 150, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(1, ArmorType.pierce)
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, italiansUniqueUnits.genoeseCrossbowman, italiansUniqueUnits.eliteGenoeseCrossbowman, italiansUniqueUnits.condottiero],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'silkRoad',
        age: 4,
        effectType: EffectType.discount,
        value: 50,
        cost: { wood: 0, food: 500, gold: 250, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.cost.wood = unit.cost.wood / 2
                unit.cost.food = unit.cost.food / 2
                unit.cost.gold = unit.cost.gold / 2
                unit.cost.stone = unit.cost.stone / 2
            }
        }],
        duration: 60,
        affectedUnits: [marketUnits.tradeCart],
        affectedUpgrades: []
    })
]

export const italiansTechTree: CivTechTree = {
    id: 'italians',
    crest,
    wikiUrl: 'Italians',
    bonuses: [
        {
            id: 'italians1',
            effectType: EffectType.discount,
            value: 33,
            affectedUnits: [dockUnits.galleon, dockUnits.fastFireShip, dockUnits.demotionShip, dockUnits.eliteCannonGalleon],
            affectedUpgrades: [dockUpgrades.gillnets, dockUpgrades.careening, dockUpgrades.shipwright, dockUpgrades.dryDock, universityUpgrades.masonry, universityUpgrades.fortifiedWall, universityUpgrades.ballistics, universityUpgrades.guardTower, universityUpgrades.heatedShot, universityUpgrades.murderHoles, universityUpgrades.treadmillCrane, universityUpgrades.architecture, universityUpgrades.chemistry, universityUpgrades.bombardTower, universityUpgrades.keep, universityUpgrades.arrowslits]
        },
        {
            id: 'italians2',
            effectType: EffectType.discount,
            value: 15,
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.15))
                    unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.15))
                    unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.15))
                    unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.15))
                }
            }],
            affectedUnits: [dockUnits.fishingShip],
            affectedUpgrades: []
        },
        {
            id: 'italians3',
            effectType: EffectType.discount,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit, upgrades) => {
                    unit.cost.wood = multiplyNumber(unit.cost.wood, addNumber(1, -.2))
                    unit.cost.food = multiplyNumber(unit.cost.food, addNumber(1, -.2))
                    unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.2))
                    unit.cost.stone = multiplyNumber(unit.cost.stone, addNumber(1, -.2))
                }
            }],
            affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.eliteCannonGalleon],
            affectedUpgrades: []
        },
        {
            id: 'italians4',
            effectType: EffectType.discount,
            value: 15,
            affectedUnits: [],
            affectedUpgrades: [townCenterUpgrade.feudalAge, townCenterUpgrade.castleAge, townCenterUpgrade.imperialAge]
        },
        {
            id: 'italians5',
            effectType: EffectType.uniqueUnit,
            value: null,
            affectedUnits: [italiansUniqueUnits.condottiero],
            affectedUpgrades: [],
            team: true
        },
    ],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
            condottieroLine
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
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
            universityUpgrades.arrowslits
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
            townCenterUpgrade.townPatrol
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
            dockUpgrades.shipwright,
            dockUpgrades.dryDock
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, italiansTechTree)
setCivOnUniqueTechs(italiansTechTree.bonuses, italiansTechTree)