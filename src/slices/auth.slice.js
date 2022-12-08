import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../constant/auth.api";
import {withOutTokenGet, withoutTokenPost, withTokenPost} from '../services/common.services'


export const getLogin = createAsyncThunk("LOGIN",(params) => withoutTokenPost(authApi.LOGIN, params));
export const getRegister = createAsyncThunk("REGISTER",(params) => withoutTokenPost(authApi.REGISTER, params));

    const initialState = {
        status: null,
        data: null
    };

    export const rootReducer = createSlice({
        name:  "authSlice",
        initialState,
        extraReducers: {
            [getLogin.pending]: (state, action) => {
                state.status = "pending";
            },
            [getLogin.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
            },
            [getRegister.pending]: (state, action) => {
                state.status = "pending";
            },
            [getRegister.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
            },
        },
    });
    
    
// export const {  } = rootReducer.actions;
export default rootReducer.reducer;