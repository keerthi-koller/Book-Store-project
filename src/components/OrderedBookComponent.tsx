import Book1 from "../assets/Book1.png";

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
        quantityToBuy: number,
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

function OrderedBookComponent ({ bookList }: { bookList: BooksListInterface }) {
    
    return (<>
        <div className="w-1/2 flex justify-center bg-white">
            <div className="flex w-full m-5">
                <div className="w-1/3 h-[130px] flex">
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
                        <div>
                            <p>Quantity: {bookList?.quantityToBuy}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default OrderedBookComponent;