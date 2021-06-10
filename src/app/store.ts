import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import civFilterReducer from '../features/civ-filter/civFilterSlice';

export const store = configureStore({
  reducer: {
    civFilter: civFilterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
