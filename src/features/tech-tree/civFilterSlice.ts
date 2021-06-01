import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { CivTechTree, Tech } from '../../models/techs.model'

interface TechState {
  selectedCiv?: CivTechTree | null
  selectedTechs: Tech[]
}

const initialState: TechState = {
  selectedCiv: null,
  selectedTechs: []
}

export const civFilterSlice = createSlice({
  name: 'civFilter',
  initialState,
  reducers: {
    selectCiv: (state, action: PayloadAction<CivTechTree>) => {
      state.selectedCiv = action.payload
    },

    unselectCiv: (state, action: PayloadAction<void>) => {
      state.selectedCiv = null
    },

    toggleCivSelection: (state, action: PayloadAction<CivTechTree>) => {
      if (state.selectedCiv && state.selectedCiv.id === action.payload.id) {
        state.selectedCiv = null  
      } else {
        state.selectedCiv = action.payload || null
      }
    },

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

    resetTechSelection: (state) => {
      state.selectedTechs = [];
    }
  },
})

export const { toggleCivSelection, unselectCiv, selectTech, unselectTech, toggleTechsSelelection, resetTechSelection } = civFilterSlice.actions

export const selectedCivSelector = (state: RootState) => state.civFilter.selectedCiv
export const selectedTechsSelector = (state: RootState) => state.civFilter.selectedTechs

export default civFilterSlice.reducer
