import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/celts.png';
import { setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber, roundHundredth } from "../../utils/utils";
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

export const celtsUniqueUnits: { woadRaider: Unit, eliteWoadRaider: Unit } = {
    woadRaider: new Unit({
        id: 'woadRaider',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 25,
            stone: 0
        },
        duration: 10
    }),
    eliteWoadRaider: new Unit({
        id: 'eliteWoadRaider',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 25,
            stone: 0
        },
        duration: 10
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'stronghold',
        age: 3,
        effectType: EffectType.fireRate,
        value: 25,
        cost: { wood: 0, food: 250, gold: 200, stone: 0 },
        duration: 30,
        affectedUnits: [],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'furorCeltica',
        age: 4,
        effectType: EffectType.healthPercent,
        value: 40,
        cost: { wood: 0, food: 750, gold: 450, stone: 0 },
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.stats.health = multiplyNumber(unit.stats.health, 1.4)
            }
        }],
        duration: 50,
        affectedUnits: [siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam, siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager, siegeUnits.scorpion, siegeUnits.heavyScorpion, siegeUnits.siegeTower],
        affectedUpgrades: []
    })
]

export const celtsTechTree: CivTechTree = {
    id: 'celts',
    crest,
    wikiUrl: 'Celts',
    bonuses: [
        {
            id: 'celts1',
            effectType: EffectType.movementSpeed,
            value: { age2: 15, age3: 15, age4: 15 },
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.stats.movementSpeed = multiplyNumber(unit.stats.movementSpeed, 1.15)
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
                celtsUniqueUnits.woadRaider, celtsUniqueUnits.eliteWoadRaider],
            affectedUpgrades: []
        },
        {
            id: 'celts2',
            effectType: EffectType.miscallenous,
            value: 15,
            affectedUnits: [townCenterUnits.villager],
            affectedUpgrades: []
        },
        {
            id: 'celts3',
            effectType: EffectType.fireRate,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.multiplyAttackRate(1.25)
                }
            }],
            affectedUnits: [siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam, siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager, siegeUnits.scorpion, siegeUnits.heavyScorpion],
            affectedUpgrades: []
        },
        {
            id: 'celts4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'celts5',
            effectType: EffectType.creationSpeed,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.duration = multiplyNumber(unit.duration, 1/1.2)
                }
            }],
            affectedUnits: [siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam, siegeUnits.mangonel, siegeUnits.onager, siegeUnits.siegeOnager, siegeUnits.scorpion, siegeUnits.heavyScorpion, siegeUnits.siegeTower],
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
        upgrades: new UpgradePerAgeGroup([barracksUpgrade.supplies, barracksUpgrade.arson])
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
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.husbandry])
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
            new UnitLine([celtsUniqueUnits.woadRaider, celtsUniqueUnits.eliteWoadRaider]),
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
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            universityUpgrades.keep,
            universityUpgrades.arrowslits,
        ])
    },
    townCenter: {
        unitLines: [new UnitLine([townCenterUnits.villager])],
        upgrades: new UpgradePerAgeGroup([
            townCenterUpgrade.feudalAge,
            townCenterUpgrade.loom,
            townCenterUpgrade.casteAge,
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
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
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

setCivOnUniqueTechs(uniqueTechs, celtsTechTree)
setCivOnUniqueTechs(celtsTechTree.bonuses, celtsTechTree)