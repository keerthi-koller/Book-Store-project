import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CartCardComponent from "./CartCardComponent";
import { useEffect, useState } from "react";
import OrderedBookComponent from "./OrderedBookComponent";

interface BookDetailInterface {
    author: string,
    bookName: string,
    description: string,
    discountPrice: number | undefined,
    price: number | undefined,
    quantity: number | undefined,
    _id: string
}

function CartComponent() {

    const navigate = useNavigate();
    const [bookDetail, setBookDetail] = useState<BookDetailInterface[] | undefined>();

    const cartItems = useSelector((store: any) => store.cart.cartitems);
    useEffect(() => {
        setBookDetail(cartItems);
    }, [cartItems]);

    return (<>
        <div className="w-full flex justify-center items-center">
            <div className="w-3/4 flex flex-col gap-10 m-10">
                <div className="flex w-full items-center">
                    <Button className="text-slate-500" onClick={() => navigate("/book")} sx={{ color: "gray", fontSize: "13px" }}>Home /</Button>
                    <p className="text-[12px] font-bold">My cart</p>
                </div>
                <div className="w-3/4 border-2 border-[#E2E2E2] flex flex-col gap-5 p-5">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-bold">My cart ({bookDetail?.length})</h1>
                        </div>
                        <div className="border border-2 border-[#E2E2E2] p-1">
                            <h1>BridgeLabz Solutions Bangalore</h1>
                        </div>
                    </div>
                        {bookDetail?.length == 0 ?
                            <h1 className="w-3/4 flex justify-center">Your Cart is Empty</h1>
                            :
                            bookDetail?.map((val: any) => <CartCardComponent bookList={val} key={val._id} />)
                        }
                    <div className='flex justify-end'>
                        <Button variant="contained">Place Order</Button>
                    </div>
                </div>
                <div className="w-3/4 border-2 border-[#E2E2E2] p-5">
                    <div className="w-full flex flex-col">
                        <div className="flex justify-between">
                            <h1 className="font-bold">Customer Details</h1>
                            <Button variant="outlined" color="error">Add New Address</Button>
                        </div>
                        <div className="w-3/4 flex gap-10 p-5">
                            <div className="w-1/2">
                                <label className="font-bold text-xs">Full Name</label>
                                <div className="border border-2 border-[#E2E2E2] h-10 flex items-center pl-2">
                                    <p>Poonam Yadav</p>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="font-bold text-xs">Mobile Number</label>
                                <div className="border border-2 border-[#E2E2E2] h-10 flex items-center pl-2">
                                    <p>81678954778</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="work"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="work" control={<Radio color="error" size="small" />} label="1. Work" />
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="flex flex-col w-3/4 gap-2">
                                        <h1 className="font-bold text-xs">Address</h1>
                                        <div className="border border-2 border-[#E2E2E2] bg-[#F5F5F5] p-2">
                                            <h1 className="text-slate-500 text-sm">BridgeLabz Solutions LLP, No.42, 14th Main, 15th Cross, Sector 4, Opp to BDA Complex, near Kumarakom restaurant, HSR Layout Bangalore.</h1>
                                        </div>
                                    </div>
                                    <div className="w-3/4 flex gap-10">
                                        <div className="w-1/2 flex flex-col gap-2">
                                            <h1 className="font-bold text-xs">City/Town</h1>
                                            <div className="border border-2 border-[#E2E2E2] bg-[#F5F5F5] p-2">
                                                <h1 className="text-slate-500 text-sm">Bengaluru</h1>
                                            </div>
                                        </div>
                                        <div className="w-1/2 flex flex-col gap-2">
                                            <h1 className="font-bold text-xs">State</h1>
                                            <div className="border border-2 border-[#E2E2E2] bg-[#F5F5F5] p-2">
                                                <h1 className="text-slate-500 text-sm">Karnataka</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <FormControlLabel value="home" control={<Radio color="error" size="small" />} label="2. Home" />
                                <div className="w-3/4 flex">
                                    <div className="w-full p-5 flex flex-col gap-2">
                                        <h1 className="font-bold">Address</h1>
                                        <h1 className="text-sm">BridgeLabz Solutions LLP, No.42, 14th Main, 15th Cross, Sector 4, Opp to BDA Complex, near Kumarakom restaurant, HSR Layout Bangalore.</h1>
                                    </div>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='flex justify-end'>
                        <Button variant="contained">Continue</Button>
                    </div>
                </div>
                <div className="w-3/4 border border-2 border-[#F2F2F2] p-5">
                    <h1 className="font-bold">Order Summery</h1>
                    <OrderedBookComponent />
                    <div className='flex justify-end'>
                        <Button variant="contained">Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
        <Outlet />
    </>)
}

export default CartComponent;