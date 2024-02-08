import BookCardComponent from "./BookCardComponent";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookList } from "../utils/store/bookSlice";
import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';

interface BooksListInterface {
    description: string,
    bookName: string,
    discountPrice: number,
    _id: string,
    admin_user_id: string,
    price: number,
    quantity: number,
    author: string,
    updatedAt: any
}

function BooksComponent() {

    const [sortBooks, setSortBooks] = useState('');
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const books = useSelector((store: any) => store.books.bookList);

    const handleChangePagi = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setSortBooks(event.target.value as string);

        if (event.target.value == 'LowToHigh') {
            const lowToHighBooks = [...books].sort((a: any, b: any) => a.discountPrice - b.discountPrice);
            dispatch(addBookList(lowToHighBooks));
        }
        if (event.target.value == 'HighToLow') {
            const highToLowBooks = [...books].sort((a: any, b: any) => b.discountPrice - a.discountPrice);
            dispatch(addBookList(highToLowBooks));
        }
        if (event.target.value == "NewestArrivals") {
            const newestArrivals = [...books].sort((a: any, b: any) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
            dispatch(addBookList(newestArrivals));
        }
    };

    const count = Math.ceil(books.length/12);
    let book:any = [];

    const begin = (page - 1) * 12;
    const end = begin + 12;
    book=books.slice(begin, end);

    return (<>
        <div className="w-full bg-white flex flex-col justify-center items-center">
            <div className="w-3/4 flex flex-col gap-5 m-5">
                <div className="flex justify-between w-full">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-xl font-bold">Books</h1>
                        <p className="text-[12px] text-slate-500">({books.length} items)</p>
                    </div>
                    <div>
                        <Box sx={{ minWidth: 180 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{ fontSize: "15px", lineHeight: "15px" }}>Sort by relevance</InputLabel>
                                <Select id="demo-simple-select" value={sortBooks} onChange={handleChange} sx={{ height: "40px", fontSize: "13px" }}>
                                    <MenuItem value={"LowToHigh"} sx={{ fontSize: "13px" }}>Price : Low to High</MenuItem>
                                    <MenuItem value={"HighToLow"} sx={{ fontSize: "13px" }}>Price : High to Low</MenuItem>
                                    <MenuItem value={"NewestArrivals"} sx={{ fontSize: "13px" }}>Newest Arrivals</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="w-full grid grid-cols-4 gap-y-[30px] gap-x-[60px]">
                    {books.length != 0 ?
                        book.map((val: BooksListInterface) => {
                            return (<>
                                <Stack spacing={2}>
                                    <Typography><BookCardComponent bookList={val} key={val._id} /></Typography>
                                </Stack>
                            </>)
                        })
                        :
                        <div className="w-[1150px] h-full flex justify-center items-center">
                            <CircularProgress className="" />
                        </div>
                    }
                </div>
            </div>
            <Pagination count={count} page={page} onChange={handleChangePagi} />
        </div>
    </>)
}

export default BooksComponent;