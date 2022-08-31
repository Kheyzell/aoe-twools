import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CapacityId, HealingCapacity } from "../../models/capacity.model";
import { UnitType, EffectOrder, ArmorType, CivTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/teutons.png';
import { chainTechs, getAllCivUnits, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray } from "../../utils/utils";
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

export const teutonsUniqueUnits: { teutonicKnight: Unit, eliteTeutonicKnight: Unit } = {
    teutonicKnight: new Unit({
        id: 'teutonicKnight',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 85,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 14, type: ArmorType.melee },
                { value: 4, type: ArmorType.standardBuilding },
                { value: 4, type: ArmorType.eagleWarrior },
            ],
            armorComponents: [
                { value: 7, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .8,
            lineOfSight: 3,
        },
        duration: 12
    }),
    eliteTeutonicKnight: new Unit({
        id: 'eliteTeutonicKnight',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 85,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 100,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 17, type: ArmorType.melee },
                { value: 4, type: ArmorType.standardBuilding },
                { value: 4, type: ArmorType.eagleWarrior },
            ],
            armorComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .8,
            lineOfSight: 5,
        },
        duration: 12
    })
}

chainTechs([teutonsUniqueUnits.teutonicKnight, teutonsUniqueUnits.eliteTeutonicKnight])
const uniqueUnitLine = new UnitLine([teutonsUniqueUnits.teutonicKnight, teutonsUniqueUnits.eliteTeutonicKnight])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson])

const uniqueTechs = [
    new UniqueTech({
        id: 'ironclad',
        age: 3,
        effectType: EffectType.meleeArmor,
        value: 4,
        cost: { wood: 400, food: 0, gold: 350, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(4, ArmorType.melee)
            }
        }],
        duration: 60,
        affectedUnits: [siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager, siegeUnits.scorpion, siegeUnits.heavyScorpion, siegeUnits.siegeTower, siegeUnits.bombardCannon],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'crenellations',
        age: 4,
        effectType: EffectType.range,
        value: 3,
        cost: { wood: 0, food: 600, gold: 0, stone: 400 },
        duration: 60,
        affectedUnits: [],
        affectedUpgrades: []
    })
]

export const teutonsTechTree: CivTechTree = {
    id: 'teutons',
    crest,
    wikiUrl: 'Teutons',
    bonuses: [],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
            new UnitLine([barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier]),
        ],
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson])
    },
    archery: {
        unitLines: [
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
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
            universityUpgrades.heatedShot,
            universityUpgrades.murderHoles,
            universityUpgrades.treadmillCrane,
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
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
        ])
    }
}

teutonsTechTree.bonuses = [
    {
        id: 'teutons1',
        effectType: EffectType.miscallenous,
        value: 100,
        effects: [{
            order: EffectOrder.first,
            apply: unit => {
                const healingCapacity = unit.getCapacity(CapacityId.healing) as HealingCapacity
                if (healingCapacity) {
                    healingCapacity.range = healingCapacity.range * 2
                }
            }
        }],
        affectedUnits: [monasteryUnits.monk],
        affectedUpgrades: []
    },
    {
        id: 'teutons2',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'teutons3',
        effectType: EffectType.freeUpgrade,
        value: null,
        affectedUnits: [],
        affectedUpgrades: [monasteryUpgrade.herbalMedecine, universityUpgrades.murderHoles]
    },
    {
        id: 'teutons4',
        effectType: EffectType.discount,
        value: 40,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'teutons5',
        effectType: EffectType.meleeArmor,
        value: { age3: 1, age4: 2 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit, upgrades) => {
                addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                unit.addArmorComponent(1, ArmorType.melee)
                if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                    unit.addArmorComponent(1, ArmorType.melee)
                }
                if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                    unit.addArmorComponent(1, ArmorType.melee)
                }
            }
        }],
        affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
            barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
            stableUnits.scoutCavalry,
            stableUnits.knight, stableUnits.cavalier, stableUnits.paladin],
        affectedUpgrades: []
    },
    {
        id: 'teutons6',
        effectType: EffectType.miscallenous,
        value: 10,
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'teutons7',
        effectType: EffectType.convertionResistance,
        value: 2,
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.conversionResistance = (unit.stats.conversionResistance || 0) + 2
            }
        }],
        affectedUnits: getAllCivUnits(teutonsTechTree),
        affectedUpgrades: [],
        hideInUnitRecap: true,
        team: true
    },
]

setCivOnUniqueTechs(uniqueTechs, teutonsTechTree)
setCivOnUniqueTechs(teutonsTechTree.bonuses, teutonsTechTree)