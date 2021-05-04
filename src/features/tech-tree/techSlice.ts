import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { Tech } from '../../models/techs.model'

interface TechState {
  selectedTechs: Tech[]
}

const initialState: TechState = {
  selectedTechs: [],
}

export const counterSlice = createSlice({
  name: 'techs',
  initialState,
  reducers: {
    selectTech: (state, action: PayloadAction<Tech>) => {
      const isAlreadySelected = !!state.selectedTechs.find(tech => tech.name === action.payload.name)
      if (!isAlreadySelected) {
        state.selectedTechs.push(action.payload)
      }
    },
    
    unselectTech: (state, action: PayloadAction<Tech>) => {
      state.selectedTechs.splice(state.selectedTechs.findIndex(tech => tech === action.payload), 1)
    },

    toggleTechsSelelection: (state, action: PayloadAction<Tech>) => {
      const isAlreadySelected = !!state.selectedTechs.find(tech => tech.name === action.payload.name)      
      let tech: Tech | void = action.payload
      if (isAlreadySelected) {
        const techsToUnselect: Tech[] = []
        while(!!tech) { // previous techs
          techsToUnselect.push(tech)
          tech = tech.previousLineTech
        }
        tech = action.payload.nextLineTech
        while(!!tech) { // next techs
          techsToUnselect.push(tech)
          tech = tech.nextLineTech
        }

        state.selectedTechs = state.selectedTechs.filter(tech => !techsToUnselect.find(t => t.id === tech.id))
      } else {
        const techsToSelect: Tech[] = []
        do { // select all previous line tech
          techsToSelect.push(tech)
          tech = tech.previousLineTech
        } while (!!tech);
        
        state.selectedTechs.push(...techsToSelect)
      }
    },

    resetSelection: (state) => {
      state.selectedTechs = [];
    }
  },
})

export const { selectTech, unselectTech, toggleTechsSelelection, resetSelection } = counterSlice.actions

export const selectedTechsSelector = (state: RootState) => state.techs.selectedTechs

export default counterSlice.reducer
