import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../slices/auth.slice';
import eventReducer from '../slices/event.slice';

export const store = configureStore({
    reducer: {
      auth: rootReducer,
      events: eventReducer
    },
  });