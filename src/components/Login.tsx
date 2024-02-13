import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { loginUser } from "../utils/UserUtil";
import { useNavigate } from "react-router-dom";

interface ErrorMessage {
    value : string | undefined,
    msg : string | undefined,
    param : string | undefined,
    location : string | undefined
}

function Login () {

    const [showPassword, setShowPassword] = useState(false);
    const [errorName, setErrorName] = useState<ErrorMessage[]>([]);
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleLoginUser = () => {
        const email = (document.getElementById("outlined-basic")as HTMLInputElement).value;
        const password = (document.getElementById("outlined-adornment-password")as HTMLInputElement).value;

        const obj = {
            email : email,
            password : password,
        }
        const result = loginUser(obj);
        result
        .then( (res) => {
            setPwd(res.data.message);
            console.log(res);
            if (res.data.message === 'successfully logged in') {
                localStorage.setItem("accessToken", res.data.result.accessToken);
                navigate("/book");    
            }
            else{
                setPwd(res.data.message);
            }
        } )
        .catch( (err) => {
            console.log(err);          
            setErrorName(err.response.data.error);
        } )
    }
    const forgotPassword = () => {
        navigate("/home/forgotPassword");
    }
    
    return (<>
        <div className="flex flex-col gap-4 p-5 pt-0">
            <div className="flex flex-col">
                <label className="text-xs">Email id</label>
                <TextField id="outlined-basic" variant="outlined" size="small" error={errorName[0]?.param === "email" ? true : false} helperText={errorName[0]?.param === "email" ? errorName[0]?.msg : ""} />
            </div>
            <div className="flex flex-col">
                <label className="text-xs">Password</label>
                <FormControl sx={{ m: 0 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        size="small"
                        error={errorName[0]?.param === "email" ? true : false}
                    />
                    {errorName[0]?.param === "password" && (
                        <FormHelperText error id="accountId-error">
                        {errorName[0]?.msg}
                        </FormHelperText>
                    )}
                    {pwd ? <p className="text-red-600 text-xs pl-5">{pwd}</p> : ""}
                </FormControl>
                <label className="text-xs text-right text-slate-400" onClick={forgotPassword}>Forgot Password?</label>
            </div>
            <Button variant="contained" onClick={handleLoginUser}>Login</Button>
            <div className="flex justify-center gap-5 items-center">
                <hr className="bg-slate-400 h-[2px] w-20" />
                <span>OR</span>
                <hr className="bg-slate-400 h-[2px] w-20" />
            </div>
            <div className="flex justify-center gap-3">
                <Button variant="contained">Facebook</Button>
                <Button variant="contained" sx={{backgroundColor:"GhostWhite", color:"black", border:"1px solid Lavender"}}>Google</Button>
            </div>
        </div>
    </>)
}

export default Login;