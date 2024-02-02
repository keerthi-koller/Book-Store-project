import { Button, IconButton } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishListCardComponent from "./WishListCardComponent";

interface BookDetailInterface {
    product_id: {
        description: string,
        bookName: string,
        discountPrice: number,
        _id: string | undefined,
        admin_user_id: string,
        price: number | undefined,
        quantity: number | undefined,
        author: string,
    },
    author: string,
    bookName: string,
    description: string,
    discountPrice: number | undefined,
    price: number | undefined,
    quantity: number | undefined,
    _id: string
    
}

function WishListComponent() {

    const navigate = useNavigate();
    const [bookDetail, setBookDetail] = useState<BookDetailInterface[] | undefined>();

    const wishListItems = useSelector((store: any) => store.wishList.wishListItems);

    console.log(bookDetail);

    useEffect(() => {
        setBookDetail(wishListItems);
    }, [wishListItems]);


    return (<>
        <div className="w-full flex justify-center items-center">
            <div className="w-3/4 flex flex-col gap-10 m-10">
                <div className="flex w-full items-center">
                    <Button className="text-slate-500" onClick={() => navigate("/book")} sx={{ color: "gray", fontSize: "13px" }}>Home /</Button>
                    <p className="text-[12px] font-bold">My Wishlist</p>
                </div>
                <div className="w-3/4 border-2 border-[#E2E2E2] flex flex-col gap-5">
                    <div className="flex justify-between border border-[#E4E4E4] p-5 bg-[#F5F5F5]">
                        <div className="">
                            <h1 className="font-bold">My Wishlist ({bookDetail?.length})</h1>
                        </div>
                    </div>
                    <div className="">
                        {bookDetail?.length == 0 ?
                            <h1 className="w-3/4 flex justify-center">Your Wishlist is Empty</h1>
                            :
                            bookDetail?.map((val: any) =>
                                <div className="border-b-2 p-5 flex justify-between items-center">
                                    <WishListCardComponent bookList={val} key={val._id} />
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
        <Outlet />
    </>)
}

export default WishListComponent;