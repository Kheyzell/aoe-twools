import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'

import { RootState } from '../../app/store'
import { allCivTechTrees } from '../../constants'
import { barracksUnits } from '../../constants/techs/barracks-techs.const'
import { stableUnits } from '../../constants/techs/stable-techs.const'
import { Bonus } from '../../models/bonus.model'
import { CalculatedStats } from '../../models/stats-calculation.model'
import { Unit } from '../../models/unit.model'
import { Upgrade } from '../../models/upgrade.model'
import { getNextUpgradesInLine, getpreviousUpgradesInLine } from '../../utils/techs.utils'
import unitCalculatorService from './unit-calculator.service'

export type UnitsSelected = { unit1: Unit, unit2: Unit }

interface unitCalculatorState {
  selectedUnits: UnitsSelected
  unmodifiedUnit1: Unit
  unmodifiedUnit2: Unit
  selectedUpgrades1: Upgrade[]
  selectedUpgrades2: Upgrade[]
  selectedBonusIds1: string[]
  selectedBonusIds2: string[]
  calculatedStats: CalculatedStats
}

const defaultUnit1 = barracksUnits.spearman
const defaultUnit2 = stableUnits.scoutCavalry

const initialState: unitCalculatorState = {
  selectedUnits: { unit1: defaultUnit1, unit2: defaultUnit2 },
  unmodifiedUnit1: defaultUnit1,
  unmodifiedUnit2: defaultUnit2,
  selectedUpgrades1: [],
  selectedUpgrades2: [],
  selectedBonusIds1: [],
  selectedBonusIds2: [],
  calculatedStats: unitCalculatorService.calculateStats(defaultUnit1, defaultUnit2, [], [], [], [])
}

export const selectedUnitsSelector = (state: RootState) => state.unitCalculator.selectedUnits
export const selectedTechsSelector = (state: RootState) => [state.unitCalculator.selectedUnits.unit1, state.unitCalculator.selectedUnits.unit2]
export const selectedUpgradesForUnit1Selector = (state: RootState) => state.unitCalculator.selectedUpgrades1
export const selectedUpgradesForUnit2Selector = (state: RootState) => state.unitCalculator.selectedUpgrades2
export const selectedBonusesForUnit1Selector = (state: RootState) => allBonuses.filter(bonus => state.unitCalculator.selectedBonusIds1.some(id => id === bonus.id))
export const selectedBonusesForUnit2Selector = (state: RootState) => allBonuses.filter(bonus => state.unitCalculator.selectedBonusIds2.some(id => id === bonus.id))
export const calculatedStatsSelector = (state: RootState) => state.unitCalculator.calculatedStats

export const unitCalculatorSlice = createSlice({
  name: 'unitCalculator',
  initialState,
  reducers: {
    selectUnit1: (state, action: PayloadAction<Unit>) => {
      state.selectedUnits.unit1 = action.payload
      state.unmodifiedUnit1 = new Unit(action.payload)
      state.selectedUnits.unit2 = new Unit(state.unmodifiedUnit2)
      state.selectedUpgrades1 = []
      state.selectedBonusIds1 = []
      calculateStats(state)
    },

    selectUnit2: (state, action: PayloadAction<Unit>) => {
      state.selectedUnits.unit2 = action.payload
      state.unmodifiedUnit2 = new Unit(action.payload)
      state.selectedUnits.unit1 = new Unit(state.unmodifiedUnit1)
      state.selectedUpgrades2 = []
      state.selectedBonusIds2 = []
      calculateStats(state)
    },

    selectUpgradesForUnit1: (state, action: PayloadAction<Upgrade>) => {
      const isUpgradedSelected = state.selectedUpgrades1.some(selectedUpgrade => selectedUpgrade.id === action.payload.id)

      if (isUpgradedSelected) {
        const nextUpgrades = getNextUpgradesInLine(action.payload);
        state.selectedUpgrades1 = state.selectedUpgrades1.filter(selectedUpgrade => !nextUpgrades.some(u => u.id === selectedUpgrade.id))
      } else {
        const previousUpgrades = getpreviousUpgradesInLine(action.payload)
        previousUpgrades.forEach(upgrade => {
          const isAlreadySelected = state.selectedUpgrades1.some(selectedUpgrade => selectedUpgrade.id === upgrade.id)
          if (!isAlreadySelected) {
            state.selectedUpgrades1.push(upgrade)
          }
        })
      }
      calculateStats(state)
    },
    
    selectUpgradesForUnit2: (state, action: PayloadAction<Upgrade>) => {
      const isUpgradedSelected = state.selectedUpgrades2.some(selectedUpgrade => selectedUpgrade.id === action.payload.id)

      if (isUpgradedSelected) {
        const nextUpgrades = getNextUpgradesInLine(action.payload);
        state.selectedUpgrades2 = state.selectedUpgrades2.filter(selectedUpgrade => !nextUpgrades.some(u => u.id === selectedUpgrade.id))
      } else {
        const previousUpgrades = getpreviousUpgradesInLine(action.payload)
        previousUpgrades.forEach(upgrade => {
          const isAlreadySelected = state.selectedUpgrades2.some(selectedUpgrade => selectedUpgrade.id === upgrade.id)
          if (!isAlreadySelected) {
            state.selectedUpgrades2.push(upgrade)
          }
        })
      }
      calculateStats(state)
    },

    selectBonusForUnit1: (state, action: PayloadAction<Bonus>) => {
      const bonusIndex = state.selectedBonusIds1.findIndex(id => id === action.payload.id)
      const isSelected = bonusIndex > -1

      if (isSelected) {
        state.selectedBonusIds1.splice(bonusIndex, 1)
      } else {
        state.selectedBonusIds1.push(action.payload.id)
      }
      calculateStats(state)
    },
    
    selectBonusForUnit2: (state, action: PayloadAction<Bonus>) => {
      const bonusIndex = state.selectedBonusIds2.findIndex(id => id === action.payload.id)
      const isSelected = bonusIndex > -1

      if (isSelected) {
        state.selectedBonusIds2.splice(bonusIndex, 1)
      } else {
        state.selectedBonusIds2.push(action.payload.id)
      }
      calculateStats(state)
    }
  }
})

export const { selectUnit1, selectUnit2, selectUpgradesForUnit1, selectUpgradesForUnit2, selectBonusForUnit1, selectBonusForUnit2 } = unitCalculatorSlice.actions

export default unitCalculatorSlice.reducer

const calculateStats = (state: WritableDraft<unitCalculatorState>) => {
  state.selectedUnits.unit1 = new Unit(state.unmodifiedUnit1)
  state.selectedUnits.unit2 = new Unit(state.unmodifiedUnit2)
  const bonuses1 = allBonuses.filter(bonus => state.selectedBonusIds1.some(id => id === bonus.id))
  const bonuses2 = allBonuses.filter(bonus => state.selectedBonusIds2.some(id => id === bonus.id))
  state.calculatedStats = unitCalculatorService.calculateStats(state.selectedUnits.unit1, state.selectedUnits.unit2, state.selectedUpgrades1, state.selectedUpgrades2, bonuses1, bonuses2)
}

const allBonuses = allCivTechTrees
  .map(civ => civ.bonuses)
  .reduce((allBonuses: Bonus[], civBonuses: Bonus[]) => allBonuses.concat(civBonuses), [])