import CopyrightIcon from '@mui/icons-material/Copyright';
import education from "../assets/education.svg";
import supermarket from "../assets/supermarket.svg";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Outlet } from 'react-router-dom';

function Home () {
    return (<>
        <div className='w-full flex justify-center items-center h-[60px]' style={{backgroundColor:"#A03037"}}>
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
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                                }
                                size="small"
                                className='bg-white w-full'
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='flex w-1/6 justify-between items-center'>
                    <div className='flex flex-col justify-center'>
                        <h1 className='flex justify-center'><PersonOutlineOutlinedIcon sx={{fontSize:"25px", color:"white"}} /></h1>
                        <p className='text-xs text-white'>Poonam</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <img src={supermarket} alt='img' />
                        <p className='text-xs text-white'>Cart</p>
                    </div>
                </div>
            </div>
        </div>
        <Outlet />
        <div className="text-white h-[50px] w-full flex justify-center items-center" style={{backgroundColor:"#2E1D1E"}}>
            <p className='w-3/4 text-sm'>Copyright <CopyrightIcon sx={{fontSize:"16px"}} /> 2020, Bookstore Private Limited. All Rights Reserved</p>
        </div>
    </>)
}

export default Home;