import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

function Login () {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    return (<>
        <div className="flex flex-col gap-7 p-5 pt-0">
            <div className="flex flex-col">
                <label className="text-xs">Email id</label>
                <TextField id="outlined-basic" variant="outlined" size="small" />
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
                <label className="text-xs text-right text-slate-400">Forgot Password?</label>
            </div>
            <Button variant="contained">Login</Button>
            <div className="flex justify-center gap-10 items-center">
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