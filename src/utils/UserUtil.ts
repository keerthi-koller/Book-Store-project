import axios from "axios"

const REACT_BASE_URL = "https://bookstore.incubation.bridgelabz.com/"

const configForAddUsers = {
    headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("accessToken")
    }
}

const configForGetNotes = {
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
    }
}

export const getAllBooks = async () => {
    const allBooks = await axios.get(`${REACT_BASE_URL}bookstore_user/get/book`);
    return allBooks.data.result;
}

export const addUser = async (obj:any) => {
    const res = await axios.post(`${REACT_BASE_URL}bookstore_user/registration`, JSON.stringify(obj), configForAddUsers);
    console.log(res);
}