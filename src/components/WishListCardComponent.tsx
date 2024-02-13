import { IconButton } from "@mui/material";
import Book1 from "../assets/Book1.png";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteWishListBook } from "../utils/BookUtil";
import { deleteWishListBooks } from "../utils/store/wishListSlice";
import { useDispatch } from "react-redux";


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
        bookImage: string,
    },
    description: string,
    bookName: string,
    discountPrice: number,
    _id: string,
    admin_user_id: string,
    price: number,
    quantity: number,
    author: string,
    quantityToBuy: number,
    bookImage: string,
}

function WishListCardComponent({ bookList }: { bookList: BooksListInterface }) {

    const dispatch = useDispatch();

    const removeBookFromWishList = () => {
        deleteWishListBook(bookList?.product_id._id);
        dispatch(deleteWishListBooks(bookList?._id));
    }

    return (<>
        <div className="w-full flex justify-between items-center bg-white">
            <div className="flex w-1/2 m-5">
                <div className="w-1/2 h-[150px] flex">
                    <img src={Book1} alt="img" className="w-3/4 h-full" />
                </div>
                <div className="flex w-1/2 items-center">
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full">
                            <h1 className="font-bold">{bookList?.product_id?.bookName}</h1>
                        </div>
                        <div className="w-full">
                            <p className="text-slate-400 text-[13px]">{bookList?.product_id?.author}</p>
                        </div>
                        <div className="w-full flex gap-2">
                            <h1 className="font-bold">Rs. {bookList?.product_id?.discountPrice}</h1>
                            <p className="line-through text-slate-400 text-sm">Rs. {bookList?.product_id?.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <IconButton onClick={removeBookFromWishList}>
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </div>
    </>)
}

export default WishListCardComponent;