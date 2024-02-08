import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import img from "../assets/Shopping.png";
import Login from './Login';
import SignUp from './SignUp';

function LoginSignUp () {
    
    const [value, setValue] = useState('1');
    const [bgColor, setBgColor] = useState("#00000029");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setBgColor("#878787");
        if (newValue == '1') {
            setBgColor("#00000029");
        }
    };

    return (
        <>
            <div className='w-full h-[695px]' style={{backgroundColor:`${bgColor}`}}>
                <div className='h-full flex justify-center items-center'>
                    <div className='w-3/12 h-[430px] bg-slate-100 rounded-xl rounded-r-none flex flex-col gap-5 font-bold justify-center items-center'>
                        <img className='w-3/4 h-3/5 rounded-full' src={img} alt='img' />
                        <h1>ONLINE BOOK SHOPPING</h1>
                    </div>
                    <div className='w-1/3 h-[460px] bg-white rounded shadow-xl shadow-slate-500 flex justify-between'>
                        <Box sx={{ width: '100%', typography: 'body1', borderBottom: 10, borderColor: "divider" }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{['& .css-1bt7i97-MuiButtonBase-root-MuiTab-root.Mui-selected']:{color:"black"}, ['& .css-1aquho2-MuiTabs-indicator']:{height:"3px", width:"20px!important", translate:"3vw!important", borderRadius:"2px!important", backgroundColor:"darkred"}, ['& .css-w73x7k-MuiButtonBase-root-MuiTab-root.Mui-selected']:{color:"black"}}} centered>
                                        <Tab label="Login" value="1" sx={{fontWeight:"bold", color:"grey", fontSize:"20px"}} />
                                        <Tab label="SignUp" value="2" sx={{fontWeight:"bold", fontSize:"20px"}} />
                                    </TabList>
                                </Box>
                                <TabPanel value="1"><Login /></TabPanel>
                                <TabPanel value="2"><SignUp /></TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginSignUp;