import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BookFront from "../assets/BookFront.png";
import BookBg from "../assets/BookBG.png";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from 'react-router-dom';
import Book1 from "../assets/Book1.png";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateCartList } from '../utils/store/cartSlice';
import { addCartList, addFeedback, addWishList, getFeedback, updateCartQty } from '../utils/BookUtil';
import { addItemToWishList } from '../utils/store/wishListSlice';
import { addItemToFeedbackList, getFeedbackLists } from '../utils/store/reviewSlice';
import FeedbackComponent from './FeedbackComponent';

interface BookDetailInterface {
    product_id: any,
    author: string,
    bookName: string,
    description: string,
    discountPrice: number | undefined,
    price: number | undefined,
    quantity: number | undefined,
    _id: string | undefined
}

function BookDetails() {

    const [bookDetail, setBookDetail] = useState<BookDetailInterface | undefined>();
    const [showAddToBag, setShowAddToBag] = useState<boolean>();
    const [wishListed, setWishListed] = useState(false);
    const [value, setValue] = useState<number | null>();
    const [imgBorder1, setImgBorder1] = useState("#7C1E1E");
    const [imgBorder2, setImgBorder2] = useState("");
    const [imgView, setImgView] = useState(`${Book1}`);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bookId } = useParams();
    
    const books = useSelector((store: any) => store.books.bookList);
    const wishLists = useSelector((store: any) => store.wishList.wishListItems);
    const cartLists = useSelector((store: any) => store.cart.cartitems);
    const feedBackReviews = useSelector((store: any) => store.feedback.feedbackItems);

    const wish = wishLists.filter((ele: any) => ele._id == bookId);
    const cart = cartLists.filter((ele: any) => ele.product_id?._id == bookId);

    useEffect(() => {
        setBookDetail(books.filter((ele: any) => ele._id === bookId)[0]);
        if (wish[0]?._id) {
            setWishListed(true);
        }
        if (cart[0]?._id) {
            setShowAddToBag(true);
        }
    }, [books, wishLists, cartLists]);

    useEffect(() => {
        handleGetAllReviews();
    }, []);

    const wishListBook = () => {
        addWishList(bookDetail?._id);
        dispatch(addItemToWishList({ "product_id": bookDetail, "_id": bookDetail?._id }));
        setWishListed(true)
    }

    const addToCart = async () => {
        const cartId = await addCartList(bookDetail?._id);
        dispatch(addItemToCart({ "product_id": bookDetail, quantityToBuy:1, "_id": cartId._id }));
        setShowAddToBag(true);
    }

    const setImgFrontView = () => {
        setImgView(`${Book1}`);
        setImgBorder1("#7C1E1E");
        setImgBorder2("");
    }

    const setImgBackView = () => {
        setImgView(`${BookBg}`);
        setImgBorder2("#7C1E1E");
        setImgBorder1("");
    }

    const incrementAddedItems = () => {
        let Qty = cart[0].quantityToBuy;
        if (Qty != bookDetail?.quantity) {
            Qty++
            updateCartQty(cart[0]._id, Qty);
            dispatch(updateCartList({ "id": cart[0]._id, "quantity": Qty }));
        }
    }

    const decrementAddedItems = () => {
        let Qty = cart[0].quantityToBuy;
        if (Qty == 1) {
            return;
        }
        if (Qty != 0) {
            Qty--
            updateCartQty(cart[0]._id, Qty);
            dispatch(updateCartList({ "id": cart[0]._id, "quantity": Qty }));
        }
    }

    const handleSubmitReview = () => {
        const reviewText = (document.getElementById("review") as HTMLInputElement);
        const reviewObj = {
            comment: reviewText.value,
            rating: value
        }
        const feedBack = addFeedback(reviewObj, bookDetail?._id);
        dispatch(addItemToFeedbackList(feedBack));
    }

    const handleGetAllReviews = async () => {
        const reviews = await getFeedback(bookId!);
        dispatch(getFeedbackLists(reviews));
    }

    return (<>
        <div className='flex w-full flex-col justify-center items-center'>
            <div className='w-3/4 flex flex-col m-10 gap-10'>
                <div className="flex w-full items-center">
                    <Button className="text-slate-500" onClick={() => navigate("/book")} sx={{ color: "gray", fontSize: "13px" }}>Home /</Button>
                    <p className="text-[12px] font-bold">Book(01)</p>
                </div>
                <div className='w-full bg-white flex'>
                    <div className='w-2/4 flex'>
                        <div className=''>
                            <div className='border p-1' style={{ borderColor: `${imgBorder1}` }}>
                                <img src={BookFront} alt="img" onClick={setImgFrontView} />
                            </div>
                            <div className='border p-1' style={{ borderColor: `${imgBorder2}` }}>
                                <img src={BookBg} alt="img" className='w-[35px] h-[45px]' onClick={setImgBackView} />
                            </div>
                        </div>
                        <div className='w-9/12 flex flex-col gap-5 items-center'>
                            <div className="w-full h-[380px] flex justify-center items-center bg-white border-2">
                                <img src={imgView} alt="img" className="w-3/4 h-3/4" />
                            </div>
                            <div className='w-full flex justify-between gap-5'>
                                {showAddToBag ?
                                    <div className='w-1/2 flex justify-center items-center gap-2'>
                                        <div className='w-1/5 border-2 flex justify-center items-center rounded-full'>
                                            <Button sx={{ fontWeight: "bold", fontSize: "15px", borderColor: "#D1D1D1", color: "black" }} onClick={decrementAddedItems}>-</Button>
                                        </div>
                                        <Button variant="outlined" sx={{ backgroundColor: "transparent", color: "black", borderColor: "#D1D1D1" }}>{cart[0].quantityToBuy}</Button>
                                        <div className='w-1/5 border-2 flex justify-center items-center rounded-full'>
                                            <Button sx={{ fontWeight: "bold", fontSize: "15px", borderColor: "#D1D1D1", color: "black" }} onClick={incrementAddedItems}>+</Button>
                                        </div>
                                    </div> :
                                    <Button variant="contained" color='error' className='w-1/2' onClick={addToCart}>Add to Bag</Button>
                                }
                                {wishListed ?
                                    <Button variant="contained" className='w-1/2' sx={{ backgroundColor: "black", fontSize: "9px", "backgroundColor:hover": "black" }} ><FavoriteIcon sx={{ fontSize: "15px", marginRight: "10px", color: "red" }} />Added to Wishlist</Button>
                                    :
                                    <Button variant="contained" className='w-1/2' sx={{ backgroundColor: "black", "backgroundColor:hover": "black" }} onClick={wishListBook} ><FavoriteIcon sx={{ fontSize: "15px", marginRight: "10px", color: "" }} />Wishlist</Button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 w-3/4 justify-center items-center'>
                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>{bookDetail?.bookName}</h1>
                            <p className='text-slate-700'>{bookDetail?.author}</p>
                            <div className="flex w-2/12 gap-2">
                                <div className="w-2/4 h-[23px] bg-green-700 text-white flex justify-evenly items-center">
                                    <h1 className="text-[11px]">4.5</h1>
                                    <p className="text-[9px]"><StarIcon sx={{ fontSize: "13px" }} /></p>
                                </div>
                                <div>
                                    <p className="text-slate-400">({bookDetail?.quantity})</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <h1 className="font-bold">Rs. {bookDetail?.discountPrice}</h1>
                                <p className="line-through text-slate-400 text-sm">Rs. {bookDetail?.price}</p>
                            </div>
                        </div>

                        <hr className='w-full h-[1.2px] bg-[#F5F5F5]' />

                        <div className='w-full flex gap-1'>
                            <h1><FiberManualRecordIcon sx={{ fontSize: "10px", color: "grey" }} /></h1>
                            <div>
                                <h1 className='text-slate-500'>Book Detail</h1>
                                <p className='text-sm text-slate-900'>{bookDetail?.description}</p>
                            </div>
                        </div>

                        <hr className='w-full h-[1.2px] bg-[#F5F5F5]' />

                        <div className='flex flex-col gap-5 w-full'>
                            <h1 className='font-bold'>Customer feedback</h1>
                            <div className='bg-[#F5F5F5] w-full p-3 flex flex-col gap-2 rounded'>
                                <h1 className='text-xs font-bold'>Overall rating</h1>
                                <Box>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        className='flex gap-3'
                                        id='rating'
                                    />
                                </Box>
                                <TextField id="review" variant='outlined' placeholder='write your review' sx={{ backgroundColor: "white" }} />
                                <div className='flex justify-end'>
                                    <Button variant="contained" sx={{ width: 1 / 8, height: "25px", fontSize: "11px" }} onClick={handleSubmitReview}>Submit</Button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            {feedBackReviews.map((ele: any) => (<FeedbackComponent feedBack={ele} />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default BookDetails;