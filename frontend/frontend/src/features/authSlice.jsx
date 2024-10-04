import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access:"",
    refresh:"",
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setJwtToken: (state, action) => {
            if (action.payload.refresh){
                state.refresh = action.payload.refresh
            }

            state.access = action.payload.access
        },
    
    }

})

export const {setJwtToken} = authSlice.actions
export default  authSlice.reducer