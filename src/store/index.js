
import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = { config: {}, user: {} }

const desktopSlice = createSlice({
    name: 'desktop',
    initialState,
    reducers: {
        setConfig(state, action) {
            state.config = action.payload
            // { Authorization: action.payload, 'Content-Type': 'application/json' }
        },
        setUser(state, action) {
            state.user = action.payload
        },
    }
})



const store = configureStore({
    reducer:   {desktop: desktopSlice.reducer} 
})



export const desktopActions = desktopSlice.actions
export default store