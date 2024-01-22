import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { addUser } from "../utils/UserUtil";

function SignUp () {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleUpdateUser = () => {
        const obj = {
            "fullName" : (document.getElementById("outlined-basic")as HTMLInputElement).value,
            "email" : (document.getElementById("outlined")as HTMLInputElement).value,
            "password" : (document.getElementById("outlined-adornment-password")as HTMLInputElement).value,
            "phone" : (document.getElementById("outlined-phone")as HTMLInputElement).value
        }
        addUser(obj);
    }
  
    return (<>
        <div className="flex flex-col gap-5 p-5 pt-0">
            <div className="flex flex-col">
                <label className="text-xs">Full Name</label>
                <TextField id="outlined-basic" variant="outlined" size="small" />
            </div>
            <div className="flex flex-col">
                <label className="text-xs">Email id</label>
                <TextField id="outlined" variant="outlined" size="small" />
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
                    />
                </FormControl>
            </div>
            <div className="flex flex-col">
                <label className="text-xs">Mobile Number</label>
                <TextField id="outlined-phone" variant="outlined" size="small" />
            </div>
            <Button variant="contained" onClick={handleUpdateUser}>Signup</Button>
        </div>
    </>)
}

export default SignUp;