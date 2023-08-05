import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{
        _id: "",
        fname:"",
        lname:"",
        email:"",
        profile:"",
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload.data);
            // state.user = action.payload.data
            state._id = action.payload.data._id
            state.fname = action.payload.data.fname
            state.lname = action.payload.data.lname
            state.email = action.payload.data.email
            state.profile = action.payload.data.profile
        },
        logoutRedux:(state, action) => {
            state._id = ""
            state.fname = ""
            state.lname = ""
            state.email = ""
            state.profile = ""
        }
    }
});

export const {loginRedux,logoutRedux} = userSlice.actions
export default userSlice.reducer