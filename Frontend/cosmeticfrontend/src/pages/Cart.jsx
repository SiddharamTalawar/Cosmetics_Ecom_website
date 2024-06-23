import Header from '../components/Header';
import Footer from '../components/Footer';
import { CiCircleRemove } from "react-icons/ci";
import { useContext,useState } from 'react';
import { Context } from '../MyContext';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
function Cart() {
    const { cartItems, setcartItems } = useContext(Context);
    const[CartQuantity,setCartQuantity] = useState([])
    const[enable,setenable] = useState(false)
    // console.log(cartItems)
    // function to remove product from cart
    function removeProductFromCart(product){
        let newCart = cartItems.filter((item) => item.product !== product)
        setcartItems(newCart)
    }
    const changeProductQuantityInCartFunction = (data,new_quantity) => {
        setenable(true)
        // console.log(data,new_quantity)
        let data_list = CartQuantity.length === cartItems.length ? CartQuantity : cartItems
        const alreadyCourses = cartItems
                               .find(item => item.product.id === data.id);
        if (alreadyCourses) {
            const latestCartUpdate = data_list.map(item =>
                item.product.id === data.id ? { 
                ...item, quantity: Number(new_quantity) } 
                : item
            );
            setCartQuantity(latestCartUpdate);
        } else {
            console.log("iteamnot found in cart")
        }
        // console.log(CartQuantity)
    };
    function updateCart(){
        setcartItems(CartQuantity)
        setenable(false)
        // console.log("updated cart",CartQuantity)
    }
    return(<>
    <div className="cart_container">
        <Header/>
        
        {cartItems.length === 0 ?  
        <div className="empty_cart_content">
            <h1 className='text-3xl border-t-4 border-teal-400 p-6 ml-10 mb-10'>Your cart is currently empty.</h1>
            <Link className='bg-teal-400 border-1 border-b-2 border-teal-400 p-3 ml-10  w-5' to="/shop"> <button>Return to Shop</button></Link>
            
            </div>
             
        :<div className="cart_content">
            <h1 className='text-3xl ml-4'>Cart</h1>
        <div className="product_container m-10 border-2">
            <div className="column_name flex justify-around py-3 border-b-2">
                < p className='w-16 ml-2'>Image</p>
                <p className='w-80'>Product</p>
                <p className=' ml-2'>Price</p>
                <p>Quantity</p>
                <p>Total</p>
            </div>

            {cartItems.map((item) => (
                
                <div className="product flex justify-around   py-3 border-b-2">
                    <div className="product_img w-16">
                        <img src={item.product.product_image} alt="" />
                    </div>
                    <div className="product_name w-80 py-5">
                        {/* <h1 className='text-sm text-gray-600 mb-1'>{item.product.category}</h1> */}
                        <h1 className=' text-teal-400 mb-1'>{item.product.product_name}</h1>
                    </div>
                    <div className="product_price flex py-5 -ml-2">
                        <div className='flex flex-row text-center'><i className='mt-1  '><LiaRupeeSignSolid/></i><span className='pb-1 -ml-1'>{item.product.product_price}</span></div>
                    </div>
                    <div className="product_quantity py-5 ">
                        <input className='border-2 p-1 w-12 '  type="number" defaultValue={item.quantity} min="1" onChange={(e)=>changeProductQuantityInCartFunction(item.product,e.target.value)} />
                       
                    </div>
                    <div className="product_total py-5 ">
                        <div className=' flex flex-row text-center relative'><i className='mt-1  '><LiaRupeeSignSolid/></i><span className='pb-1 -ml-1 flex'>{item.product.product_price * item.quantity}</span> <i className=' absolute left-16  hover:cursor-pointer  hover:text-red-400 text-2xl' onClick={() => removeProductFromCart(item.product)}><CiCircleRemove/></i></div>
                    </div>
                    {/* <div className="product_remove">
                        <CiCircleRemove/>
                    </div> */}
                </div>
            ))}
        <div className="cupon_btn_container flex justify-between py-4 px-4">
            <div className="cupon">
                <input type="text" placeholder='Cupon Code...' className='p-1 border-2'/>
                <button className='ml-4 bg-teal-400 p-3 px-10 text-white '>Apply Cupon</button>
            </div>
            {enable?<div className="update_cart_btn">
                <button className='bg-teal-400 p-3 px-10 text-white ' onClick={updateCart}>Update Cart</button>
            </div>
            :<div className="update_cart_btn">
            <button className='bg-gray-400 p-3 px-10 text-white  hover:cursor-not-allowed ' >Update Cart</button>
        </div>}
            
        </div>
        </div>
        <div className="checkout_container flex-col  text-end left-10 border-2 ml-[845px] w-96">
            <h1 className='text-2xl bo p-2 border-b-2 text-start'>Cart Totals</h1>
            <div className="subtotal flex justify-between  gap-52 p-2 border-b-2 mx-3">
                <div className="subtotal_title">
                    <h1>Subtotal</h1>
                </div>
                <div className="subtotal_price  ">
                    <h1 className='flex'> <i className='mt-1  '><LiaRupeeSignSolid/></i> {cartItems.reduce((acc, item) => acc + item.product.product_price * item.quantity, 0)}</h1>
                </div>
            </div>
            <div className="subtotal flex justify-between  gap-52 p-2 border-b-2 mx-3">
                <div className="subtotal_title">
                    <h1>Total</h1>
                </div>
                <div className="subtotal_price  ">
                    <h1 className='flex'> <i className='mt-1  '><LiaRupeeSignSolid/></i> {cartItems.reduce((acc, item) => acc + item.product.product_price * item.quantity, 0)}</h1>
                </div>
            </div>
            <div className="checkout_btn p-2 border-b-2">
                <Link to="/checkout"><button className='bg-teal-400 p-3 px-10 text-white w-80 mr-5 '>Checkout</button></Link>
                
            </div>

        </div>
        </div>
        }
        <Footer/>
    </div>
    </>)

};

export default Cart