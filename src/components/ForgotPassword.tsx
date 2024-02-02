import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function ForgotPassword () {

    const navigate = useNavigate();

    const createAccount = () => {
        navigate("/");
    }

    return (<>
        <div className='w-full h-[585px] flex justify-center items-center'>
            <div className='w-1/4 flex flex-col gap-5 '>
                <h1 className='flex justify-center text-2xl font-bold'>Forgot Your Password?</h1>
                <div className='w-full border border-2 border-zinc-300 flex flex-col gap-5'>
                    <div className=''>
                        <div className='p-8 flex flex-col gap-5'>
                            <p className='text-slate-500'>Enter your email address and we'll send you a link to reset your password.</p>
                            <div className='flex flex-col'>
                                <label className="text-xs font-bold">Email id</label>
                                <TextField id="outlined-basic" variant="outlined" size="small" />
                            </div>
                            <Button variant="contained" sx={{backgroundColor:"brown"}}>Reset Password</Button>
                        </div>
                    </div>
                    <div className='border border-2 border-zinc-300 flex justify-center items-center bg-[#E4E4E4]'>
                        <div className='p-8'>
                            <Button variant="text" sx={{color:"black", fontWeight:"bold"}} onClick={createAccount}>Create Account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ForgotPassword;