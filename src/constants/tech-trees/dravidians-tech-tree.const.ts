import { EffectType, UniqueTech } from "../../models/bonus.model";
import { BlastAttackCapacity, CAPACITIES, RegenCapacity } from "../../models/capacity.model";
import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import crest from '../../resources/images/crests/dravidians.png';
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
import { stableUnits } from "../techs/stable-techs.const";
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const";
import { universityUpgrades } from "../techs/university-techs.const";

export const dravidiansUniqueUnits: { urumiSwordsman: Unit, eliteUrumiSwordsman: Unit, thirisadai: Unit } = {
    urumiSwordsman: new Unit({
        id: 'urumiSwordsman',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 55,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 8, type: ArmorType.melee },
                { value: 2, type: ArmorType.eagleWarrior },
                { value: 1, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            capacities: [{ ...CAPACITIES.blastAttack, reloadTime: 24, damage: 12, blastRadius: .75, blastDamagePercent: 50 } as BlastAttackCapacity],
            movementSpeed: 1.05,
            lineOfSight: 3,
        },
        duration: 9
    }),
    eliteUrumiSwordsman: new Unit({
        id: 'eliteUrumiSwordsman',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 0,
            food: 65,
            gold: 20,
            stone: 0
        },
        stats: {
            health: 65,
            rateOfFire: 2,
            attackType: AttackType.melee,
            attackComponents: [
                { value: 10, type: ArmorType.melee },
                { value: 3, type: ArmorType.eagleWarrior },
                { value: 2, type: ArmorType.standardBuilding },
            ],
            armorComponents: [
                { value: 1, type: ArmorType.melee },
                { value: 0, type: ArmorType.pierce },
                { value: 0, type: ArmorType.infantry },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            capacities: [{ ...CAPACITIES.blastAttack, reloadTime: 20, damage: 15, blastRadius: .75, blastDamagePercent: 50 } as BlastAttackCapacity],
            movementSpeed: 1.05,
            lineOfSight: 3,
        },
        duration: 9
    }),
    thirisadai: new Unit({
        id: 'thirisadai',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 180,
            food: 0,
            gold: 60,
            stone: 0
        },
        stats: {
            health: 250,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            attackComponents: [
                { value: 9, type: ArmorType.pierce },
                { value: 9, type: ArmorType.ship },
                { value: 9, type: ArmorType.fishingShip },
                { value: 9, type: ArmorType.building },
                { value: 4, type: ArmorType.ram },
            ],
            secondaryAttack: {
                count: 4,
                accuracy: .85,
                components: [
                    { value: 1, type: ArmorType.pierce },
                ]
            },
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 10, type: ArmorType.pierce },
                { value: 8, type: ArmorType.ship },
                { value: 0, type: ArmorType.turtleShip },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.3,
            lineOfSight: 8
        },
        duration: 40
    }),
}

chainTechs([dravidiansUniqueUnits.urumiSwordsman, dravidiansUniqueUnits.eliteUrumiSwordsman])
const uniqueUnitLine = new UnitLine([dravidiansUniqueUnits.urumiSwordsman, dravidiansUniqueUnits.eliteUrumiSwordsman])
setAffectingUpgrades(uniqueUnitLine, [blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
    blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
    barracksUpgrade.squires, barracksUpgrade.arson,
])

chainTechs([dravidiansUniqueUnits.thirisadai])
const thirisadaiLine = new UnitLine([dravidiansUniqueUnits.thirisadai])
setAffectingUpgrades(thirisadaiLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    universityUpgrades.chemistry, universityUpgrades.ballistics,
    dockUpgrades.careening, dockUpgrades.shipwright, dockUpgrades.dryDock
])

const uniqueTechs = [
    new UniqueTech({
        id: 'medicalCorps',
        age: 3,
        effectType: EffectType.regen,
        value: 20,
        cost: { wood: 0, food: 350, gold: 250, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addCapacity({ ...CAPACITIES.regen, healthPerMinute: 20 } as RegenCapacity)
            }
        }],
        duration:   45,
        affectedUnits: [archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher, stableUnits.battleElephant, siegeUnits.armoredElephant, siegeUnits.siegeElephant],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'wootzSteel',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 750, gold: 600, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => unit.addCapacity(CAPACITIES.ignoreArmor)
        }],
        duration: 60,
        affectedUnits: [
            barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
            barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier,
            stableUnits.scoutCavalry, stableUnits.lightCavalry,
            stableUnits.battleElephant,
            dravidiansUniqueUnits.urumiSwordsman, dravidiansUniqueUnits.eliteUrumiSwordsman
        ],
        affectedUpgrades: []
    })
]

export const dravidiansTechTree: CivTechTree = {
    id: 'dravidians',
    crest,
    wikiUrl: 'dravidians',
    bonuses: [
        {
            id: 'dravidians1',
            effectType: EffectType.miscallenous,
            value: 200,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'dravidians2',
            effectType: EffectType.miscallenous,
            value: 15,
            affectedUnits: [townCenterUnits.villager, dockUnits.fishingShip],
            affectedUpgrades: []
        },
        {
            id: 'dravidians3',
            effectType: EffectType.miscallenous,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: [barracksUpgrade.supplies, barracksUpgrade.squires, barracksUpgrade.arson]
        },
        {
            id: 'dravidians4',
            effectType: EffectType.fireRate,
            value: 25,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.multiplyAttackRate(1.25)
                }
            }],
            affectedUnits: [archeryUnits.skirmisher, archeryUnits.eliteSkirmisher, archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher],
            affectedUpgrades: []
        },
        {
            id: 'dravidians5',
            effectType: EffectType.miscallenous,
            value: 5,
            affectedUnits: [],
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
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.elephantArcher, archeryUnits.eliteElephantArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry]),
            new UnitLine([stableUnits.battleElephant]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.armoredElephant, siegeUnits.siegeElephant]),
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
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.hoardings, castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor
        ])
    },
    monastery: {
        unitLines: [new UnitLine([monasteryUnits.monk])],
        upgrades: new UpgradePerAgeGroup([
            monasteryUpgrade.atonement,
            monasteryUpgrade.herbalMedecine,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.faith,
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
            universityUpgrades.heatedShot,
            universityUpgrades.guardTower,
            universityUpgrades.murderHoles,
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

setCivOnUniqueTechs(uniqueTechs, dravidiansTechTree)
setCivOnUniqueTechs(dravidiansTechTree.bonuses, dravidiansTechTree)