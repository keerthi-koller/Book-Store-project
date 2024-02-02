import { Button } from "@mui/material";
import Book1 from "../assets/Book1.png";

function OrderedBookComponent () {
    return (<>
        <div className="w-1/2 flex justify-center bg-white">
            <div className="flex w-full m-5">
                <div className="w-1/3 h-[130px] flex">
                    <img src={Book1} alt="img" className="w-3/4 h-full" />
                </div>
                <div className="flex w-1/2 items-center">
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full">
                            <h1 className="font-bold">Don't Make Me Think</h1>
                        </div>
                        <div className="w-full">
                            <p className="text-slate-400 text-[13px]">by Steve Krug</p>
                        </div>
                        <div className="w-full flex gap-2">
                            <h1 className="font-bold">Rs. 1500</h1>
                            <p className="line-through text-slate-400 text-sm">Rs. 2000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default OrderedBookComponent;