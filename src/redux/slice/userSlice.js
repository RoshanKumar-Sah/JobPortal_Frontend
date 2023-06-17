import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
   "setUser" : (state, action)=>{
state.value = action.payload
   },
   "logout" : (state)=>{
    state.value = null
    localStorage.removeItem("client_token")
    localStorage.removeItem("employer_token")
   }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions

export default userSlice.reducer