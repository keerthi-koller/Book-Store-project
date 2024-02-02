import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import bookSlice from "./bookSlice";
import wishListSlice from "./wishListSlice";
import reviewSlice from "./reviewSlice";

const appStore = configureStore({
    reducer:{
        cart : cartSlice,
        books : bookSlice,
        wishList : wishListSlice,
        feedback : reviewSlice
    }
})

export default appStore;