import { EffectType, UniqueTech } from "../../models/bonus.model";
import { CAPACITIES, CapacityId, ConvertionCapacity } from "../../models/capacity.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/spanish.png';
import { chainTechs, getAllCivUpgrades, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
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

export const spanishUniqueUnits: { conquistador: Unit, eliteConquistador: Unit, missionary: Unit } = {
    conquistador: new Unit({
        id: 'conquistador',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 2.9,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: .65,
            attackComponents: [
                { value: 16, type: ArmorType.pierce },
                { value: 4, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 1, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.3,
            lineOfSight: 8,
        },
        duration: 24
    }),
    eliteConquistador: new Unit({
        id: 'eliteConquistador',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 60,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 2.9,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: .7,
            attackComponents: [
                { value: 18, type: ArmorType.pierce },
                { value: 6, type: ArmorType.ram },
                { value: 2, type: ArmorType.building },
            ],
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 2, type: ArmorType.pierce },
                { value: 0, type: ArmorType.archer },
                { value: 0, type: ArmorType.cavalryArcher },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.3,
            lineOfSight: 9,
        },
        duration: 24
    }),
    missionary: new Unit({
        id: 'missionary',
        unique: true,
        age: 3,
        unitType: UnitType.civilian,
        cost: {
            wood: 0,
            food: 0,
            gold: 100,
            stone: 0
        },
        stats: {
            health: 30,
            range: 7,
            rateOfFire: 62,
            accuracy: .26,
            attackType: AttackType.melee,
            attackComponents: [],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.cavalry },
                { value: 0, type: ArmorType.monk },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.1,
            lineOfSight: 9,
            capacities: [CAPACITIES.conversion, CAPACITIES.healing]
        },
        duration: 51
    })
}

chainTechs([spanishUniqueUnits.conquistador, spanishUniqueUnits.eliteConquistador])
const uniqueUnitLine = new UnitLine([spanishUniqueUnits.conquistador, spanishUniqueUnits.eliteConquistador])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
    stableUpgrades.bloodlines, stableUpgrades.husbandry])

const missionaryLine = new UnitLine([spanishUniqueUnits.missionary])
setAffectingUpgrades(missionaryLine, [
    monasteryUpgrade.redemption,
    monasteryUpgrade.atonement,
    monasteryUpgrade.herbalMedecine,
    monasteryUpgrade.heresy,
    monasteryUpgrade.sanctity,
    monasteryUpgrade.fervor,
    monasteryUpgrade.faith,
    monasteryUpgrade.illumination,
    monasteryUpgrade.blockPrinting,
    monasteryUpgrade.theocracy])

const uniqueTechs = [
    new UniqueTech({
        id: 'inquisition',
        age: 3,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 100, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                const conversion = unit.stats.capacities.find(capacity => capacity.id === CapacityId.conversion) as ConvertionCapacity
                if (!!conversion) {
                    conversion.conversionCyclesMin = conversion.conversionCyclesMin - 1
                    conversion.conversionCyclesMax = conversion.conversionCyclesMax - 1
                }

                if (unit.id === spanishUniqueUnits.missionary.id) {
                    unit.stats.range! += 1
                }
            }
        }],
        duration: 40,
        affectedUnits: [monasteryUnits.monk, spanishUniqueUnits.missionary],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'supremacy',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 400, gold: 250, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(6, ArmorType.melee)
                unit.addArmorComponent(2, ArmorType.melee)
                unit.addArmorComponent(2, ArmorType.pierce)
                unit.stats.health += 40
            }
        }],
        duration: 60,
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    })
]

export const spanishTechTree: CivTechTree = {
    id: 'spanish',
    crest,
    wikiUrl: 'Spanish_(Age_of_Empires_II)',
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
            new UnitLine([archeryUnits.archer]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier, stableUnits.paladin]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam, siegeUnits.siegeRam]),
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
        unitLines: [new UnitLine([monasteryUnits.monk]), missionaryLine],
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
            universityUpgrades.murderHoles,
            universityUpgrades.architecture,
            universityUpgrades.chemistry,
            universityUpgrades.bombardTower,
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
            dockUpgrades.shipwright,
            dockUpgrades.dryDock,
        ])
    }
}

const bonuses = [
    {
        id: 'spanish1',
        effectType: EffectType.constructionSpeed,
        value: 30,
        affectedUnits: [townCenterUnits.villager],
        affectedUpgrades: []
    },
    {
        id: 'spanish2',
        effectType: EffectType.discoutGold,
        value: 100,
        affectedUnits: [],
        affectedUpgrades: [
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ]
    },
    {
        id: 'spanish3',
        effectType: EffectType.accuracy,
        value: null,
        affectedUnits: [dockUnits.eliteCannonGalleon],
        affectedUpgrades: []
    },
    {
        id: 'spanish4',
        effectType: EffectType.fireRate,
        value: 18,
        effects: [{
            order: EffectOrder.last,
            apply: (unit: Unit) => {
                unit.multiplyAttackRate(1.18)
            }
        }],
        affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon],
        affectedUpgrades: []
    },
    {
        id: 'spanish5',
        effectType: EffectType.miscallenous,
        value: 20,
        effects: [],
        affectedUnits: [],
        affectedUpgrades: getAllCivUpgrades(spanishTechTree)
    },
    {
        id: 'spanish6',
        effectType: EffectType.miscallenous,
        value: 25,
        affectedUnits: [marketUnits.tradeCart],
        affectedUpgrades: [],
        team: true
    }
]

spanishTechTree.bonuses = bonuses

setCivOnUniqueTechs(uniqueTechs, spanishTechTree)
setCivOnUniqueTechs(spanishTechTree.bonuses, spanishTechTree)