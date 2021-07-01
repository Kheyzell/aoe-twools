import { allCivTechTrees } from "../constants"
import { fullTechTree } from "../constants/tech-trees/_full-tech-tree.const"
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
    }

    getTech(techId: string) {
        return this.allTechs.find(tech => tech.id === techId)
    }

}

export default new CivService()