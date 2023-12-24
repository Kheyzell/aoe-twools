import { Bonus, EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES } from "../../models/capacity.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/armenians.webp';
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
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

export const armeniansUniqueUnits: { compositeBowman: Unit, eliteCompositeBowman: Unit, warriorPriest: Unit } = {
    compositeBowman: new Unit({
        id: 'compositeBowman',
        unique: true,
        wikiUrl: 'Composite_Bowman_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 40,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: 1,
            attackComponents: [
                { value: 4, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .96,
            lineOfSight: 7,
            capacities: [CAPACITIES.ignoreArmor]
        },
        duration: 12
    }),
    eliteCompositeBowman: new Unit({
        id: 'eliteCompositeBowman',
        unique: true,
        wikiUrl: 'Composite_Bowman_(Age_of_Empires_II)',
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 35,
            food: 0,
            gold: 45,
            stone: 0
        },
        stats: {
            health: 45,
            rateOfFire: 2,
            attackType: AttackType.projectile,
            range: 4,
            accuracy: 1,
            attackComponents: [
                { value: 4, type: ArmorType.pierce },
                { value: 2, type: ArmorType.spearman }
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .96,
            lineOfSight: 7,
            capacities: [CAPACITIES.ignoreArmor]
        },
        duration: 10
    }),
    warriorPriest: new Unit({
        id: 'warriorPriest',
        unique: true,
        wikiUrl: 'Warrior_Priest_(Age_of_Empires_II)',
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 30,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 80,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 11, type: ArmorType.melee }
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.monk },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .85,
            lineOfSight: 5,
            capacities: [CAPACITIES.healing]
        },
        duration:30
    })
}

chainTechs([armeniansUniqueUnits.compositeBowman, armeniansUniqueUnits.eliteCompositeBowman])
const uniqueUnitLine = new UnitLine([armeniansUniqueUnits.compositeBowman, armeniansUniqueUnits.eliteCompositeBowman])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer, 
    blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    archeryUpgrades.thumbRing,
    universityUpgrades.ballistics, universityUpgrades.chemistry])

const warriorMonkLine = new UnitLine([armeniansUniqueUnits.warriorPriest])
setAffectingUpgrades(warriorMonkLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson,
    monasteryUpgrade.sanctity,
    monasteryUpgrade.fervor])

const uniqueTechs = [
    new UniqueTech({
        id: 'cilicianFleet',
        age: 3,
        effectType: EffectType.miscallenous,
        value: { blastRadiusPercent: 20, galleyRange: 1 },
        cost: { wood: 350, food: 0, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                const isGalleyLine = unit.id === dockUnits.galley.id || unit.id === dockUnits.warGalley.id || unit.id === dockUnits.galleon.id
                const isDromon = unit.id === dockUnits.dromon.id
                if (isGalleyLine || isDromon) {
                    unit.stats.range! += 1
                }

                // if isDemolitionShipLine increase blast radius (not calculated in the application)
            }
        }],
        duration: 45,
        affectedUnits: [
            dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
            dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
            dockUnits.dromon,
        ],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'fereters',
        age: 4,
        effectType: EffectType.health,
        value: { health: 30, healingPercent: 100 },
        cost: { wood: 0, food: 550, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.health += 30
            }
        }],
        duration: 60,
        affectedUnits: [
            barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
            armeniansUniqueUnits.warriorPriest
        ],
        affectedUpgrades: []
    })
]

export const armeniansTechTree: CivTechTree = {
    id: 'armenians',
    crest,
    wikiUrl: 'Armenians',
    bonuses: [],
    uniqueTechs,
    barracks: {
        unitLines: [
            new UnitLine([barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion]),
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
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [
            new UnitLine([monasteryUnits.monk]),
            warriorMonkLine
        ],
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
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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
            dockUpgrades.dryDock,
        ])
    }
}

const bonuses: Bonus[] = [
    {
        id: 'armenians1',
        effectType: EffectType.discount,
        value: 25,
        effects: [],
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'armenians2',
        effectType: EffectType.miscallenous,
        value: 40,
        effects: [],
        affectedUnits: [],
        affectedUpgrades: [
            lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw,
            miningCampUpgrades.goldMining, miningCampUpgrades.goldShaftMining,
            miningCampUpgrades.stoneMining,
        ],
    },
    {
        id: 'armenians3',
        effectType: EffectType.miscallenous,
        value: null,
        effects: [],
        affectedUnits: [],
        affectedUpgrades: []
    },
    {
        id: 'armenians4',
        effectType: EffectType.miscallenous,
        value: null,
        affectedUnits: [
            barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
            barracksUnits.pikeman, barracksUnits.spearman, barracksUnits.halberdier,
        ],
        affectedUpgrades: []
    },
    {
        id: 'armenians5',
        effectType: EffectType.miscallenous,
        value: { proctileNumber: 1, projectileDamage: 1 },
        effects: [{
            order: EffectOrder.first,
            apply: unit => {
                const isGalley = unit.id === dockUnits.galley.id || unit.id === dockUnits.warGalley.id || unit.id === dockUnits.galleon.id
                if (isGalley) {
                    unit.stats.secondaryAttack = {
                        count: 1,
                        accuracy: 1,
                        components: [{ value: 1, type: ArmorType.pierce }]
                    }
                }

                const isDromon = unit.id === dockUnits.dromon.id
                if (isDromon) {
                    unit.stats.secondaryAttack!.count++ 
                }
            }
        }],
        affectedUnits: [
            dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
            dockUnits.dromon,
        ],
        affectedUpgrades: [],
    },
    {
        id: 'armenians6',
        effectType: EffectType.miscallenous,
        value: 2,
        effects: [{
            order: EffectOrder.first,
            apply: unit => unit.stats.lineOfSight += 2
        }],
        affectedUnits: [
            barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
            barracksUnits.pikeman, barracksUnits.spearman, barracksUnits.halberdier,
            armeniansUniqueUnits.warriorPriest,
        ],
        affectedUpgrades: [],
        team: true
    },
]

armeniansTechTree.bonuses = bonuses

setCivOnUniqueTechs(uniqueTechs, armeniansTechTree)
setCivOnUniqueTechs(bonuses, armeniansTechTree)