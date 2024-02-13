import { useDispatch } from "react-redux";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import Book1 from "../assets/Book1.png";
import Book2 from "../assets/Book2.png";
import Book3 from "../assets/Book3.png";
import Book4 from "../assets/Book4.png";
import Book5 from "../assets/Book5.png";
import Book6 from "../assets/Book6.png";
import Book7 from "../assets/Book7.png";
import Book8 from "../assets/Book8.png";
import Book9 from "../assets/Book9.png";
import Book0 from "../assets/Book0.png";

interface BooksListInterface {
    description: string,
    bookName: string,
    discountPrice: number,
    _id: string,
    admin_user_id: string,
    price: number,
    quantity: number,
    author: string,
    bookImage: string,
}

function BookCardComponent({ bookList }: { bookList: BooksListInterface }) {

    const imgLists = [Book0, Book1, Book2, Book3, Book4, Book5, Book6, Book7, Book8, Book9];
    const navigate = useNavigate();
    const handleShowBookDetails = () => {
        navigate(`${bookList._id}`);
    }

    return (<>
        <div className="h-auto w-[235px] border-2 border-[#E2E2E2]" onClick={handleShowBookDetails}>
            <div className="w-full h-[172px] flex justify-center items-center bg-[#F5F5F5]">
                <img src={imgLists[Math.floor(Math.random() * (9 - 0 + 1))]} alt="img" className="" />
            </div>
            <div className="flex w-full items-center p-2 pl-5">
                <div className="flex flex-col gap-[2px]">
                    <div>
                        <h1 className="font-bold">{bookList?.bookName}</h1>
                    </div>
                    <div>
                        <p className="text-slate-400 text-[13px]">by {bookList?.author}</p>
                    </div>
                    <div className="flex w-1/2 gap-2">
                        <div className="w-2/4 h-[23px] bg-green-700 text-white flex justify-evenly items-center">
                            <h1 className="text-[11px]">4.5</h1>
                            <p className="text-[9px]"><StarIcon sx={{ fontSize: "13px" }} /></p>
                        </div>
                        <div>
                            <p className="text-slate-400">({bookList?.quantity})</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <h1 className="font-bold">Rs. {bookList?.discountPrice}</h1>
                        <p className="line-through text-slate-400 text-sm">Rs. {bookList?.price}</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default BookCardComponent;