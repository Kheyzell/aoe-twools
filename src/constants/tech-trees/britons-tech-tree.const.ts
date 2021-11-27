import { EffectType, UniqueTech } from "../../models/bonus.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/britons.png';
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

export const britonsUniqueUnits: { longbowman: Unit, eliteLongbowman: Unit } = {
    longbowman: new Unit({
        id: 'longbowman',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 0,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 35,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 5,
            accuracy: .7,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 7,
        },
        duration: 18
    }),
    eliteLongbowman: new Unit({
        id: 'eliteLongbowman',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 0,
            gold: 40,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: .8,
            attackComponents: [
                { value: 7, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit }
            ],
            movementSpeed: .96,
            lineOfSight: 8,
        },
        duration: 18
    })
}

chainTechs([britonsUniqueUnits.longbowman, britonsUniqueUnits.eliteLongbowman])
const uniqueUnitLine = new UnitLine([britonsUniqueUnits.longbowman, britonsUniqueUnits.eliteLongbowman])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const uniqueTechs = [
    new UniqueTech({
        id: 'yeomen',
        age: 3,
        effectType: EffectType.range,
        value: 1,
        cost: { wood: 750, food: 0, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.range! += 1
            }
        }],
        duration: 60,
        affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, britonsUniqueUnits.longbowman, britonsUniqueUnits.eliteLongbowman],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'warwolf',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 800, food: 0, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.accuracy = 1
            }
        }],
        duration: 40,
        affectedUnits: [castleUnits.trebuchet],
        affectedUpgrades: []
    })
]

export const britonsTechTree: CivTechTree = {
    id: 'britons',
    wikiUrl: 'Britons',
    crest,
    bonuses: [
        {
            id: 'britons1',
            effectType: EffectType.discoutWood,
            value: { age3: 50, age4: 50 },
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'britons2',
            effectType: EffectType.range,
            value: { age3: 1, age4: 2 },
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.castleAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.castleAge.id)) {
                        unit.stats.range! += 1
                    }
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.stats.range! += 1
                    }
                }
            }],
            affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, britonsUniqueUnits.longbowman, britonsUniqueUnits.eliteLongbowman],
            affectedUpgrades: []
        },
        {
            id: 'britons3',
            effectType: EffectType.miscallenous,
            value: 25,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'britons4',
            effectType: EffectType.creationSpeed,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.20)
                }
            }],
            affectedUnits: [archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester, archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher],
            affectedUpgrades: [],
            team: true
        }
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
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
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
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
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

setCivOnUniqueTechs(uniqueTechs, britonsTechTree)
setCivOnUniqueTechs(britonsTechTree.bonuses, britonsTechTree)