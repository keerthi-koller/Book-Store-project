import { Button } from "@mui/material";
import img1 from "../assets/first.jpg";
import img2 from "../assets/second.jpg";
import { useNavigate } from "react-router-dom";

function OrderPlacedComponent() {

    const navigate = useNavigate();
    
    return (<>
        <div className="w-full flex justify-center items-center">
            <div className="w-3/4 flex justify-center flex-col m-10 gap-10 items-center">
                <div className="w-1/3 flex justify-center items-center gap-2 flex-col">
                    <img src={img1} alt="img" className="w-1/2" />
                    <h1 className="font-bold text-xl">Order Placed Successfully</h1>
                    <img src={img2} alt="img" className="w-1/2" />
                    <div>
                        <p className="text-center font-medium">hurray!!! your order is confirmed</p>
                        <p className="text-center font-medium">the order id is #123456 save the order id for</p>
                        <p className="text-center font-medium">further communication.</p>
                    </div>
                </div>
                <table className="border w-3/4">
                    <tr className="border bg-[#FAFAFA] h-10 text-center">
                        <th className="font-medium text-center w-1/4">Email us</th>
                        <th className="font-medium text-center w-1/4">Contact us</th>
                        <th className="font-medium text-center w-2/4">Address</th>
                    </tr>
                    <tr className="text-center border">
                        <td className="font-normal text-center w-1/4 p-2">admin@bookstore.com</td>
                        <td className="font-normal text-center w-1/4 p-2">+91 9845588748</td>
                        <td className="font-normal text-center w-2/4 p-2">42, 14th Main, 15th cross, Sector 4, opp to BDA complex, near kumarakom restaurant, HSR Layout, Bangalore 560034</td>
                    </tr>
                </table>
                <Button variant="contained" onClick={ () => navigate("/book") }>Continue Shopping</Button>
            </div>
        </div>
    </>)
}

export default OrderPlacedComponent;