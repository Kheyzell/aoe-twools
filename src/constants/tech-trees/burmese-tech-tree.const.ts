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
import crest from '../../resources/images/crests/burmese.png'
import { EffectType, UniqueTech } from "../../models/bonus.model";
import { setCivOnUniqueTechs } from "../../utils/techs.utils";
import { addElementIfNotInArray } from "../../utils/utils";
import { Unit } from "../../models/unit.model";

export const burmeseUniqueUnits: { arambai: Unit, eliteArambai: Unit } = {
    arambai: new Unit({
        id: 'arambai',
        unique: true,
        age: 3,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 21
    }),
    eliteArambai: new Unit({
        id: 'eliteArambai',
        unique: true,
        age: 4,
        unitType: UnitType.military,
        cost: {
            wood: 75,
            food: 0,
            gold: 60,
            stone: 0
        },
        duration: 21
    })
}

const uniqueTechs = [
    new UniqueTech({
        id: 'howdah',
        age: 3,
        effectType: EffectType.armor,
        value: 1,
        cost: { wood: 300, food: 400, gold: 0, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addArmorComponent(1, ArmorType.melee)
                unit.addArmorComponent(2, ArmorType.pierce)
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.battleElephant, stableUnits.eliteBattleElephant],
        affectedUpgrades: []
    }),
    new UniqueTech({
        id: 'manipurCavalry',
        age: 4,
        effectType: EffectType.miscallenous,
        value: null,
        cost: { wood: 0, food: 650, gold: 400, stone: 0 },
        effects: [{
            order: EffectOrder.first,
            apply: (unit: Unit) => {
                unit.addAttackComponent(6, ArmorType.standardBuilding)
            }
        }],
        duration: 40,
        affectedUnits: [stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar, stableUnits.knight, stableUnits.cavalier, stableUnits.battleElephant, stableUnits.eliteBattleElephant, burmeseUniqueUnits.arambai, burmeseUniqueUnits.eliteArambai],
        affectedUpgrades: []
    })
]

export const burmeseTechTree: CivTechTree = {
    id: 'burmese',
    crest,
    wikiUrl: 'Burmese',
    bonuses: [
        {
            id: 'burmese1',
            effectType: EffectType.freeUpgrade,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: [lumberCampUpgrades.doubleBitAxe, lumberCampUpgrades.bowSaw, lumberCampUpgrades.twoManSaw]
        },
        {
            id: 'burmese2',
            effectType: EffectType.damage,
            value: { age2: 1, age3: 2, age4: 3 },
            effects: [{
                order: EffectOrder.first,
                apply: (unit, upgrades) => {
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.feudalAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.casteAge)
                    addElementIfNotInArray(unit.affectingUpgrades, townCenterUpgrade.imperialAge)
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.feudalAge.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.casteAge.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                    if (upgrades?.some(upgrade => upgrade.id === townCenterUpgrade.imperialAge.id)) {
                        unit.addAttackComponent(1, ArmorType.melee)
                    }
                }
            }],
            affectedUnits: [barracksUnits.militia, barracksUnits.manAtArms, barracksUnits.longSwordsman, barracksUnits.twoHandedSwordsman, barracksUnits.champion, barracksUnits.spearman, barracksUnits.pikeman, barracksUnits.halberdier],
            affectedUpgrades: []
        },
        {
            id: 'burmese3',
            effectType: EffectType.discount,
            value: 50,
            affectedUnits: [],
            affectedUpgrades: [monasteryUpgrade.redemption, monasteryUpgrade.atonement, monasteryUpgrade.herbalMedecine, monasteryUpgrade.sanctity, monasteryUpgrade.fervor, monasteryUpgrade.faith, monasteryUpgrade.illumination, monasteryUpgrade.blockPrinting, monasteryUpgrade.theocracy]
        },
        {
            id: 'burmese4',
            effectType: EffectType.miscallenous,
            value: null,
            affectedUnits: [],
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
            new UnitLine([archeryUnits.archer, archeryUnits.crossbowman]),
            new UnitLine([archeryUnits.skirmisher, archeryUnits.eliteSkirmisher]),
            new UnitLine([archeryUnits.cavalryArcher, archeryUnits.heavyCavalryArcher]),
        ],
        upgrades: new UpgradePerAgeGroup([archeryUpgrades.parthianTactis])
    },
    stable: {
        unitLines: [
            new UnitLine([stableUnits.scoutCavalry, stableUnits.lightCavalry, stableUnits.hussar]),
            new UnitLine([stableUnits.knight, stableUnits.cavalier]),
            new UnitLine([stableUnits.battleElephant, stableUnits.eliteBattleElephant]),
        ],
        upgrades: new UpgradePerAgeGroup([stableUpgrades.bloodlines, stableUpgrades.husbandry])
    },
    siege: {
        unitLines: [
            new UnitLine([siegeUnits.batteringRam, siegeUnits.cappedRam]),
            new UnitLine([siegeUnits.mangonel, siegeUnits.onager]),
            new UnitLine([siegeUnits.scorpion, siegeUnits.heavyScorpion]),
            new UnitLine([siegeUnits.siegeTower]),
            new UnitLine([siegeUnits.bombardCannon]),
        ],
        upgrades: new UpgradePerAgeGroup([])
    },
    castle: {
        unitLines: [
            new UnitLine([burmeseUniqueUnits.arambai, burmeseUniqueUnits.eliteArambai]),
            new UnitLine([castleUnits.petard]),
            new UnitLine([castleUnits.trebuchet]),
        ],
        upgrades: new UpgradePerAgeGroup([uniqueTechs[0], uniqueTechs[1], castleUpgrades.conscription, castleUpgrades.spies])
    },
    blacksmith: {
        unitLines: [],
        upgrades: new UpgradePerAgeGroup([
            blacksmithUpgrades.forging, blacksmithUpgrades.ironCasting, blacksmithUpgrades.blastFurnace,
            blacksmithUpgrades.scaleMailArmor, blacksmithUpgrades.chainMailArmor, blacksmithUpgrades.plateMailArmor,
            blacksmithUpgrades.scaleBardingArmor, blacksmithUpgrades.chainBardingArmor, blacksmithUpgrades.plateBardingArmor,
            blacksmithUpgrades.fletching, blacksmithUpgrades.bodkinArrow, blacksmithUpgrades.bracer,
            blacksmithUpgrades.paddedArcherArmor
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
            universityUpgrades.siegeEngineers,
            universityUpgrades.keep
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
            new UnitLine([dockUnits.fireGalley, dockUnits.fireShip]),
            new UnitLine([dockUnits.demolitionRaft, dockUnits.demotionShip]),
            new UnitLine([dockUnits.cannonGalleon, dockUnits.eliteCannonGalleon]),
        ],
        upgrades: new UpgradePerAgeGroup([
            dockUpgrades.gillnets,
            dockUpgrades.careening,
            dockUpgrades.dryDock,
        ])
    }
}

setCivOnUniqueTechs(uniqueTechs, burmeseTechTree)
setCivOnUniqueTechs(burmeseTechTree.bonuses, burmeseTechTree)