import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name : "wishList",
    initialState : {
        wishListItems : [],
    },
    reducers : {
        addItemToWishList : (state:any, action) => {
            state.wishListItems.push(action.payload);
        },
        getWishListBooks : (state:any, action) => {
            state.wishListItems = action.payload;
        },
        deleteWishListBooks : (state:any, action) => {
            state.wishListItems=state.wishListItems.filter((book:any) => book._id !== action.payload);
        }
    },
});

export const { addItemToWishList, getWishListBooks, deleteWishListBooks } = wishListSlice.actions;
export default wishListSlice.reducer;