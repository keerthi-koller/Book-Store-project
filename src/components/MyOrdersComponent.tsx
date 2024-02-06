import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyOrderCardComponent from "./MyOrderCardComponent";

interface OrderDetailInterface {
    product_id : {
        author:string,
        description:string,
        bookName:string,
        discountPrice:number,
        price:number,
    },
    quantityToBuy : number,
    updatedAt: string,
}

function MyOrdersComponent () {

    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState<OrderDetailInterface[]>();

    const getAllOrders = () => {
        const orders = localStorage.getItem("myOrders");
        if (orders != null)
        {
            const myOrders = JSON.parse(orders);
            setOrderDetail(myOrders);
        }
    }

    useEffect( () => {
        getAllOrders();
    }, [] );

    
    return (<>
        <div className="w-full flex justify-center items-center">
            <div className="w-3/4 flex flex-col gap-10 m-10">
                <div className="flex w-full items-center">
                    <Button className="text-slate-500" onClick={() => navigate("/book")} sx={{ color: "gray", fontSize: "13px" }}>Home /</Button>
                    <p className="text-[12px] font-bold">My Orders</p>
                </div>
                <div className="w-3/4 border-2 border-[#E2E2E2] flex flex-col gap-5">
                    <div className="flex justify-between border border-[#E4E4E4] p-5 bg-[#F5F5F5]">
                        <div className="">
                            <h1 className="font-bold">My Orders ({orderDetail?.length})</h1>
                        </div>
                    </div>
                    <div className="">
                        {orderDetail?.length == 0 ?
                            <h1 className="w-3/4 flex justify-center">Your Wishlist is Empty</h1>
                            :
                            orderDetail?.map((val: any) =>
                                <div className="border-b-2 p-5 flex justify-between items-center">
                                    <MyOrderCardComponent bookList={val} key={val._id} />
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>


        {/* {orderDetail?.map( (ele:any) => {
            return (<>
                <h1>{ele.product_id}ji</h1>
            </>)
        } )} */}
    </>)
}

export default MyOrdersComponent;