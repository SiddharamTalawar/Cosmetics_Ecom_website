import { CiFacebook,CiYoutube,CiTwitter,CiInstagram   } from "react-icons/ci";
function Footer(){
    return(
        <div className="footer bg-black text-white pl-5 pt-28 pb-10 pr-5 mt-20">
            <div className="f_upper flex justify-between">
                <div className="f_upper_left">
                    <div className="div text-2xl mb-5  ">
                        <p>Contact Details</p>
                    </div>
                    <div className="div flex flex-col">
                     <a href="" className="hover:text-teal-400">929-242-6868</a>
                     <a href="" className="hover:text-teal-400">contact@info.com</a>
                     <a href="" className="hover:text-teal-400">123 Fifth Avenue, New York, NY 10160</a>


                    </div>
                </div>
                <div className="f_upper_center text-4xl ">Cosmetics</div>
                <div className="f_upper_right">
                <div className="div text-2xl mb-5">
                        <p>Quick Links</p>



                    </div>
                    <div className="div flex flex-col text-end">
                     <a href="" className="hover:text-teal-400">Shipping & Returns</a>
                     <a href="" className="hover:text-teal-400">Contact</a>
                     <a href="" className="hover:text-teal-400">Customer Service</a>


                    </div>
                </div>
            </div>
            <div className="f_lower flex justify-between pt-32">
                <div className="f_lower_left">
                    <p>Copyright © 2024 Cosmetics Store | Powered by Cosmetics Store</p>
                </div>
                
                <div className="f_lower_right flex gap-8 text-lg">
                    <i className=" hover:text-teal-400"><CiFacebook/></i>
                    <i className=" hover:text-teal-400"><CiYoutube/></i>
                    <i className=" hover:text-teal-400"><CiInstagram /></i>
                    <i className=" hover:text-teal-400"><CiTwitter /></i>
                </div>
            </div>
        </div>
    )
}

export default Footer