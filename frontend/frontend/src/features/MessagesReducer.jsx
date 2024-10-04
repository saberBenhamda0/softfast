import { createSlice } from "@reduxjs/toolkit";

let initialState =     
{
    id: 0,
    messages: "",
    timestamp: "",
    sender: 0,
    receiver: 0
}


let postReducer = createSlice({
    name:"messages",
    initialState,
    reducers:{
        setMessages: (state, action) =>{
            if (state)
            {
                state = action.payload
            }
        }

    }
})


export const {setMessages} = postReducer.actions
export default postReducer.reducer