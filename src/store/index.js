import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../slices/auth.slice';

export const store = configureStore({
    reducer: {
      auth: rootReducer,
    },
  });