import { createContext, useState } from 'react';
 
export const Context = createContext("");
const  MyContext = ({children}) =>{
    const [cartItems, setcartItems] = useState([]);
    return <Context.Provider value={{cartItems, setcartItems}}>{children}</Context.Provider>;
        
    
};

export default MyContext