import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { allCivTechTrees } from '../../constants'
import civService from '../../core/civ.service'
import localStorageService from '../../core/local-storage.service'
import { Tech } from '../../models/techs.model'


export enum TooltipInteractivity { none = 'none', display = 'display', locked = 'locked' } 

interface TechState {
  selectedCivId?: string | null
  selectedCivId2?: string | null
  selectedTechIds: string[]
  techTooltipInteractivity: TooltipInteractivity
}

const initialState: TechState = {
  selectedCivId: null,
  selectedCivId2: null,
  selectedTechIds: [],
  techTooltipInteractivity: localStorageService.loadCivFilterTooltipInteractivity() || TooltipInteractivity.display
}

export const civFilterSlice = createSlice({
  name: 'civFilter',
  initialState,
  reducers: {
    unselectCivs: (state, action: PayloadAction<void>) => {
      state.selectedCivId = null
      state.selectedCivId2 = null
    },

    toggleCivSelection: (state, action: PayloadAction<string>) => {
      const toggledCivId = action.payload
      if (toggledCivId === state.selectedCivId) {
        state.selectedCivId = null
        state.selectedCivId2 = null
      } else {
        state.selectedCivId = toggledCivId
        if (toggledCivId === state.selectedCivId2) {
          state.selectedCivId2 = null
        }
      }
    },

    toggleCiv2Selection: (state, action: PayloadAction<string>) => {
      const toggledCivId = action.payload
      if (toggledCivId === state.selectedCivId2) {
        state.selectedCivId2 = null
      } else {
        state.selectedCivId2 = toggledCivId
      }
    },

    unselectCiv1: (state, action: PayloadAction<void>) => {
      state.selectedCivId = null
    },

    unselectCiv2: (state, action: PayloadAction<void>) => {
      state.selectedCivId2 = null
    },

    toggleTechsSelection: (state, action: PayloadAction<string>) => {
      const techId = action.payload
      const isAlreadySelected = !!state.selectedTechIds.find(id => id === techId)      
      const tech: Tech | void = civService.getTech(techId)
      let cursorTech = tech;
      if (isAlreadySelected) {
        const techsToUnselect: Tech[] = []
        while(!!cursorTech) { // previous techs
          techsToUnselect.push(cursorTech)
          cursorTech = cursorTech.previousLineTech
        }
        cursorTech = tech
        while(!!cursorTech) { // next techs
          techsToUnselect.push(cursorTech)
          cursorTech = cursorTech.nextLineTech
        }

        state.selectedTechIds = state.selectedTechIds.filter(techId => !techsToUnselect.find(t => t.id === techId))
      } else {
        const techsToSelect: Tech[] = []
        if (!!cursorTech) {
          do { // select all previous line tech
            techsToSelect.push(cursorTech)
            cursorTech = cursorTech.previousLineTech
          } while (!!cursorTech);
        }
        
        state.selectedTechIds.push(...techsToSelect.map(tech => tech.id))
      }
    },

    resetTechSelection: (state) => {
      state.selectedTechIds = [];
    },

    toggleTechTooltipInteractivity: (state) => {
      if (state.techTooltipInteractivity === TooltipInteractivity.none) {
        state.techTooltipInteractivity = TooltipInteractivity.display
      } else if (state.techTooltipInteractivity === TooltipInteractivity.display) {
        state.techTooltipInteractivity = TooltipInteractivity.locked
      } else {
        state.techTooltipInteractivity = TooltipInteractivity.none
      }

      localStorageService.storeCivFilterTooltipInteractivity(state.techTooltipInteractivity)
    }
  },
})

export const { toggleCivSelection, toggleCiv2Selection, unselectCivs, unselectCiv1, unselectCiv2, toggleTechsSelection, resetTechSelection, toggleTechTooltipInteractivity } = civFilterSlice.actions

export const selectedCivSelector = (state: RootState) => allCivTechTrees.find(civ => civ.id === state.civFilter.selectedCivId)
export const selectedCiv2Selector = (state: RootState) => allCivTechTrees.find(civ => civ.id === state.civFilter.selectedCivId2)
export const isInComparisonModeSelector = (state: RootState) => !!state.civFilter.selectedCivId && !!state.civFilter.selectedCivId2
export const selectedTechsSelector = (state: RootState) => civService.allTechs.filter(tech => state.civFilter.selectedTechIds.some(id => id === tech.id))
export const techTooltipInteractivitySelector = (state: RootState) => state.civFilter.techTooltipInteractivity

export default civFilterSlice.reducer
