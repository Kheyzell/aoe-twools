import { siciliansUniqueUnits } from ".."
import { ArmorType, EffectOrder, GroupTechTree, UnitLine, UpgradePerAgeGroup } from "../../models/techs.model"
import { Unit } from "../../models/unit.model"
import { setAffectingUpgrades } from "../../utils/techs.utils"
import { barracksUnits } from "../techs/barracks-techs.const"
import { townCenterUnits, townCenterUpgrade } from "../techs/town-center-techs.const"

const villagerLine = new UnitLine([townCenterUnits.villager])

setAffectingUpgrades(villagerLine, [townCenterUpgrade.loom, townCenterUpgrade.wheelbarrow, townCenterUpgrade.handCart])

export const townCenterTechs: GroupTechTree = {
    name: 'Town Center',
    unitLines: [ villagerLine ],
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

townCenterUpgrade.castleAge.effects= [{
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