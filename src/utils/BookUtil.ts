import axios from "axios"

const REACT_BASE_URL = "https://bookstore.incubation.bridgelabz.com/"

const configForBooks = () => { 
    const accessToken = localStorage.getItem("accessToken")
    const header = {headers:{
         "Content-Type": "application/json",
         "X-Access-Token": accessToken
     }
 }
     return header
 }

export const getAllBooks = async () => {
    const allBooks = await axios.get(`${REACT_BASE_URL}bookstore_user/get/book`);
    return allBooks.data.result;
}

export const addWishList = async (productId:string|undefined) => {
    await axios.post(`${REACT_BASE_URL}bookstore_user/add_wish_list/${productId}`, {}, configForBooks());
}

export const removeWishList = async (productId:string|undefined) => {
    await axios.delete(`${REACT_BASE_URL}bookstore_user/remove_wishlist_item/${productId}`, configForBooks());
}

export const getAllWishLists = async () => {
    let data:any = [];
    (await axios.get(`${REACT_BASE_URL}/bookstore_user/get_wishlist_items`, configForBooks())).data.result.forEach((element:any) => {
        data.push(element);
    });;
    return data;   
}

export const getAllCartLists = async () => {
    return await (await axios.get(`${REACT_BASE_URL}bookstore_user/get_cart_items`, configForBooks())).data.result;
}

export const addCartList = async (productId:string|undefined) => {
    let data:any
    await axios.post(`${REACT_BASE_URL}bookstore_user/add_cart_item/${productId}`, {}, configForBooks()).then(res=>{data=res.data.result})
    return data;
}

export const updateCartQty = async (cartItem_id:string|undefined, quantityToBuy:number) => {
    await axios.put(`${REACT_BASE_URL}bookstore_user/cart_item_quantity/${cartItem_id}`,{"quantityToBuy":quantityToBuy}, configForBooks());
}

export const deleteCartBook = async (cartItem_id:string|undefined) => {
    await axios.delete(`${REACT_BASE_URL}bookstore_user/remove_cart_item/${cartItem_id}`, configForBooks());
}

export const deleteWishListBook = async (product_id:string|undefined) => {
    await axios.delete(`${REACT_BASE_URL}bookstore_user/remove_wishlist_item/${product_id}`, configForBooks());
}

export const addFeedback = async (obj:any, product_id:string|undefined) => {
    const data = await axios.post(`${REACT_BASE_URL}bookstore_user/add/feedback/${product_id}`, JSON.stringify(obj), configForBooks());
    return data.data.result;
}

export const getFeedback = async (product_id:string|undefined) => {
    const data = await axios.get(`${REACT_BASE_URL}bookstore_user/get/feedback/${product_id}`, configForBooks());
    return data.data.result;
}