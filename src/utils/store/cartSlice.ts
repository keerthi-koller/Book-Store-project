import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        cartitems : [],
    },
    reducers : {
        addItemToCart : (state:any, action) => {
            state.cartitems.push(action.payload);
        },
        updateCartList : (state:any, action) => {
            state.cartitems.map( (ele:any) => {
                if (ele._id === action.payload.id) {
                    return ele.quantityToBuy = action.payload.quantity;
                }
                return ele
            } )
        },
        updateCartAddress : (state:any, action) => {
            state.cartitems[0]?.user_id?.address.map((ele:any) => {
                if (ele.addressType === action.payload.addressType) {
                    ele.fullAddress = action.payload.fullAddress;
                    ele.state = action.payload.state;
                    ele.city = action.payload.city;
                }
                return ele;
            })
        },
        getCartListBooks : (state:any, action) => {
            state.cartitems = action.payload;
        },
        deleteCartListBooks : (state:any, action) => {
            state.cartitems=state.cartitems.filter((book:any) => book._id !== action.payload);
        }
    },
});

export const { addItemToCart, getCartListBooks, deleteCartListBooks, updateCartAddress, updateCartList } = cartSlice.actions;
export default cartSlice.reducer;