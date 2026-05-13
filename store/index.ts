import { configureStore } from '@reduxjs/toolkit'
import tendersReducer from './tendersSlice'

export const store = configureStore({
  reducer: {
    tenders: tendersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
