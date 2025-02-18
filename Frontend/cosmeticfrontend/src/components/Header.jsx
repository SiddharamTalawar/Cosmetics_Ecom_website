import { useContext, useEffect, useState } from "react";
import { Context } from "../MyContext";
import { BsFillHandbagFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function Header(props) {
  const { cartItems, setcartItems } = useContext(Context);
  useEffect(() => {
    count_products();
  }, [cartItems]);
  function count_products() {
    let count = 0;
    cartItems.map((item) => (count += item.quantity));
    document.getElementById("cart_count").innerHTML = count;
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  // console.log("header",cartItems)
  return (
    <>
      <div className="header  ">
        {props.home ? (
          <div className="text-center mb-8 text-4xl p-6">
            {/* <h1>Cosmetics</h1> */}
            <img
              src="https://websitedemos.net/cosmetics-store-02/wp-content/uploads/sites/543/2020/03/white-logo-150x33.png"
              alt=""
            />
          </div>
        ) : (
          <div className=" text-center mb-8 text-4xl p-6 bg-white ">
            <h1>Cosmetics</h1>
          </div>
        )}
        <div className="navbar-logo" onClick={toggleNavbar}>
          {isOpen ? (
            <i>
              <AiOutlineClose className="text-2xl cursor-pointer" />
            </i>
          ) : (
            <i>
              <GiHamburgerMenu className="text-2xl cursor-pointer" />
            </i>
          )}
        </div>

        <div className="navbar flex gap-10 text-center place-content-center mb-20">
          <Link to="/home">
            <p className="hover:text-teal-400 cursor-pointer">Home</p>
          </Link>

          <Link to="/shop">
            <p className="hover:text-teal-400 cursor-pointer">Shop</p>
          </Link>

          <p className="hover:text-teal-400 cursor-pointer">Testimonial</p>
          <p className="hover:text-teal-400 cursor-pointer">About</p>
          <p className="hover:text-teal-400 cursor-pointer">contact</p>
          <div className="cart_icon relative">
            <Link to="/cart">
              <i>
                <BsFillHandbagFill className="text-2xl cursor-pointer" />
              </i>
            </Link>
            <div className="cart_num_icon">
              <i className="text-[40px] absolute bottom-2">
                <p
                  id="cart_count"
                  className="text-white absolute bottom-3 text-sm left-4 "
                >
                  0
                </p>
                <GoDotFill />
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
        <Link to="/home">
          <p className="hover:text-teal-400 cursor-pointer">Home</p>
        </Link>

        <Link to="/shop">
          <p className="hover:text-teal-400 cursor-pointer">Shop</p>
        </Link>

        <p className="hover:text-teal-400 cursor-pointer">Testimonial</p>
        <p className="hover:text-teal-400 cursor-pointer">About</p>
        <p className="hover:text-teal-400 cursor-pointer">contact</p>
      </div>
    </>
  );
}

export default Header;
