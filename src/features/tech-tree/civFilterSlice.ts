import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

import { CivTechTree, Tech } from '../../models/techs.model'

interface TechState {
  selectedCiv?: CivTechTree | null
  selectedCiv2?: CivTechTree | null
  selectedTechs: Tech[]
}

const initialState: TechState = {
  selectedCiv: null,
  selectedCiv2: null,
  selectedTechs: []
}

export const civFilterSlice = createSlice({
  name: 'civFilter',
  initialState,
  reducers: {
    selectCiv: (state, action: PayloadAction<CivTechTree>) => {
      state.selectedCiv = action.payload
    },

    unselectCivs: (state, action: PayloadAction<void>) => {
      state.selectedCiv = null
      state.selectedCiv2 = null
    },

    toggleCivSelection: (state, action: PayloadAction<CivTechTree>) => {
      const toggledCiv = action.payload
      if (toggledCiv.id === state.selectedCiv?.id) {
        state.selectedCiv = null
        state.selectedCiv2 = null
      } else {
        state.selectedCiv = toggledCiv
        if (toggledCiv.id === state.selectedCiv2?.id) {
          state.selectedCiv2 = null
        }
      }
    },

    toggleCiv2Selection: (state, action: PayloadAction<CivTechTree>) => {
      const toggledCiv = action.payload
      if (toggledCiv.id === state.selectedCiv2?.id) {
        state.selectedCiv2 = null
      } else {
        state.selectedCiv2 = toggledCiv
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

export const { toggleCivSelection, toggleCiv2Selection, unselectCivs, selectTech, unselectTech, toggleTechsSelelection, resetTechSelection } = civFilterSlice.actions

export const selectedCivSelector = (state: RootState) => state.civFilter.selectedCiv
export const selectedCiv2Selector = (state: RootState) => state.civFilter.selectedCiv2
export const selectedTechsSelector = (state: RootState) => state.civFilter.selectedTechs

export default civFilterSlice.reducer
