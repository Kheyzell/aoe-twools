import { gurjarasUniqueUnits, siciliansUniqueUnits } from ".."
import { ArmorType, EffectOrder, GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model"
import { Unit } from "../../models/unit.model"
import { setAffectingUpgrades } from "../../utils/techs.utils"
import { addNumber } from "../../utils/utils"
import { barracksUnits } from "../techs/barracks-techs.const"
import { stableUnits } from "../techs/stable-techs.const"
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const"

const villagerLine = new UnitLine([townCenterUnits.villager])

setAffectingUpgrades(villagerLine, [townCenterUpgrade.loom, townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart])

export const townCenterTechs: GroupTechTree = {
    name: 'Town Center',
    unitLines: [villagerLine],
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
}

townCenterUpgrade.feudalAge.effects = [{
    order: EffectOrder.first,
    apply: (unit: Unit) => {
        switch (unit.id) {
            case stableUnits.scoutCavalry.id:
                unit.stats.attackComponents.find(attack => attack.type === ArmorType.melee)!.value += 2
                unit.stats.movementSpeed = addNumber(unit.stats.movementSpeed, .35)
                unit.stats.lineOfSight += 2
                break;

            case barracksUnits.eagleScout.id:
                unit.stats.attackComponents.find(attack => attack.type === ArmorType.melee)!.value += 3
                break;

            case gurjarasUniqueUnits.camelScout.id:
                unit.addAttackComponent(2, ArmorType.melee)
                unit.addAttackComponent(6, ArmorType.cavalry)
                unit.addAttackComponent(3, ArmorType.camel)
                unit.addAttackComponent(3, ArmorType.ship)
                unit.addAttackComponent(3, ArmorType.fishingShip)
                unit.stats.movementSpeed = addNumber(unit.stats.movementSpeed, .25)
                unit.stats.lineOfSight += 1
        }
    }
}]

townCenterUpgrade.castleAge.effects = [{
    order: EffectOrder.first,
    apply: (unit: Unit) => {
        if (unit.id === barracksUnits.eagleScout.id) {
            unit.duration = 35
        }
        if (unit.id === siciliansUniqueUnits.serjeant.id) {
            unit.stats.health += 20
            unit.addAttackComponent(3, ArmorType.melee)
            unit.addArmorComponent(1, ArmorType.melee)
            unit.addArmorComponent(1, ArmorType.pierce)
        }
    }
}]