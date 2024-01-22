import BookCardComponent from "./BookCardComponent";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks } from "../utils/UserUtil";

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

function BooksComponent () {

    const [booksList, setBooksList] = useState<BooksListInterface[]>([]);
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
        console.log(event.target.value);
        if (event.target.value == '20') {
            // navigate("");
        }
        
    };

    useEffect ( () => {
        getAllBooksList();
    }, [] )

    const getAllBooksList = async () => {
        const books = await getAllBooks();
        setBooksList(books);
    }

    return (<>
        <div className="w-full bg-white flex flex-col justify-center items-center">
            <div className="w-3/4 flex flex-col gap-5 m-5">
                <div className="flex justify-between w-full">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-xl font-bold">Books</h1>
                        <p className="text-[12px] text-slate-500">(128 items)</p>
                    </div>
                    <div>
                        <Box sx={{ minWidth: 180 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{fontSize:"15px", lineHeight:"15px"}}>Sort by relevance</InputLabel>
                                <Select
                                    // labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleChange}
                                    sx={{height:"40px", fontSize:"13px"}}
                                    >
                                    <MenuItem value={10} sx={{fontSize:"13px"}}>Price : Low to High</MenuItem>
                                    <MenuItem value={20} sx={{fontSize:"13px"}}>Price : High to Low</MenuItem>
                                    <MenuItem value={30} sx={{fontSize:"13px"}}>Newest Arrivals</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="w-full grid grid-cols-4 gap-y-[30px] gap-x-[60px]">
                    {booksList.map( (val:BooksListInterface) => {
                        return (<>
                            <BookCardComponent bookList={val} />
                        </>)
                    } )}
                </div>
            </div>
        </div>
    </>)
}

export default BooksComponent;