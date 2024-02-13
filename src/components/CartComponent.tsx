import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import CartCardComponent from "./CartCardComponent";
import { useEffect, useState } from "react";
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import OrderedBookComponent from "./OrderedBookComponent";
import { customerDetails } from "../utils/UserUtil";
import { deleteCartListBooks, getCartListBooks, updateCartAddress } from "../utils/store/cartSlice";
import { addOrder, deleteCartBook } from "../utils/BookUtil";

interface BookDetailInterface {
    author: string,
    bookName: string,
    description: string,
    discountPrice: number | undefined,
    price: number | undefined,
    quantity: number | undefined,
    _id: string,
    bookImage: string,
    user_id: {
        fullName: string,
        phone: string,
    }
}

function CartComponent() {

    const [showOffice, setShowOffice] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [expandedNew, setExpandedNew] = useState(false);
    const [bookDetail, setBookDetail] = useState<BookDetailInterface[] | undefined>();
    const [orderEmpty, setOrderEmpty] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((store: any) => store.cart.cartitems);

    useEffect(() => {
        setBookDetail(cartItems);
    }, [cartItems]);

    console.log(cartItems);
    

    const addBookToOrder = () => {
        const orders = cartItems.map((ele: any) => {
            const orderDetail = {
                product_id: ele?.product_id?._id,
                product_name: ele?.product_id?.bookName,
                product_quantity: ele?.quantityToBuy,
                product_price: ele?.product_id?.price,
            }
            return orderDetail;
        })
        const orderedBooks = {
            orders: orders,
        }
        addOrder(orderedBooks);

        let orderDetail: any;
        if (localStorage.getItem("myOrders") === null) {
            orderDetail = [];
        }
        else {
            orderDetail = JSON.parse(localStorage.getItem("myOrders")!);
        }

        orderDetail.push(...cartItems);
        localStorage.setItem("myOrders", JSON.stringify(orderDetail));

        cartItems.map((ele: any) => {
            deleteCartBook(ele._id);
            dispatch(deleteCartListBooks(ele._id));
        })
    }

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleExpansionNew = () => {
        setExpandedNew((prevExpanded) => !prevExpanded);
    };

    const updateHomeAddress = () => {
        const obj = {
            "addressType": "Home",
            "fullAddress": (document.getElementById("fullAddressHome") as HTMLInputElement).value,
            "city": (document.getElementById("cityHome") as HTMLInputElement).value,
            "state": (document.getElementById("stateHome") as HTMLInputElement).value,
        }
        customerDetails(obj);
        dispatch(updateCartAddress(obj));
    }

    const updateOfficeAddress = () => {
        const obj = {
            "addressType": "Office",
            "fullAddress": (document.getElementById("fullAddressOffice") as HTMLInputElement).value,
            "city": (document.getElementById("cityOffice") as HTMLInputElement).value,
            "state": (document.getElementById("stateOffice") as HTMLInputElement).value,
        }
        customerDetails(obj);
        dispatch(updateCartAddress(obj));
    }

    const placeOrderEmpty = () => {
        (bookDetail?.length == 0 || bookDetail?.length == undefined) ? setOrderEmpty(true) : setOrderEmpty(false)
    }

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
                    </div>
                    {bookDetail?.length == 0 ?
                        <h1 className="w-3/4 flex justify-center p-10">Your Cart is Empty</h1>
                        :
                        bookDetail?.map((val: any) => <CartCardComponent bookList={val} key={val._id} />)
                    }
                    {orderEmpty ? <h1 className="w-3/4 flex text-red-500 justify-center mt-[-20px]">Please add books to cart to continue</h1> : ""}
                    <div className='flex justify-end'>
                        {(bookDetail?.length == 0 || bookDetail?.length == undefined) ?
                            <Button variant="contained" onClick={placeOrderEmpty}>Place Order</Button>
                            :
                            <Accordion
                                expanded={expanded}
                                onChange={handleExpansion}
                                slots={{ transition: Fade as AccordionSlots['transition'] }}
                                slotProps={{ transition: { timeout: 400 } }}
                                sx={{
                                    boxShadow: "none",
                                    '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                                }}
                            >
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Button variant="contained">Place Order</Button>
                                </AccordionSummary>
                            </Accordion>
                        }
                    </div>
                </div>


                <div className="w-3/4">
                    <Accordion
                        expanded={expanded}
                        onChange={handleExpansion}
                        slots={{ transition: Fade as AccordionSlots['transition'] }}
                        slotProps={{ transition: { timeout: 400 } }}
                        sx={{
                            '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                            '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                        }}
                    >
                        <Typography className="p-5 font-bold">Customer Details</Typography>
                        <AccordionDetails>
                            <div className="w-full">
                                <div className="w-full flex flex-col">
                                    <div className="flex justify-end mt-[-50px]">
                                        <Button variant="outlined" color="error">Add New Address</Button>
                                    </div>
                                    <div className="w-3/4 flex gap-10 p-5">
                                        <div className="w-1/2">
                                            <label className="font-bold text-xs">Full Name</label>
                                            <div className="border border-2 border-[#E2E2E2] h-10 flex items-center pl-2">
                                                <p>{cartItems[0]?.user_id?.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <label className="font-bold text-xs">Mobile Number</label>
                                            <div className="border border-2 border-[#E2E2E2] h-10 flex items-center pl-2">
                                                <p>{cartItems[0]?.user_id?.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/4">
                                    <FormControl className="w-full">
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="Office"
                                            name="radio-buttons-group"
                                        >
                                            <div className="flex">
                                                <FormControlLabel value="Office" control={<Radio color="error" size="small" />} label="1. Office" />
                                                <Button variant="outlined" sx={{ height: "25px", fontSize: "10px", marginTop: "8px", textAlign: "center" }} onClick={() => { setShowOffice(true); setShowHome(false); }}>edit</Button>
                                            </div>
                                            <div className="w-full p-5 flex flex-col gap-5">
                                                <h1 className="font-bold text-xs">Address</h1>
                                                {!showOffice ?
                                                    <div className="w-full flex flex-col gap-2">
                                                        {cartItems[0]?.user_id?.address.map((ele: any, key: any) => {
                                                            if (ele?.addressType == "Office") {
                                                                return (<>
                                                                    <h1 className="text-slate-500 text-sm">{ele.fullAddress} {ele.city} {ele.state}</h1>
                                                                </>)
                                                            }
                                                        })}
                                                    </div>
                                                    :
                                                    <div className="w-full flex flex-col gap-2">
                                                        <TextField id="fullAddressOffice" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Office")[0]?.fullAddress} />
                                                        <div className="w-3/4 flex gap-10">
                                                            <div className="w-1/2 flex flex-col gap-2">
                                                                <h1 className="font-bold text-xs">City/Town</h1>
                                                                <TextField id="cityOffice" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Office")[0]?.city} />
                                                            </div>
                                                            <div className="w-1/2 flex flex-col gap-2">
                                                                <h1 className="font-bold text-xs">State</h1>
                                                                <TextField id="stateOffice" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Office")[0]?.state} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <Button variant="contained" sx={{ height: "25px", fontSize: "10px", marginTop: "8px", textAlign: "center" }} onClick={() => { setShowOffice(false); updateOfficeAddress() }}>save</Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="flex">
                                                <FormControlLabel value="home" control={<Radio color="error" size="small" />} label="2. Home" />
                                                <Button variant="outlined" sx={{ height: "25px", fontSize: "10px", marginTop: "8px", textAlign: "center" }} onClick={() => { setShowHome(true); setShowOffice(false); }}>edit</Button>
                                            </div>
                                            <div className="w-full p-5 flex flex-col gap-5">
                                                <h1 className="font-bold text-xs">Address</h1>
                                                {!showHome ?
                                                    <div className="w-full flex flex-col gap-2">
                                                        {cartItems[0]?.user_id?.address.map((ele: any, key: any) => {
                                                            if (ele?.addressType == "Home") {
                                                                return (<>
                                                                    <h1 className="text-slate-500 text-sm">{ele.fullAddress} {ele.city} {ele.state}</h1>
                                                                </>)
                                                            }
                                                        })}
                                                    </div>
                                                    :
                                                    <div className="w-full flex flex-col gap-2">
                                                        <TextField id="fullAddressHome" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.fullAddress} />
                                                        <div className="w-3/4 flex gap-10">
                                                            <div className="w-1/2 flex flex-col gap-2">
                                                                <h1 className="font-bold text-xs">City/Town</h1>
                                                                <TextField id="cityHome" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.city} />
                                                            </div>
                                                            <div className="w-1/2 flex flex-col gap-2">
                                                                <h1 className="font-bold text-xs">State</h1>
                                                                <TextField id="stateHome" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.state} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <Button variant="contained" sx={{ height: "25px", fontSize: "10px", marginTop: "8px", textAlign: "center" }} onClick={() => { setShowHome(false); updateHomeAddress() }}>save</Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className='flex justify-end'>
                                    <Accordion
                                        expanded={expandedNew}
                                        onChange={handleExpansionNew}
                                        slots={{ transition: Fade as AccordionSlots['transition'] }}
                                        slotProps={{ transition: { timeout: 400 } }}
                                        sx={{
                                            boxShadow: "none",
                                            '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                            '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                                        }}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Button variant="contained">Continue</Button>
                                        </AccordionSummary>
                                    </Accordion>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion >
                    <Accordion
                        expanded={expandedNew}
                        onChange={handleExpansionNew}
                        slots={{ transition: Fade as AccordionSlots['transition'] }}
                        slotProps={{ transition: { timeout: 400 } }}
                        sx={{
                            '& .MuiAccordion-region': { height: expandedNew ? 'auto' : 0 },
                            '& .MuiAccordionDetails-root': { display: expandedNew ? 'block' : 'none' },
                        }}
                    >
                        <Typography className="p-5 font-bold">Order Summery</Typography>
                        <AccordionDetails>
                            <div className="w-full">
                                {bookDetail?.map((val: any) => <OrderedBookComponent bookList={val} key={val._id} />)}
                                <div className='flex justify-end'>
                                    <Button variant="contained" onClick={() => { addBookToOrder(); navigate("/book/order"); }}>Checkout</Button>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div >
            </div >
        </div >
        <Outlet />
    </>)
}

export default CartComponent;