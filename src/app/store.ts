import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import commentSlice from '../features/comment/commentSlice';

export const store = configureStore({
  reducer: {
    comment: commentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
