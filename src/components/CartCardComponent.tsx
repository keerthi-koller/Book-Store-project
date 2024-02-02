import { useState } from "react";
import Book1 from "../assets/Book1.png";
import { Button } from "@mui/material";
import { deleteCartBook, updateCartQty } from "../utils/BookUtil";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartListBooks, updateCartList } from "../utils/store/cartSlice";

interface BooksListInterface {
    product_id: {
        description: string,
        bookName: string,
        discountPrice: number,
        _id: string,
        admin_user_id: string,
        price: number,
        quantity: number,
        author: string,
        quantityToBuy: number
    },
    description: string,
    bookName: string,
    discountPrice: number,
    _id: string,
    admin_user_id: string,
    price: number,
    quantity: number,
    author: string,
    quantityToBuy: number
}

function CartCardComponent({ bookList }: { bookList: BooksListInterface }) {
    const dispatch = useDispatch();

    const incrementAddedItems = () => {
        let Qty = bookList.quantityToBuy;
        if (Qty != bookList.product_id.quantity) {
            Qty++
            updateCartQty(bookList._id, Qty);
            dispatch(updateCartList({ "id": bookList._id, "quantity": Qty }))
        }
    }

    const decrementAddedItems = () => {
        let Qty = bookList.quantityToBuy;
        if (Qty == 1) {
            return;
        }
        if (Qty != 0) {
            Qty--
            updateCartQty(bookList._id, Qty);
            dispatch(updateCartList({ "id": bookList._id, "quantity": Qty }))
        }
    }

    const removeBookFromCart = () => {
        deleteCartBook(bookList._id);
        dispatch(deleteCartListBooks(bookList._id));
    }

    return (<>
        <div className="w-1/2 flex justify-center bg-white">
            <div className="flex w-full m-5">
                <div className="w-1/2 h-[150px] flex">
                    <img src={Book1} alt="img" className="w-3/4 h-full" />
                </div>
                <div className="flex w-1/2 items-center">
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full">
                            <h1 className="font-bold">{bookList.product_id.bookName}</h1>
                        </div>
                        <div className="w-full">
                            <p className="text-slate-400 text-[13px]">{bookList.product_id.author}</p>
                        </div>
                        <div className="w-full flex gap-2">
                            <h1 className="font-bold">Rs. {bookList.product_id.discountPrice}</h1>
                            <p className="line-through text-slate-400 text-sm">Rs. {bookList.product_id.price}</p>
                        </div>
                        <div className='w-3/4 flex gap-5'>
                            <div className="w-1/2 flex justify-center items-center gap-1">
                                <div className='w-1/5 h-[22px] border-2 flex justify-center items-center rounded-full'>
                                    <Button sx={{ fontWeight: "bold", fontSize: "13px", borderColor: "#D1D1D1", color: "black" }} onClick={decrementAddedItems}>-</Button>
                                </div>
                                <Button variant="outlined" sx={{ backgroundColor: "transparent", color: "black", width: "80px", height: "22px", borderColor: "#D1D1D1" }}>{bookList.quantityToBuy}</Button>
                                <div className='w-1/5 h-[22px] border-2 flex justify-center items-center rounded-full'>
                                    <Button sx={{ fontWeight: "bold", fontSize: "13px", borderColor: "#D1D1D1", color: "black" }} onClick={incrementAddedItems}>+</Button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <Button sx={{ fontWeight: "bold", fontSize: "13px", borderColor: "#D1D1D1", color: "black" }} onClick={removeBookFromCart}>Remove</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default CartCardComponent;