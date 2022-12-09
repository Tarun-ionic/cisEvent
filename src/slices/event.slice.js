import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventApi } from "../constant/events.api";

import {withOutTokenGet, withoutTokenPost, withTokenPost, withTokenGet} from '../services/common.services'


export const getEventsData = createAsyncThunk("GET_EVENTS",(reqParam) => withTokenPost(eventApi.EVENTS+'?page=1', reqParam));
    console.log('eventApi.EVENTS+/?page=1', eventApi.EVENTS)
    const initialState = {
        status: null,
        data: null
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
            },
            [getEventsData.rejected]: (state, action) => {
                state.status = "rejected";
                state.data = action.payload;
            },
        
        },
    });
    
    
// export const {  } = rootReducer.actions;
export default eventReducer.reducer;