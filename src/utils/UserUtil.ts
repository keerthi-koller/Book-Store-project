import axios from "axios"

const REACT_BASE_URL = "https://bookstore.incubation.bridgelabz.com/";

const configForBooks = () => { 
    const accessToken = localStorage.getItem("accessToken")
    const header = {headers:{
         "Content-Type": "application/json",
         "X-Access-Token": accessToken
     }
 }
     return header
}


export const addUser = async (obj:any) => {
    return await axios.post(`${REACT_BASE_URL}bookstore_user/registration`, obj);
}

export const loginUser = async (obj:any) => {
    return await axios.post(`${REACT_BASE_URL}bookstore_user/login`, obj);
}

export const customerDetails = async (obj:any) => {
    const d = await axios.put(`${REACT_BASE_URL}bookstore_user/edit_user`, obj, configForBooks());
    console.log(d);
}