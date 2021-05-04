import { Tech } from "../models/techs.model";

export const chainTechs = (techs: Tech[]): Tech[] => {
    return techs.map((tech, index) => {
        tech.previousLineTech = techs[index-1]
        tech.nextLineTech = techs[index+1]
        return tech
    })
}