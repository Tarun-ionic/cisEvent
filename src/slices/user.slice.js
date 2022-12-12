import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../constant/user.api";

import {withOutTokenGet, withTokenFormPost ,withoutTokenPost,withTokenPut, withTokenPost, withTokenGet} from '../services/common.services'


export const getProfile = createAsyncThunk("GET_PROFILE",() => withTokenGet(userApi.PROFILE));
export const updateProfileImg = createAsyncThunk("PROFILE_IMG",(reqParam) => withTokenFormPost(userApi.UPLOAD_IMG, reqParam));
export const updateProfile = createAsyncThunk("PROFILE_UPDATE",(reqParam) => withTokenPut(userApi.UPDATE_PROFILE, reqParam));

    const initialState = {
        status: null,
        data: null,
        apiName : ''
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
            [updateProfile.pending]: (state, action) => {
                state.status = "pending";
            },
            [updateProfile.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getProfileUpdate'
            },
            [updateProfile.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [updateProfileImg.pending]: (state, action) => {
                state.status = "pending";
            },
            [updateProfileImg.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'profileImg'
            },
            [updateProfileImg.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
        
        },
    });
    
    
// export const {  } = rootReducer.actions;
export default userSlice.reducer;