import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {

    const [showAddress, setShowAddress] = useState(false);
    const navigate = useNavigate();
    const cartItems = useSelector((store: any) => store.cart.cartitems);

    const saveAddress = () => {

    }

    return (<>
        <div className="w-full flex justify-center items-center mb-[400px]">
            <div className="w-3/4 flex flex-col mt-10">
                <div className="flex w-full items-center">
                    <Button className="text-slate-500" onClick={() => navigate("/book")} sx={{ color: "gray", fontSize: "13px" }}>Home /</Button>
                    <p className="text-[12px] font-bold">Profile</p>
                </div>
                <div className="w-3/4 border-2 border-[#E2E2E2] flex flex-col gap-10 pl-[50px]">
                    <div className="w-2/3">
                        <h1 className="font-bold mb-5">Personal Details</h1>
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-col gap-1">
                                <h1 className="font-medium text-xs">Full Name</h1>
                                <div className="border border-2 border-[#E4E4E4] h-[50px] bg-[#F5F5F5] pl-5 flex items-center">
                                    <h1>{cartItems[0]?.user_id.fullName}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium text-xs">Email Id</h1>
                                <div className="border border-2 border-[#E4E4E4] h-[50px] bg-[#F5F5F5] pl-5 flex items-center">
                                    <h1>{cartItems[0]?.user_id.email}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium text-xs">Password</h1>
                                <div className="border border-2 border-[#E4E4E4] h-[50px] bg-[#F5F5F5] pl-5 flex items-center">
                                    <h1>**********</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium text-xs">Mobile Number</h1>
                                <div className="border border-2 border-[#E4E4E4] h-[50px] bg-[#F5F5F5] pl-5 flex items-center">
                                    <h1>{cartItems[0]?.user_id.phone}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!showAddress ?
                        <div className="w-2/3">
                            <div className="flex gap-3">
                                <h1 className="font-bold mb-5">Address Details</h1>
                                <h1 className="text-red-800 font-medium cursor-pointer" onClick={() => setShowAddress(true)}>Edit</h1>
                            </div>
                            <div className="w-full flex flex-col gap-5">
                                <div className="w-full flex flex-col gap-1">
                                    <h1 className="font-medium text-xs">Address</h1>
                                    <div className="border h-[50px] flex items-center pl-5 bg-[#F5F5F5]">
                                        <h1>{cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.fullAddress}</h1>
                                    </div>
                                </div>
                                <div className="w-full flex gap-10">
                                    <div className="w-1/2 flex flex-col gap-1">
                                        <h1 className="font-medium text-xs">City/Town</h1>
                                        <div className="border h-[50px] flex items-center pl-5 bg-[#F5F5F5]">
                                            <h1>{cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.city}</h1>
                                        </div>
                                    </div>
                                    <div className="w-1/2 flex flex-col gap-1">
                                        <h1 className="font-medium text-xs">State</h1>
                                        <div className="border h-[50px] flex items-center pl-5 bg-[#F5F5F5]">
                                            <h1>{cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.state}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-medium text-xs">Type</h1>
                                    <div className="flex w-full gap-20">
                                        <div className="flex gap-2 items-center">
                                            <input type="radio" name="address" color="error" defaultChecked id="Home" /> <label htmlFor="Home" className="text-xs font-medium">Home</label>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <input type="radio" name="address" color="error" id="Office" /> <label htmlFor="Office" className="text-xs font-medium">Office</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-2/3">
                            <h1 className="font-bold mb-5">Address Details</h1>
                            <div className="w-full flex flex-col gap-5">
                                <div className="w-full flex flex-col gap-1">
                                    <h1 className="font-medium text-xs">Address</h1>
                                    <TextField id="fullAddressOffice" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.fullAddress} />
                                </div>
                                <div className="w-full flex gap-10">
                                    <div className="w-1/2 flex flex-col gap-1">
                                        <h1 className="font-medium text-xs">City/Town</h1>
                                        <TextField id="cityOffice" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.city} />
                                    </div>
                                    <div className="w-1/2 flex flex-col gap-1">
                                        <h1 className="font-medium text-xs">State</h1>
                                        <TextField id="stateOffice" sx={{ width: "100%", backgroundColor: "#F5F5F5" }} variant="outlined" defaultValue={cartItems[0]?.user_id.address.filter((ele: any) => ele.addressType == "Home")[0]?.state} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-medium text-xs">Type</h1>
                                    <div className="flex w-full justify-between">
                                        <div className="flex w-full gap-20">
                                            <div className="flex gap-2 items-center">
                                                <input type="radio" name="address" color="error" defaultChecked id="Home" /> <label htmlFor="Home" className="text-xs font-medium">Home</label>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <input type="radio" name="address" color="error" id="Office" /> <label htmlFor="Office" className="text-xs font-medium">Office</label>
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="contained" sx={{ width: "70px", marginLeft: "30px", height: "30px" }} onClick={() => { setShowAddress(false); saveAddress(); }}>save</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default ProfileComponent;