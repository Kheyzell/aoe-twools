import { EffectType, UniqueTech } from "../../models/bonus.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import { CAPACITIES } from "../../models/capacity.model";
import crest from '../../resources/images/crests/sicilians.png';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
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
import { multiplyNumber } from "../../utils/utils";

export const siciliansUniqueUnits: { serjeant: Unit, eliteSerjeant: Unit } = {
    serjeant: new Unit({
        id: 'serjeant',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 35,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 5, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .9,
            lineOfSight: 3,
        },
        duration: 12
    }),
    eliteSerjeant: new Unit({
        id: 'eliteSerjeant',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 35,
            stone: 0
        },
        stats: {
            health: 85,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 11, type: ArmorType.melee },
                { value: 3, type: ArmorType.eagleWarrior },
                { value: 3, type: ArmorType.standardBuilding }
            ],
            armorComponents: [
                { value: 4, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .9,
            lineOfSight: 5,
        },
        duration: 12
    })
}

chainTechs([siciliansUniqueUnits.serjeant, siciliansUniqueUnits.eliteSerjeant])
const uniqueUnitLine = new UnitLine([siciliansUniqueUnits.serjeant, siciliansUniqueUnits.eliteSerjeant])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson,])
siciliansUniqueUnits.serjeant.affectingUpgrades.push(townCenterUpgrade.castleAge)

const uniqueTechs = [
    new UniqueTech({
        id: 'firstCrusade',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 300, gold: 600, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.conversionResistance = unit.stats.conversionResistance + 3
            }
        }],
        duration: 60,
        affectedUnits: [siciliansUniqueUnits.serjeant, siciliansUniqueUnits.eliteSerjeant],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'hauberk',
        age: 4,
        effectType: EffectType.armor,
        value: 1,
        cost: { wood: 0, food: 500, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(2, ArmorType.pierce)
            }
        }],
        duration: 45,
        affectedUnits: [stableUnits.knight, stableUnits.cavalier],
        affectedUpgrades: []
    })
]

export const siciliansTechTree: CivTechTree = {
    id: 'sicilians',
    crest,
    wikiUrl: 'Sicilians',
    bonuses: [
        {
            id: 'sicilians1',
            effectType: EffectType.constructionSpeed,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'sicilians2',
            effectType: EffectType.miscallenous,
            value: 50,
            effects: [{
                order: EffectOrder.last,
                apply: (unit, _, targetedUnit) => {
                    targetedUnit?.stats.attackComponents
                        .filter(attack => attack.type !== ArmorType.melee && attack.type !== ArmorType.pierce)
                        .filter(attack => unit.stats.armorComponents.some(armor => armor.type === attack.type))
                        .forEach(attack => attack.value = attack.value / 2)
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester,
                archeryUnits.skirmisher, archeryUnits.eliteSkirmisher,
                archeryUnits.cavalryArcher,
                stableUnits.scoutCavalry, stableUnits.lightCavalry,
                stableUnits.knight, stableUnits.cavalier,
                siciliansUniqueUnits.serjeant, siciliansUniqueUnits.eliteSerjeant],
            affectedUpgrades: []
        },
        {
            id: 'sicilians3',
            effectType: EffectType.miscallenous,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: [millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation]
        },
        {
            id: 'sicilians4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'sicilians5',
            effectType: EffectType.resourceStone,
            value: 100,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'sicilians6',
            effectType: EffectType.miscallenous,
            value: null,
            effects: [{
                order: EffectOrder.first,
                apply: (unit: Unit) => {
                    unit.stats.lineOfSight += 5
                    unit.cost.wood = multiplyNumber(unit.cost.wood, .5)
                    unit.cost.food = multiplyNumber(unit.cost.food, .5)
                    unit.cost.gold = multiplyNumber(unit.cost.gold, .5)
                    unit.cost.stone = multiplyNumber(unit.cost.stone, .5)
                }
            }],
            affectedUnits: [dockUnits.transportShip],
            affectedUpgrades: [],
            team: true
        },
    ],
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
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher]),
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
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
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
        ])
    },
    university: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            universityUpgrades.masonry,
            universityUpgrades.ballistics,
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
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fastFireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, siciliansTechTree)
setCivOnUniqueTechs(siciliansTechTree.bonuses, siciliansTechTree)