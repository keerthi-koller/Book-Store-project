import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name : "feedback",
    initialState : {
        feedbackItems : []
    },
    reducers : {
        addItemToFeedbackList : (state:any, action) => {
            state.feedbackItems.push(action.payload);
        },
        getFeedbackLists : (state:any, action) => {
            state.feedbackItems = action.payload;
        },
    }
})
export const { addItemToFeedbackList, getFeedbackLists } = reviewSlice.actions;
export default reviewSlice.reducer;