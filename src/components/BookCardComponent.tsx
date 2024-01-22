import Book1 from "../assets/Book1.png";
import StarIcon from '@mui/icons-material/Star';

interface BooksListInterface {
    description : string,
    bookName : string,
    discountPrice : number,
    _id : string,
    admin_user_id : string,
    price : number,
    quantity : number,
    author : string
}

function BookCardComponent ({bookList}:{bookList:BooksListInterface}) {

    return (<>
        <div className="h-auto w-[235px] border-2 border-[#E2E2E2]">
            <div className="w-full h-[172px] flex justify-center items-center bg-[#F5F5F5]">
                <img src={Book1} alt="img" className="" />
            </div>
            <div className="flex w-full items-center p-2 pl-5">
                <div className="flex flex-col gap-[2px]">
                    <div>
                        <h1 className="font-bold">{bookList.bookName}</h1>
                    </div>
                    <div>
                        <p className="text-slate-400 text-[13px]">by {bookList.author}</p>
                    </div>
                    <div className="flex w-1/2 gap-2">
                        <div className="w-2/4 h-[23px] bg-green-700 text-white flex justify-evenly items-center">
                            <h1 className="text-[11px]">4.5</h1>
                            <p className="text-[9px]"><StarIcon sx={{fontSize:"13px"}} /></p>
                        </div>
                        <div>
                            <p className="text-slate-400">{bookList.quantity}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <h1 className="font-bold">Rs. {bookList.discountPrice}</h1>
                        <p className="line-through text-slate-400 text-sm">Rs. {bookList.price}</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default BookCardComponent;