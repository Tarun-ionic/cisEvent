import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../constant/user.api";

import {withOutTokenGet, withoutTokenPost, withTokenPost, withTokenGet} from '../services/common.services'


export const getProfile = createAsyncThunk("GET_PROFILE",() => withTokenGet(userApi.PROFILE));
    const initialState = {
        status: null,
        data: null
    };

    export const userSlice = createSlice({
        name:  "userSlice",
        initialState,
        extraReducers: {
            [getProfile.pending]: (state, action) => {
                state.status = "pending";
            },
            [getProfile.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
            },
            [getProfile.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
        
        },
    });
    
    
// export const {  } = rootReducer.actions;
export default userSlice.reducer;