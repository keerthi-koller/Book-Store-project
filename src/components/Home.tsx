import CopyrightIcon from '@mui/icons-material/Copyright';
import education from "../assets/education.svg";
import supermarket from "../assets/supermarket.svg";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Badge, Button, FormControl, IconButton, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllCartLists, getAllWishLists } from '../utils/BookUtil';
import { addBookList } from '../utils/store/bookSlice';
import { useEffect, useState } from 'react';
import { getWishListBooks } from '../utils/store/wishListSlice';
import { getCartListBooks } from '../utils/store/cartSlice';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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

function Home() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((store: any) => store.cart.cartitems);
    const books1 = useSelector((store: any) => store.books.bookList);

    useEffect(() => {
        getAllBooksList();
        getAllWishListedBooks();
        getAllCartListedBooks();
    }, []);

    const logout = () => {
        navigate("/");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("details");
        localStorage.removeItem("myOrders");
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getAllBooksList = async () => {
        const books = await getAllBooks();
        dispatch(addBookList(books));
    }

    const getAllWishListedBooks = async () => {
        const wishListsBooks = await getAllWishLists();
        dispatch(getWishListBooks(wishListsBooks));
    }

    const getAllCartListedBooks = async () => {
        const cartListBooks = await getAllCartLists();
        dispatch(getCartListBooks(cartListBooks));
    }

    const searchIconButton = () => {
        const search = (document.getElementById("outlined-adornment-password")as HTMLInputElement).value;
        if (search == "") {
            getAllBooksList();
        }
        const books2 = books1.filter((ele:any) => {return ele.bookName.toLocaleLowerCase().includes(search.toLocaleLowerCase())});
        dispatch(addBookList(books2));
    }

    return (
        <>
            <div className='w-full flex justify-center items-center h-[60px]' style={{ backgroundColor: "#A03037" }}>
                <div className='w-3/4 flex justify-between items-center'>
                    <div className='w-3/4 flex items-center'>
                        <div className='w-1/4 flex gap-2 text-white'>
                            <img src={education} alt='img' className='h-[23px]' />
                            <p className='text-m'>Bookstore</p>
                        </div>
                        <div className='w-3/4'>
                            <FormControl sx={{ m: 0 }} variant="outlined" className='w-full'>
                                <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type='search'
                                    placeholder='Search ...'
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton onClick={searchIconButton}><SearchOutlinedIcon /></IconButton>
                                        </InputAdornment>
                                    }
                                    size="small"
                                    className='bg-white w-full'
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className='flex w-1/6 justify-between items-center'>
                        <Button className='flex flex-col justify-center'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{ fontSize: "20px", gap: "3px" }}
                            onClick={handleClick}>
                            <h1 className='flex justify-center'><PersonOutlineOutlinedIcon sx={{ fontSize: "25px", color: "white" }} /></h1>
                            {cartItems.length == 0 ? <p className='text-[10px] text-white'>profile</p> : <p className='text-xs text-white'>{cartItems[0]?.user_id?.fullName}</p>}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            className='h-[450px]'
                        >
                            <h1 className='font-bold m-4 mt-0 w-[200px] text-xl'>Hello {cartItems[0]?.user_id?.fullName},</h1>
                            <MenuItem onClick={() => { handleClose(); navigate("profile") }}><PermIdentityOutlinedIcon sx={{ marginRight: "10px" }} />Profile</MenuItem>
                            <MenuItem onClick={() => { handleClose(); navigate("myOrders"); }}><StoreMallDirectoryOutlinedIcon sx={{ marginRight: "10px" }} />My Orders</MenuItem>
                            <MenuItem onClick={() => { handleClose(); navigate("wishListDetails"); }}><FavoriteBorderOutlinedIcon sx={{ marginRight: "10px" }} />My Wishlist</MenuItem>
                            <Button variant="outlined" color='error' sx={{ width: "200px", marginLeft: "15px", marginTop: "15px" }} onClick={logout}>Logout</Button>
                        </Menu>

                        <Badge badgeContent={cartItems.length} color="primary">
                            <div className='flex flex-col gap-1'>
                                <img src={supermarket} alt='img' onClick={() => navigate("cartDetails")} />
                                <p className='text-xs text-white'>Cart</p>
                            </div>
                        </Badge>
                    </div>
                </div>
            </div >

            <div className="min-h-[calc(92.8vh-60px)]"><Outlet /></div>

            <div className="text-white h-[50px] w-full flex justify-center items-center" style={{ backgroundColor: "#2E1D1E" }}>
                <p className='w-3/4 text-sm'>Copyright <CopyrightIcon sx={{ fontSize: "16px" }} /> 2020, Bookstore Private Limited. All Rights Reserved</p>
            </div>
        </>
    )
}

export default Home;