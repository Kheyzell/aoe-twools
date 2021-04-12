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

    toggleTechSelelection: (state, action: PayloadAction<Tech>) => {
      const isAlreadySelected = !!state.selectedTechs.find(tech => tech.name === action.payload.name)      
      if (isAlreadySelected) {
        state.selectedTechs.splice(state.selectedTechs.findIndex(tech => tech.name === action.payload.name), 1)
      } else {
        state.selectedTechs.push(action.payload)
      }
    },

    resetSelection: (state) => {
      state.selectedTechs = [];
    }
  },
})

export const { selectTech, unselectTech, toggleTechSelelection, resetSelection } = counterSlice.actions

export const selectedTechsSelector = (state: RootState) => state.techs.selectedTechs

export default counterSlice.reducer
