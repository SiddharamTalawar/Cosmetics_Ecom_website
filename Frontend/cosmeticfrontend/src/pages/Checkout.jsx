import { useState,useContext, useEffect } from 'react'
import Header from '../components/Header';
import "../styles/Checkout.css" 
import { Context } from '../MyContext';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Footer from '../components/Footer';
import api from '../api';
import { CgDanger } from "react-icons/cg";
import Payment from './Payment';
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const { cartItems, setcartItems } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setaddress] = useState("");
    const [picode, setpicode] = useState("");
    const [PaymentMethod, setPaymentMethod] = useState("stripe");
    const [clsecret, setclsecret] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    // function to redirect to stripe payment page
    useEffect(() => {
        if (clsecret) {
            redirectToPayment(clsecret)
        }
    }, [clsecret])
    const redirectToPayment = (clsecret) => {
        navigate("/payment", { state: { cl_secret: clsecret } });
    }
    // function to submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm;
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
         Checkout(cartItems,firstName,lastName,email,contact,address,picode,PaymentMethod)   
        }

    }

    function Checkout(cartItems,firstName,lastName,email,contact,address,picode,PaymentMethod) {
        api
            .post("shop/checkout/", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                contact: contact,
                address: address,
                pincode: picode,
                payment_method: PaymentMethod,
                cartItems: cartItems
            })
            .then((res) => res.data)
            .then((data) => {
                setclsecret(data.payment.clientSecret)
                console.log(data.payment.clientSecret)
                // redirectToPayment(data.payment.clientSecret)
            })
            
            .catch((err) => alert(err));
    }

    // form validation
    const validateForm = () => {
        const errors = {};
 
        if (!firstName.trim()) {
            errors.firstName = 'firstName is required';
        }
 
        if (!lastName.trim()) {
            errors.lastName = 'lastName is required';
        }
 
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
 
        if (!contact) {
            errors.contact = 'contact is required';
        } else if (contact.length < 10) {
            errors.contact = `mobile num should be 10 digits long`;
        }
 
        if (!address.trim()) {
            errors.address = 'address is required';
        }
 
        if (!picode.trim()) {
            errors.picode = 'picode is required';
        }else if (picode.length < 6) {
            errors.contact = `picode num should be 6 digits long`;
        }
        
        return errors;
    };
    return (
        <div className="checkout_page_container">
           <div className="header_container">
               <Header/>
           </div>
           {/* {clsecret? <Payment clsecret={clsecret} /> : null} */}
           <div className="div text-3xl font-semibold border-b-2 border-teal-400 py-4 mb-12 ml-[20px] mr-16"><h1>Checkout</h1></div>
           {/* error container */}
           {errors && Object.keys(errors).length > 0 && (
               <div className="error_container border-t-2 border-red-400 py-4 mb-12 ml-[20px] mr-16 ">
                   <p className=" text-xl font-semibold ml-20 mb-1 flex">
                      <i className='mr-2 mt-1 text-2xl text-red-400'><CgDanger/></i> Please fix the following errors
                   </p>
                   {Object.keys(errors).map((key) => (
                       <p className=" text-base font-medium ml-20 mb-1" key={key}>
                           {errors[key]}
                       </p>
                   ))}
               </div>
           )}
           
           <div className="user_data_container flex">
           <div className="user_data_form_container ">
            
            <div className="user_data_form_container ">
            <h1 className='text-3xl font-bold border-b-2 pb-4 mb-4 w-[620px] ml-[20px]'>Billing details</h1>
                <form className="user_data_form " action="#" method="get">
                    <div className="form_field_container flex-col">
                    <label for="firstname" className='block'>
                        First Name <span className='text-red-500 font-bold'>*</span> 
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        placeholder="Enter First Name"
                        required
                    />
                    </div>
                    <div className="form_field_container flex-col">
                    <label for="lastname" className='block'>Last Name <span className='text-red-500 font-bold'>*</span></label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        placeholder="Enter Last Name"
                        required
                    />
                    </div>
                    <div className="form_field_container flex-col">
                    <label for="email" className='block'>Enter Email <span className='text-red-500 font-bold'>*</span> </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter email"
                        required
                    />
                    </div>
                    <div className="form_field_container flex-col">
                    <label for="tel" className='block'>Contact <span className='text-red-500 font-bold'>*</span></label>
                    <input
                        type="tel"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={(e) =>
                            setContact(e.target.value)
                        }
                        placeholder="Enter Mobile number"
                        required
                    />  
                    </div>
                    <div className="form_field_container flex-col">
                    <label for="address" className='block'>Address <span className='text-red-500 font-bold'>*</span></label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) =>
                            setaddress(e.target.value)
                        }
                        placeholder="Enter Address"
                        required
                    />
                    </div>
                    <div className="form_field_container flex-col">
                    <label for="picode" className='block'>Pincode <span className='text-red-500 font-bold'>*</span></label>
                    <input
                        type="text"
                        name="picode"
                        id="picode"
                        value={picode}
                        onChange={(e) =>
                            setpicode(e.target.value)
                        }
                        placeholder="Enter Pincode"
                        required
                    />
                    </div>
                    
                    {/* </div> */}
                </form>
            
            </div>
           </div>
           <div className="user_order_details_container w-[550px] border-2 mx-16 p-10">
               <h1 className='text-3xl font-bold  pb-4 mb-4 '>Your order</h1>
               <div className="flex justify-between border-b-2 py-5 font-medium">
                        <h1>Products</h1>
                        <h1>subtotal</h1>
               </div>
               {cartItems.map((item) => (
                   <div className="flex justify-between border-b-2 py-3">
                       <h1>{item.product.product_name} <span className='text-sm text-center'>x</span> {item.quantity}</h1>
                       <h1 className='flex'><i className='mt-[5px]  '><LiaRupeeSignSolid/></i>{item.product.product_price*item.quantity}</h1>
                   </div>
               ))}
               <div className="subtotal_title flex justify-between border-b-2 py-3">
                    <h1>Total</h1>
                
                    <h1 className='flex'> <i className='mt-[5px]  '><LiaRupeeSignSolid/></i> {cartItems.reduce((acc, item) => acc + item.product.product_price * item.quantity, 0)}</h1>
                </div>
                <div className="radio_btn my-5">
                    <input type="radio" id="stripe" name="radio" value="stripe" checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label for="stripe" >Pay with Stripe</label>
                </div>
                <div className="radio_btn">
                    <input type="radio" id="cod" name="radio" value="cod" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label for="cod">Cash on delivery</label>
                </div>
                <button
                        type="submit"
                        onClick={handleSubmit}
                        className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full mt-10'
                    >
                        Place Order
                    </button> 
           </div>
           
           </div>
           
           <div className="footer_container"><Footer/></div>

        </div>
        
    )
}
export default Checkout