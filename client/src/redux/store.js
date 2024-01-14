import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {user: userReducer},
    //serializable check false to prevent any error in browser
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializable: false,
    }),
})