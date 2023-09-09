import { ArmorType, CivTechTree, EffectOrder, UnitLine, UnitType, UpgradePerAgeGroup } from "../../models/techs.model";
import { AttackType, Unit } from "../../models/unit.model";
import { CAPACITIES } from "../../models/capacity.model";
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
import crest from '../../resources/images/crests/portuguese.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { chainTechs, setAffectingUpgrades, setCivOnUniqueTechs } from "../../utils/techs.utils";
import { multiplyNumber, addNumber } from "../../utils/utils";

export const portugeseUniqueUnits: { organGun: Unit, eliteOrganGun: Unit, caravel: Unit, eliteCaravel: Unit } = {
    organGun: new Unit({
        id: 'organGun',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 80,
            food: 0,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 60,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 7,
            accuracy: .5,
            attackComponents: [
                { value: 16, type: ArmorType.pierce },
                { value: 1, type: ArmorType.ram },
            ],
            secondaryAttack: {
                count: 4,
                accuracy: .5,
                components: [{ value: 2, type: ArmorType.pierce }]
            },
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .85,
            lineOfSight: 9,
        },
        duration: 21
    }),
    eliteOrganGun: new Unit({
        id: 'eliteOrganGun',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 80,
            food: 0,
            gold: 70,
            stone: 0
        },
        stats: {
            health: 70,
            rateOfFire: 3.45,
            attackType: AttackType.projectile,
            range: 7,
            accuracy: .5,
            attackComponents: [
                { value: 20, type: ArmorType.pierce },
                { value: 1, type: ArmorType.ram },
            ],
            secondaryAttack: {
                count: 4,
                accuracy: .75,
                components: [{ value: 2, type: ArmorType.pierce }]
            },
            armorComponents: [
                { value: 2, type: ArmorType.melee },
                { value: 4, type: ArmorType.pierce },
                { value: 0, type: ArmorType.siegeWeapon },
                { value: 0, type: ArmorType.gunpowderUnit },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: .85,
            lineOfSight: 9,
        },
        duration: 21
    }),
    caravel: new Unit({
        id: 'caravel',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 43,
            stone: 0
        },
        stats: {
            health: 130,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 6,
            accuracy: 1,
            attackComponents: [
                { value: 6, type: ArmorType.pierce },
                { value: 8, type: ArmorType.building },
                { value: 6, type: ArmorType.ship },
                { value: 6, type: ArmorType.fishingShip },
                { value: 4, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.43,
            lineOfSight: 9,
            capacities: [CAPACITIES.projectilePassesThroughUnits]
        },
        duration: 36
    }),
    eliteCaravel: new Unit({
        id: 'eliteCaravel',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 90,
            food: 0,
            gold: 43,
            stone: 0
        },
        stats: {
            health: 150,
            rateOfFire: 3,
            attackType: AttackType.projectile,
            range: 7,
            accuracy: 1,
            attackComponents: [
                { value: 8, type: ArmorType.pierce },
                { value: 9, type: ArmorType.building },
                { value: 7, type: ArmorType.ship },
                { value: 7, type: ArmorType.fishingShip },
                { value: 4, type: ArmorType.ram },
            ],
            armorComponents: [
                { value: 0, type: ArmorType.melee },
                { value: 8, type: ArmorType.pierce },
                { value: 0, type: ArmorType.ship },
                { value: 0, type: ArmorType.uniqueUnit },
            ],
            movementSpeed: 1.43,
            lineOfSight: 9,
            capacities: [CAPACITIES.projectilePassesThroughUnits]
        },
        duration: 36
    })
}

chainTechs([portugeseUniqueUnits.organGun, portugeseUniqueUnits.eliteOrganGun])
const uniqueUnitLine = new UnitLine([portugeseUniqueUnits.organGun, portugeseUniqueUnits.eliteOrganGun])
setAffectingUpgrades(uniqueUnitLine, [universityUpgrades.siegeEngineers])

chainTechs([portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel])
const caravelLine = new UnitLine([portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel])
setAffectingUpgrades(caravelLine, [blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
    universityUpgrades.ballistics, universityUpgrades.chemistry,
    dockUpgrades.careening, dockUpgrades.dryDock])

const uniqueTechs = [
    new UniqueTech({
        id: 'carrack',
        age: 3,
        effectType: EffectType.armor,
        value: 1,
        cost: { wood: 200, food: 0, gold: 300, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(1, ArmorType.pierce)
            }
        }],
        duration: 40,
        affectedUnits: [dockUnits.fishingShip, dockUnits.transportShip, dockUnits.galley, dockUnits.warGalley, dockUnits.galleon, dockUnits.fireGalley, dockUnits.fireShip, dockUnits.fireShip, dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip, dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon, portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'arquebus',
        age: 4,
        effectType: EffectType.accuracy,
        value: null,
        cost: { wood: 0, food: 700, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.stats.capacities.push(CAPACITIES.ballistics)
            }
        }],
        duration: 40,
        affectedUnits: [archeryUnits.handCannoneer, siegeUnits.bombardCannon, dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon, portugeseUniqueUnits.organGun, portugeseUniqueUnits.eliteOrganGun],
        affectedUpgrades: []
    })
]

export const portugueseTechTree: CivTechTree = {
    id: 'portuguese',
    crest,
    wikiUrl: 'Portuguese_(Age_of_Empires_II)',
    bonuses: [
        {
            id: 'portuguese1',
            effectType: EffectType.discount,
            value: 20,
            effects: [{
                order: EffectOrder.last,
                apply: unit => {
                    unit.cost.gold = multiplyNumber(unit.cost.gold, addNumber(1, -.20))
                }
            }],
            affectedUnits: [
                barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion,
                archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester,
                archeryUnits.handCannoneer,
                archeryUnits.cavalryArcher,
                stableUnits.knight, stableUnits.cavalier,
                siegeUnits.batteringRam, siegeUnits.cappedRam,
                siegeUnits.mangonel, siegeUnits.onager,
                siegeUnits.scorpion,
                siegeUnits.siegeTower,
                siegeUnits.bombardCannon,
                castleUnits.petard,
                castleUnits.trebuchet,
                monasteryUnits.monk,
                marketUnits.tradeCart,
                dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.fireGalley, dockUnits.fireShip,
                dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon,
                portugeseUniqueUnits.organGun, portugeseUniqueUnits.eliteOrganGun,
                portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel
            ],
            affectedUpgrades: [],
            hideInUnitRecap: true
        },
        {
            id: 'portuguese2',
            effectType: EffectType.healthPercent,
            value: 10,
            effects: [{
                order: EffectOrder.last,
                apply: (unit: Unit) => {
                    unit.stats.health = multiplyNumber(unit.stats.health, 1.1)
                }
            }],
            affectedUnits: [dockUnits.fishingShip,
                dockUnits.transportShip,
                dockUnits.galley, dockUnits.warGalley, dockUnits.galleon,
                dockUnits.fireGalley, dockUnits.fireShip,
                dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip,
                dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon,
                portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel],
            affectedUpgrades: []
        },
        {
            id: 'portuguese3',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: []
        },
        {
            id: 'portuguese4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
            affectedUpgrades: [],
            team: false
        },
        {
            id: 'portuguese5',
            effectType: EffectType.creationSpeed,
            value: 30,
            affectedUnits: [],
            affectedUpgrades: [
                barracksUpgrade.supplies, barracksUpgrade.arson,
                archeryUpgrades.thumbRing,
                stableUpgrades.bloodlines, stableUpgrades.husbandry,
                castleUpgrades.castleUniqueTech, castleUpgrades.imperialUniqueTech, castleUpgrades.sappers, castleUpgrades.conscription, castleUpgrades.spies,
                blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
                blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
                blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
                blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
                blacksmithUpgrades.paddedArcherArmor, blacksmithUpgrades.leatherArcherArmor, blacksmithUpgrades.ringArcherArmor,
                monasteryUpgrade.redemption, monasteryUpgrade.atonement, monasteryUpgrade.herbalMedecine, monasteryUpgrade.heresy, monasteryUpgrade.sanctity, monasteryUpgrade.fervor, monasteryUpgrade.faith, monasteryUpgrade.blockPrinting, monasteryUpgrade.theocracy,
                universityUpgrades.masonry, universityUpgrades.fortifiedWall, universityUpgrades.ballistics, universityUpgrades.guardTower, universityUpgrades.heatedShot, universityUpgrades.murderHoles, universityUpgrades.treadmillCrane, universityUpgrades.architecture, universityUpgrades.chemistry, universityUpgrades.bombardTower, universityUpgrades.siegeEngineers, universityUpgrades.keep,
                townCenterUpgrade.loom, townCenterUpgrade.wheelbarrow, townCenterUpgrade.townWatch, townCenterUpgrade.handCart, townCenterUpgrade.townPatrol,
                lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw, lumberCampUpgrades.twoManSaw,
                millUpgrades.horseColar, millUpgrades.heavyPlow, millUpgrades.cropRotation,
                miningCampUpgrades.goldMining, miningCampUpgrades.stoneMining, miningCampUpgrades.stoneShaftMining,
                marketUpgrade.coinage, marketUpgrade.caravan, marketUpgrade.banking, marketUpgrade.guilds,
                dockUpgrades.gillnets, dockUpgrades.careening, dockUpgrades.dryDock
            ],
            team: true
        },
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
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman, archeryUnits.arbalester]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.handCannoneer]),
            new UnitLine([archeryUnits.cavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.thumbRing])
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
            new UnitLine([siegeUnits.scorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([portugeseUniqueUnits.organGun, portugeseUniqueUnits.eliteOrganGun]),
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
            monasteryUpgrade.heresy,
            monasteryUpgrade.sanctity,
            monasteryUpgrade.fervor,
            monasteryUpgrade.faith,
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
            universityUpgrades.architecture,
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
            miningCampUpgrades.stoneShaftMining
        ])
    },
    market: {
        unitLines: [new UnitLine([marketUnits.tradeCart])],
        upgrades: new UpgradePerAgeGroup([
            marketUpgrade.coinage,
            marketUpgrade.caravan,
            marketUpgrade.banking,
            marketUpgrade.guilds
        ])
    },
    dock: {
        unitLines: [
            new UnitLine([dockUnits.fishingShip]),
            new UnitLine([dockUnits.transportShip]),
            new UnitLine([dockUnits.tradeCog]),
            new UnitLine([dockUnits.galley, dockUnits.warGalley, dockUnits.galleon]),
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip, dockUnits.heavyDemolitionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
            new UnitLine([portugeseUniqueUnits.caravel, portugeseUniqueUnits.eliteCaravel]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}


setCivOnUniqueTechs(uniqueTechs, portugueseTechTree)
setCivOnUniqueTechs(portugueseTechTree.bonuses, portugueseTechTree)