import { createContext, useState, useEffect } from 'react';
import api from './api';
 
export const Context = createContext("");
const  MyContext = ({children}) =>{
    const [cartItems, setcartItems] = useState([]);
    const [produstslist, setProdustslist] = useState([]); 
    useEffect(() => {
        getprodusts_list();
    }, []);
    // get products list from Backend
    const getprodusts_list = () => {
        // setcategory("");
        // setsearch_data("");
        api
            .get("shop/products/")
            .then((res) => res.data)
            
            .then((data) => {
                
                setProdustslist(data.results);
                
            })
            .catch((err) => alert(err));
    };
    return <Context.Provider value={{cartItems, setcartItems, produstslist, setProdustslist}}>{children}</Context.Provider>;
        
    
};

export default MyContext