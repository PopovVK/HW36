
import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './shoppingSlice';

const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
