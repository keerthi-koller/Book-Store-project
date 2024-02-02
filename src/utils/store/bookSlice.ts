import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name : "booklist",
    initialState : {
        bookList : [],
    },
    reducers : {
        addBookList : (state, action) => {
            state.bookList = action.payload;
        },
    },
});

export const { addBookList } = bookSlice.actions;
export default bookSlice.reducer;