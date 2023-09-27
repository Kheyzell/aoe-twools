import { Bonus, EffectType, UniqueTech } from "../../models/bonus.model";
import { UnitType, EffectOrder, ArmorType, CivTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/aztecs.png';
import { chainTechs, getAllCivMilitaryUnits, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray, multiplyNumber } from "../../utils/utils";
import { monasteryTechs } from "../GroupTechTree/monastery-tech-tree.const";
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
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

export const aztecsUniqueUnits: { jaguarWarrior: Unit, eliteJaguarWarrior: Unit } = {
    jaguarWarrior: new Unit({
        id: 'jaguarWarrior',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 65,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 10, type: ArmorType.infantry },
                { value: 10, type: ArmorType.condottiero },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1,
            lineOfSight: 3,
        },
        duration: 12
    }),
    eliteJaguarWarrior: new Unit({
        id: 'eliteJaguarWarrior',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 60,
            food: 0,
            gold: 30,
            stone: 0
        },
        stats: {
            health: 75,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 12, type: ArmorType.melee },
                { value: 11, type: ArmorType.infantry },
                { value: 10, type: ArmorType.condottiero },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1,
            lineOfSight: 5,
        },
        duration: 12
    })
}

chainTechs([aztecsUniqueUnits.jaguarWarrior, aztecsUniqueUnits.eliteJaguarWarrior])
const uniqueUnitLine = new UnitLine([aztecsUniqueUnits.jaguarWarrior, aztecsUniqueUnits.eliteJaguarWarrior])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])

const uniqueTechs = [
    new UniqueTech({
        id: 'atlatl',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 400, gold: 350, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(1, ArmorType.pierce)
                unit.stats.range! += 1
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.skirmisher, archeryUnits.eliteSkirmisher],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'garlandWars',
        age: 4,
        effectType: EffectType.damage,
        value: 4,
        cost: { wood: 0, food: 450, gold: 750, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(4, ArmorType.melee)
            }
        }],
        duration: 60,
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion, barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior, aztecsUniqueUnits.jaguarWarrior, aztecsUniqueUnits.eliteJaguarWarrior],
        affectedUpgrades: []
    })
]

export const aztecsTechTree: CivTechTree = {
    id: 'aztecs',
    crest,
    wikiUrl: 'Aztecs_(Age_of_Empires_II)',
    bonuses: [],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman]),
            new UnitLine([barracksUnits.eagleScout, barracksUnits.eagleWarrior, barracksUnits.eliteEagleWarrior]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.gambesons, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: { unitLines: [], upgrades: new UpgradePerAgeGroup([]) },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
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
            monasteryUpgrade.faith,
            monasteryUpgrade.illumination,
            monasteryUpgrade.blockPrinting,
            monasteryUpgrade.theocracy,
        ])
    },
    university: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
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
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.tradeCog]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

const bonuses: Bonus[] = [
    {
        id: 'aztecs1',
        effectType: EffectType.miscallenous,
        value: null,
        effects: [{
            order: EffectOrder.first,
            apply: unit => {
                // unit.carry + 3
            }
        }],
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    },
    {
        id: 'aztecs2',
        effectType: EffectType.creationSpeed,
        value: 11,
        effects: [{
            order: EffectOrder.last,
            apply: unit => {
                unit.duration = multiplyNumber(unit.duration, 1/1.11)
            }
        }],
        affectedUnits: getAllCivMilitaryUnits(aztecsTechTree),
        affectedUpgrades: [],
        hideInUnitRecap: true
    },
    {
        id: 'aztecs3',
        effectType: EffectType.miscallenous,
        value: 5,
        effects: [{
            order: EffectOrder.first,
            apply: (unit, upgrades) => {
                addElementIfNotInArray(unit.affectingUpgrades, monasteryUpgrade.herbalMedecine)
                const monasteryUpgrades = upgrades?.filter(up => monasteryTechs.upgrades.list.some(monasteryUpgrade => monasteryUpgrade.id === up.id))
                unit.stats.health += monasteryUpgrades!.length * 5
            }
        }],
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: []
    },
    {
        id: 'aztecs4',
        effectType: EffectType.resourceGold,
        value: 50,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'aztecs5',
        effectType: EffectType.miscallenous,
        value: 33,
        affectedUnits: [],
        affectedUpgrades: [],
        team: true
    }
]

aztecsTechTree.bonuses = bonuses

setCivOnUniqueTechs(uniqueTechs, aztecsTechTree)
setCivOnUniqueTechs(bonuses, aztecsTechTree)