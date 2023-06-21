import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import jobSlice from './slice/jobSlice'

export default configureStore({
  reducer: {
    "user" : userSlice
  }
})