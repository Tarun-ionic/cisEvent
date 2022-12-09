import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventApi } from "../constant/events.api";

import {withOutTokenGet, withoutTokenPost, withTokenPost, withTokenGet} from '../services/common.services'


export const getEventsData = createAsyncThunk("GET_EVENTS",(reqParam) => withTokenPost(eventApi.EVENTS+'?page=1', reqParam));
export const getEventLikeUpdate = createAsyncThunk("UPDATE_LIKE",(reqParam) => withTokenPost(eventApi.UPDATELIKE, reqParam));
    const initialState = {
        status: null,
        data: null,
        apiName : ''
    };

    export const eventReducer = createSlice({
        name:  "eventSlice",
        initialState,
        extraReducers: {
            [getEventsData.pending]: (state, action) => {
                state.status = "pending";
            },
            [getEventsData.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getEvents'
            },
            [getEventsData.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [getEventLikeUpdate.pending]: (state, action) => {
                state.status = "pending";
            },
            [getEventLikeUpdate.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getLikesUpdate'
            },
            [getEventLikeUpdate.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
        
        },
    });
    
    
// export const {  } = rootReducer.actions;
export default eventReducer.reducer;