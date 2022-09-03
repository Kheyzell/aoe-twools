import { allCivTechTrees, aztecsTechTree, berbersUniqueUnits, bulgariansUniqueUnits, gurjarasTechTree, khmerUniqueUnits, mayansTechTree, persiansUniqueUnits, tatarsTechTree, turksTechTree } from "../constants"
import { incasTechTree } from "../constants/tech-trees/incas-tech-tree.const"
import { vietnameseUniqueUnits } from "../constants/tech-trees/vietnamese-tech-tree.const"
import { fullTechTree } from "../constants/tech-trees/_full-tech-tree.const"
import { stableUnits } from "../constants/techs/stable-techs.const"
import { CAPACITIES, SpawnUnitOnDeathCapacity } from "../models/capacity.model"
import { Tech } from "../models/techs.model"
import { Unit } from "../models/unit.model"
import { Upgrade } from "../models/upgrade.model"
import { getAllCivRegularUnits, getAllCivRegularUpgrades, getAllCivUniqueUnits, getAllCivUniqueUpgrades } from "../utils/techs.utils"

class CivService {
    allTechs: Tech[]
    allUnits: Unit[]
    allUpgrades: Upgrade[]

    constructor() {
        this.allUnits = getAllCivRegularUnits(fullTechTree).concat(...allCivTechTrees.map(getAllCivUniqueUnits))
        this.allUpgrades = getAllCivRegularUpgrades(fullTechTree).concat(...allCivTechTrees.map(getAllCivUniqueUpgrades))
        this.allTechs = (this.allUnits as Tech[]).concat(this.allUpgrades)

        // post data loading affectations
        // unique techs
        aztecsTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)
        incasTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)
        mayansTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)
        tatarsTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)
        turksTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)

        // bonuses
        gurjarasTechTree.bonuses[4].affectedUnits.push(stableUnits.battleElephant, stableUnits.eliteBattleElephant, khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant, persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant)

        bulgariansUniqueUnits.konnik.addCapacity({ ...CAPACITIES.dismountOnDeath, unit: bulgariansUniqueUnits.dismountedKonnik } as SpawnUnitOnDeathCapacity)
        bulgariansUniqueUnits.eliteKonnik.addCapacity({ ...CAPACITIES.dismountOnDeath, unit: bulgariansUniqueUnits.eliteDismountedKonnik } as SpawnUnitOnDeathCapacity)
    }

    getTech(techId: string) {
        return this.allTechs.find(tech => tech.id === techId)
    }

}

export default new CivService()