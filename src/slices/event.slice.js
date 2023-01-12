import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventApi } from "../constant/events.api";

import {withOutTokenGet, withTokenFormPost, withTokenPost, withTokenGet} from '../services/common.services'

export const deleteEvent = createAsyncThunk("DELETE_EVENT",(reqParam) => withTokenPost(eventApi.DELETE_EVENT, reqParam));
export const getEventsCategory = createAsyncThunk("GET_EVENTS_CATEGORY",() => withTokenGet(eventApi.EVENT_CATEGORY));
export const getEventsData = createAsyncThunk("GET_EVENTS",(reqParam) => withTokenPost(eventApi.EVENTS+'?page=1', reqParam));
export const getMyEvents = createAsyncThunk("GET_MY_EVENTS",(reqParam) => withTokenPost(eventApi.MY_EVENTS+'?page=1', reqParam));
export const getLikedEvents = createAsyncThunk("GET_LIKED_EVENTS",(reqParam) => withTokenPost(eventApi.LIKED_EVENTS+'?page=1', reqParam));
export const getEventLikeUpdate = createAsyncThunk("UPDATE_LIKE",(reqParam) => withTokenPost(eventApi.UPDATELIKE, reqParam));
export const getEventInterestUpdate = createAsyncThunk("UPDATE_INTEREST_UPDATE",(reqParam) => withTokenPost(eventApi.UPDATE_INTEREST, reqParam));
export const creatEevent = createAsyncThunk("CREATE_EVENT",(reqParam) => withTokenFormPost(eventApi.CREATE_EVENT, reqParam));
export const getInterestedEventsData = createAsyncThunk("GET_INTERESTED_EVENTS",(reqParam) => withTokenPost(eventApi.INTERESTED_EVENT+'?page=1', reqParam));



    const initialState = {
        status: null,
        data: null,
        apiName : '',
        categories:null
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
                console.log("getMyEvents");
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getMyEvents'
            },
            [getMyEvents.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [getEventsCategory.pending]: (state, action) => {
                console.log("Categorypending");
                state.status = "pending";
                state.apiName = 'getEventsCategory'
            },
            [getEventsCategory.fulfilled]: (state, action) => {
                console.log("Categoryfullfilled");
                state.status = "fulfilled";
                state.categories = action.payload;
                state.apiName = 'getEventsCategory'
            },
            [getEventsCategory.rejected]: (state, action) => {
                state.status = "rejected";
                state.apiName = 'getEventsCategory'
            },
            [creatEevent.pending]: (state, action) => {
                state.status = "pending";
                state.data = [];
            },
            [creatEevent.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'createEvent'
            },
            [creatEevent.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [deleteEvent.pending]: (state, action) => {
                state.status = "pending";
                state.data = [];
            },
            [deleteEvent.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'deleteEvent'
            },
            [deleteEvent.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
            [getInterestedEventsData.pending]: (state, action) => {
                state.status = "pending";
                state.data = [];
            },
            [getInterestedEventsData.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
                state.apiName = 'getInterestedEvents'
            },
            [getInterestedEventsData.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
        
        
        },
    });
    
    
export default eventReducer.reducer;