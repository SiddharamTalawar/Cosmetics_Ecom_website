
import { BsFillHandbagFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
function Header(){

    return(
        <>
        <div className="header">
            <div className=" text-center mb-8 text-4xl p-6 bg-white"><h1>Cosmetics</h1></div>
            <div className="navbar flex gap-10 text-center place-content-center mb-20">
                <p className="hover:text-teal-400 cursor-pointer">Home</p>
                <p className="hover:text-teal-400 cursor-pointer">Shop</p>
                <p className="hover:text-teal-400 cursor-pointer">Testimonial</p>
                <p className="hover:text-teal-400 cursor-pointer">About</p>
                <p className="hover:text-teal-400 cursor-pointer">contact</p>
                <div className="cart_icon relative"><i><BsFillHandbagFill className="text-2xl cursor-pointer"/></i><div className="cart_num_icon"><i className="text-[40px] absolute bottom-2"><p id="cart_count" className="text-white absolute bottom-3 text-sm left-4 ">0</p><GoDotFill/></i></div></div>
                
            </div>
        </div>
        </>
    )
}

export default Header