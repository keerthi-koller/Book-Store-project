import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { addUser } from "../utils/UserUtil";

interface ErrorMessage {
    value : string,
    msg : string,
    param : string,
    location : string
}

function SignUp () {

    const [showPassword, setShowPassword] = useState(false);
    const [errorName, setErrorName] = useState<ErrorMessage[]>([]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleUpdateUser = () => {

        const fullName = (document.getElementById("outlined-basic")as HTMLInputElement).value;
        const email = (document.getElementById("outlined")as HTMLInputElement).value;
        const password = (document.getElementById("outlined-adornment-password")as HTMLInputElement).value;
        const phone = (document.getElementById("outlined-phone")as HTMLInputElement).value;

        const obj = {
            fullName : fullName,
            email : email,
            password : password,
            phone : phone
        }
        const result = addUser(obj);
        result
        .then( (res) => {
            console.log(res);
        } )
        .catch( (err) => {
            console.log(err);            
            setErrorName(err.response.data.error);
        } )
    }
  
    return (<>
        <div className="flex flex-col gap-3 p-5 pt-0">
            <div className="flex flex-col">
                <label className="text-xs">Full Name</label>
                <TextField id="outlined-basic" type="text" variant="outlined" size="small" error={errorName[0]?.param === "fullName" ? true : false} helperText={errorName[0]?.param === "fullName" ? errorName[0].msg : ""} />
            </div>
            <div className="flex flex-col">
                <label className="text-xs">Email id</label>
                <TextField id="outlined" variant="outlined" size="small" error={errorName[0]?.param === "email" ? true : false} helperText={errorName[0]?.param === "email" ? errorName[0].msg : ""} />
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
                        error={errorName[0]?.param === "password" ? true : false}
                    />
                </FormControl>
                <p className="text-xs text-red-500">{errorName[0]?.param === "password" ? errorName[0].msg : ""}</p>
            </div>
            <div className="flex flex-col">
                <label className="text-xs">Mobile Number</label>
                <TextField id="outlined-phone" variant="outlined" size="small" error={errorName[0]?.param === "phone" ? true : false} helperText={errorName[0]?.param === "phone" ? errorName[0].msg : ""} />
            </div>
            <Button variant="contained" onClick={handleUpdateUser}>Signup</Button>
        </div>
    </>)
}

export default SignUp;