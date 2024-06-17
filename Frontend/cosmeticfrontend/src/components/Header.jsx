
import { BsFillHandbagFill } from "react-icons/bs";
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
                <i><BsFillHandbagFill className="text-2xl cursor-pointer"/></i>
            </div>
        </div>
        </>
    )
}

export default Header