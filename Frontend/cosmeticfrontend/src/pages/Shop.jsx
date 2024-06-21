import React from 'react'
import { useState,useEffect,useContext  } from 'react'
import Products from '../components/Products';
import api from '../api';
import Header from '../components/Header';
import Search from '../components/Search';
import Filterbycategoreys from '../components/Filterbycategoreys';
import Footer from '../components/Footer';
import  {Context}  from '../MyContext';
function Shop(){
    const [produstslist, setProdustslist] = useState([]); 
    const [searchprodustslist, setsearchProdustslist] = useState([]); 
    const [categoryprodustslist, setcategoryProdustslist] = useState([]); 
    // const [cart, setcart] = useState([]); 
    const [search_data, setsearch_data] = useState(""); 
    const [category, setcategory] = useState(""); 
    const { cartItems, setcartItems } = useContext(Context);
    useEffect(() => {
        getprodusts_list();
    }, []);

    
    // search function 
    function search(data){
        
        setsearch_data(data);
        setcategory("");
        if (data === "") { setProdustslist(produstslist); return; }
        const filterBySearch = produstslist.filter((item) => {
            if (item.product_name.toLowerCase()
                .includes(data.toLowerCase())) { return item; }
        })
        console.log(filterBySearch)
        setsearchProdustslist(filterBySearch)
        // console.log(setProdustslist)

    }

    // category sort function
    function category_sort(data){
        
        setcategory(data);
        setsearch_data("");
        if (data === "All Products") { setProdustslist(produstslist); return; }
        const filterBycategory = produstslist.filter((item) => {
            if (item.category.category_name
                .toLowerCase()
                .includes(data.toLowerCase())) { return item; }
        })
       
        setcategoryProdustslist(filterBycategory)

    }
    // get products list from Backend
    const getprodusts_list = () => {
        setcategory("");
        setsearch_data("");
        api
            .get("shop/products/")
            .then((res) => res.data)
            
            .then((data) => {
                
                setProdustslist(data.results);
                
            })
            .catch((err) => alert(err));
    };
    // add item to cart
    const addProductToCartFunction = (data) => {
        
        const alreadyCourses = cartItems
                               .find(item => item.product.id === data.id);
        if (alreadyCourses) {
            const latestCartUpdate = cartItems.map(item =>
                item.product.id === data.id ? { 
                ...item, quantity: item.quantity + 1 } 
                : item
            );
            setcartItems(latestCartUpdate);
        } else {
            setcartItems([...cartItems, {product: data, quantity: 1}]);
        }
        console.log(cartItems)
    };
    // counting and updating num of items in cart
    

    // conditions to check which product list to load(all/searched/sorted).
    let data_list;
    
    if (search_data!== "") {data_list =searchprodustslist } else if (category !== "All Products" && category !== "") { data_list = categoryprodustslist } else { data_list =produstslist }
    return(
        <div className="shop_container bg-slate-200"><div className="shop_header"><Header/></div>
        <div className="shop_hero flex">
            <div className="shop_sidebar w-1/3">
                <div className="search_container m-5 mt-0">
                    <Search props={search}/>
                </div>
                <div className="category_container m-5"><Filterbycategoreys props={category_sort}/></div>
            </div>

        {/* product list */}
        
        <div className="product_list flex justify-center flex-wrap gap-6 w-2/3 bg-white pl-2 pt-32 pb-32">{data_list.map((product) => (
            <Products product={product}  key={product.id} addProductToCartFunction={addProductToCartFunction} />
            
        ))}</div> 
        
           
        </div>
        <div className="shop_footer">
            <Footer/>
        </div>
        
        </div>
        
     
        
    )
};
export default  Shop;