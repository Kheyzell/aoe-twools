import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import civFilterReducer from '../features/civ-filter/civ-filter.slice';
import unitCalculatorReducer from '../features/unit-calculator/unit-calculator.slice';

export const store = configureStore({
  reducer: {
    civFilter: civFilterReducer,
    unitCalculator: unitCalculatorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
