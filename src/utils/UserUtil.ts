import axios from "axios"

const REACT_BASE_URL = "https://bookstore.incubation.bridgelabz.com/";

export const addUser = async (obj:any) => {
    return await axios.post(`${REACT_BASE_URL}bookstore_user/registration`, obj);
}

export const loginUser = async (obj:any) => {
    return await axios.post(`${REACT_BASE_URL}bookstore_user/login`, obj);
}