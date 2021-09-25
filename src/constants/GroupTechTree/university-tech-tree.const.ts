import { ArmorType, EffectOrder, GroupTechTree, UpgradePerAgeGroup } from "../../models/techs.model";
import { Unit } from "../../models/unit.model";
import { multiplyNumber } from "../../utils/utils";
import { bohemiansUniqueUnits } from "../tech-trees/bohemians-tech-tree.const";
import { universityUpgrades } from "../techs/university-techs.const";

universityUpgrades.siegeEngineers.effects = [
    {
        order: EffectOrder.first,
        apply: (unit: Unit) => {
            if (!!unit.stats.range) {
                if (unit.id !== bohemiansUniqueUnits.hussiteWagon.id && unit.id !== bohemiansUniqueUnits.eliteHussiteWagon.id) {
                    unit.stats.range += 1
                }
            }
        }
    },
    {
        order: EffectOrder.last,
        apply: (unit: Unit) => {
            const buildingAttack = unit.stats.attackComponents.find(attack => attack.type === ArmorType.building)
            if (buildingAttack) {
                buildingAttack.value = multiplyNumber(buildingAttack.value, 1.2)
            }
        }
    }
]

export const universityTechs: GroupTechTree = {
    name: 'University',
    unitLines: [],
    upgrades: new UpgradePerAgeGroup([
        universityUpgrades.masonry,
        universityUpgrades.fortifiedWall,
        universityUpgrades.ballistics,
        universityUpgrades.heatedShot,
        universityUpgrades.guardTower,
        universityUpgrades.murderHoles,
        universityUpgrades.treadmillCrane,
        universityUpgrades.architecture,
        universityUpgrades.chemistry,
        universityUpgrades.bombardTower,
        universityUpgrades.siegeEngineers,
        universityUpgrades.keep,
        universityUpgrades.arrowslits,
    ])
};