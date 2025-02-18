import { useContext } from "react";
import { Context } from "../MyContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyCarousel from "../components/Carousel";
import "../styles/Home.css";
import HomeProducts from "../components/HomeProducts";
import { FaPercentage } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserShield } from "react-icons/fa";
import customerimg from "../assets/customer4.jpg";
function Home() {
  const { produstslist, setProdustslist } = useContext(Context);
  const { cartItems, setcartItems } = useContext(Context);
  let slicedlist = produstslist.slice(-4, produstslist.length);
  let reversedlist = slicedlist.reverse();
  // add item to cart
  const addProductToCartFunction = (data) => {
    const alreadyCourses = cartItems.find(
      (item) => item.product.id === data.id
    );
    if (alreadyCourses) {
      const latestCartUpdate = cartItems.map((item) =>
        item.product.id === data.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      setcartItems(latestCartUpdate);
    } else {
      setcartItems([...cartItems, { product: data, quantity: 1 }]);
    }
    // console.log(cartItems)
  };

  return (
    <>
      <div className=" hero_section ">
        <Header home={true} />

        <div className="hero_text  text-white ml-20 w-[60%]">
          <p className="-ml-4 font-semibold mb-3">A Whole New Look</p>
          <p className="big_text text-[90px] font-semibold mb-3 leading-[120px]">
            Beauty Pronounced
          </p>
          <p className="mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo
            adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="border-2 font-semibold border-white py-3 px-9 text-[12px] tracking-[2px] hover:bg-white hover:text-teal-400">
            VIEW MORE
          </button>
        </div>
      </div>
      <div className="section_2 mt-[80px] text-center">
        <p className="text-teal-400 mb-1 text-[18px] tracking-[1px]">
          A Brush of Perfection
        </p>
        <p className="text-[35px]  mb-1 tracking-[1px] ">
          Add a Flavor to Being a Girl
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
      </div>
      <div className="product_list flex justify-center flex-wrap gap-6  bg-white pl-2 pt-16 pb-32 mx-7">
        {produstslist.map((product) => (
          <HomeProducts
            product={product}
            key={product.id}
            addProductToCartFunction={addProductToCartFunction}
          />
        ))}
      </div>
      <div className="section_3 flex mx-20  bg-gradient-to-br from-white to-stone-100">
        <div className="img_container">
          <img src="Cosmetic_hero_img_3.png" alt="img" />
        </div>
        <div className="text_container text-center py-9 w-[60%] mt-16 mr-5">
          <p className="text-teal-400 mb-2 text-[18px] tracking-[1px]">
            Be Bold, Be Daring
          </p>
          <p className="text-[35px]  mb-2 tracking-[1px] ">A Whole New Look</p>
          <p className="mb-6 tracking-[1px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button className=" font-semibold bg-teal-400 0 py-3 px-9 text-[12px] tracking-[2px] hover:bg-gray-500 ">
            VIEW MORE
          </button>
        </div>
      </div>

      {/* card section */}
      <div className="section_4 flex mx-20">
        <div className="card_container w-[30%] ml-0 text-center mt-20 ">
          <div className="card_icon border-[1px] border-teal-400 rounded-full p-7 w-10 h-10 flex justify-center items-center mx-auto mb-3">
            <i className="text-3xl text-teal-400 ">
              <FaPercentage />
            </i>
          </div>
          <p className="font-medium mb-3 text-[25px] tracking-[1px]">
            Season Sale
          </p>
          <p className="mb-6 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
        <div className="card_container w-[30%] ml-20 text-center mt-20 ">
          <div className="card_icon border-[1px] border-teal-400 rounded-full p-7 w-10 h-10 flex justify-center items-center mx-auto mb-3">
            <i className="text-3xl text-teal-400 ">
              <TbTruckDelivery />
            </i>
          </div>
          <p className="font-medium mb-3 text-[25px] tracking-[1px]">
            Free Shipping
          </p>
          <p className="mb-6 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
        <div className="card_container w-[30%] ml-20 text-center mt-20 ">
          <div className="card_icon border-[1px] border-teal-400 rounded-full p-7 w-10 h-10 flex justify-center items-center mx-auto mb-3">
            <i className="text-3xl text-teal-400 ">
              <FaUserShield />
            </i>
          </div>
          <p className="font-medium mb-3 text-[25px] tracking-[1px]">
            Money Back Guarantee
          </p>
          <p className="mb-6 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
      </div>

      {/* cruosal section */}
      <div className="section_5">
        <MyCarousel />
      </div>
      {/* testimonials */}
      <div className="section_6">
        <div className="text_container text-center pt-32 ">
          <p className="text-teal-400 mb-2 text-[18px] tracking-[1px]">
            Testimonials
          </p>
          <p className="text-[35px] font-medium  mb-4 tracking-[1px] ">
            Our Happy Clients
          </p>
          <p className="mb-6 text-[22px] text-stone-600 font-[400] w-[50%] mx-auto ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
        <div className="img_container h-16 w-16  mx-auto">
          <img
            className="object-contain h-full rounded-full"
            src={customerimg}
            alt="img"
          />
        </div>
        <p className="text-center text-stone-600 font-[500] mt-3 text-[16px]  ">
          Marilyn Keller
        </p>
      </div>
      <div className="section_7">
        <div className="text_container text-center pt-32 ">
          <p className="text-teal-400 mb-2 text-[18px] tracking-[1px]">
            Blossom into a New You!
          </p>
          <p className="text-[35px] font-medium  mb-2 tracking-[1px] ">
            Latest Products
          </p>
          <p className="mb-6 text-[18px] text-stone-600 font-[400] w-[50%] mx-auto ">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>
        <div>
          <div className="product_list flex justify-center flex-wrap gap-6  bg-white pl-2 pt-12 pb-32 mx-7">
            {reversedlist.map((product) => (
              <HomeProducts
                product={product}
                key={product.id}
                addProductToCartFunction={addProductToCartFunction}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="signupform flex justify-around items-center">
        <div className="signupform_text font-[450] text-[40px] tracking-[1px] w-[450px] ">
          <p>Sign-up the Makeup Fan Club</p>
        </div>
        <div className="flex flex-col">
          <div>
            <input
              className="p-2 w-[400px] border-2 "
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-3 p-2  bg-teal-400 w-[180px] border-teal-400 text-center hover:bg-gray-500 tracking-[1px] text-white">
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
