import Book1 from "../assets/Book1.png";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface OrderDetailInterface {
    product_id: {
        author: string | undefined,
        description: string,
        bookName: string,
        discountPrice: number,
        price: number,
        bookImage: string,
    },
    quantityToBuy: number,
    updatedAt: string,
    bookImage: string,
}

function MyOrderCardComponent({ bookList }: { bookList: OrderDetailInterface }) {

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
                            <h1 className="font-bold">Rs. {bookList.product_id?.discountPrice}</h1>
                            <p className="line-through text-slate-400 text-sm">Rs. {bookList?.product_id?.price}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-slate-400 text-[13px]">Quantity : {bookList?.quantityToBuy}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1><FiberManualRecordIcon sx={{ color: "green", fontSize: "15px", marginRight: "10px" }} />Order Placed on {bookList?.updatedAt?.slice(0, 10)}</h1>
            </div>
        </div>
    </>)
}

export default MyOrderCardComponent;