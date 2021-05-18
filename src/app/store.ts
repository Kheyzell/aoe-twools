import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import techsReducer from '../features/tech-tree/techSlice';

export const store = configureStore({
  reducer: {
    techs: techsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
