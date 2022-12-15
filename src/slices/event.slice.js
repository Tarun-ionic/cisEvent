import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventApi } from "../constant/events.api";

import {withOutTokenGet, withoutTokenPost, withTokenPost, withTokenGet} from '../services/common.services'


export const getEventsData = createAsyncThunk("GET_EVENTS",(reqParam) => withTokenPost(eventApi.EVENTS+'?page=1', reqParam));
export const getMyEvents = createAsyncThunk("GET_MY_EVENTS",(reqParam) => withTokenPost(eventApi.MY_EVENTS+'?page=1', reqParam));
export const getLikedEvents = createAsyncThunk("GET_LIKED_EVENTS",(reqParam) => withTokenPost(eventApi.LIKED_EVENTS+'?page=1', reqParam));
export const getEventLikeUpdate = createAsyncThunk("UPDATE_LIKE",(reqParam) => withTokenPost(eventApi.UPDATELIKE, reqParam));
export const getEventInterestUpdate = createAsyncThunk("UPDATE_INTEREST_UPDATE",(reqParam) => withTokenPost(eventApi.UPDATE_INTEREST, reqParam));

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
                state.data = [];
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
                state.data = [];
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
            [getEventInterestUpdate.pending]: (state, action) => {
                state.status = "pending";
                state.data = [];
            },
            [getEventInterestUpdate.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getInterestUpdate'
            },
            [getEventInterestUpdate.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [getLikedEvents.pending]: (state, action) => {
                state.status = "pending";
                state.data = [];
            },
            [getLikedEvents.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getLikedEvents'
            },
            [getLikedEvents.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [getMyEvents.pending]: (state, action) => {
                state.status = "pending";
                state.data = [];
            },
            [getMyEvents.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getMyEvents'
            },
            [getMyEvents.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
        
        },
    });
    
    
export default eventReducer.reducer;