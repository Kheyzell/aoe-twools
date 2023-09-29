import { allCivTechTrees, aztecsTechTree, berbersUniqueUnits, bulgariansUniqueUnits, gurjarasTechTree, khmerUniqueUnits, lithuaniansTechTree, magyarsTechTree, mayansTechTree, persiansUniqueUnits, tatarsTechTree, turksTechTree } from "../constants"
import { incasTechTree } from "../constants/tech-trees/incas-tech-tree.const"
import { vietnameseUniqueUnits } from "../constants/tech-trees/vietnamese-tech-tree.const"
import { fullTechTree } from "../constants/tech-trees/_full-tech-tree.const"
import { stableUnits } from "../constants/techs/stable-techs.const"
import { CAPACITIES, SpawnUnitOnDeathCapacity } from "../models/capacity.model"
import { Tech } from "../models/techs.model"
import { Unit } from "../models/unit.model"
import { Upgrade } from "../models/upgrade.model"
import { getAllCivRegularUnits, getAllCivRegularUpgrades, getAllCivUniqueUnits, getAllCivUniqueUpgrades } from "../utils/techs.utils"
import { byzantinesTechTree } from '../constants/tech-trees/byzantines-tech-tree.const';

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
        lithuaniansTechTree.uniqueTechs[1].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour)
        magyarsTechTree.uniqueTechs[1].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour)
        mayansTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)
        tatarsTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)
        turksTechTree.uniqueTechs[0].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour, vietnameseUniqueUnits.imperialSkirmisher)

        // bonuses
        byzantinesTechTree.bonuses[1].affectedUnits.push(berbersUniqueUnits.genitour, berbersUniqueUnits.eliteGenitour)

        gurjarasTechTree.bonuses[4].affectedUnits.push(stableUnits.battleElephant, stableUnits.eliteBattleElephant, khmerUniqueUnits.ballistaElephant, khmerUniqueUnits.eliteBallistaElephant, persiansUniqueUnits.warElephant, persiansUniqueUnits.eliteWarElephant)

        bulgariansUniqueUnits.konnik.addCapacity({ ...CAPACITIES.dismountOnDeath, units: [bulgariansUniqueUnits.dismountedKonnik] } as SpawnUnitOnDeathCapacity)
        bulgariansUniqueUnits.eliteKonnik.addCapacity({ ...CAPACITIES.dismountOnDeath, units: [bulgariansUniqueUnits.eliteDismountedKonnik] } as SpawnUnitOnDeathCapacity)
    }

    getTech(techId: string) {
        return this.allTechs.find(tech => tech.id === techId)
    }

}

export default new CivService()