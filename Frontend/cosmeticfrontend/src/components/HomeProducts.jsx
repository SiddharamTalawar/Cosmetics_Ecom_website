import { useState } from "react";

import { LiaRupeeSignSolid } from "react-icons/lia";
import { BsFillHandbagFill } from "react-icons/bs";
import { MdArrowRight } from "react-icons/md";
function HomeProducts(props) {
  let img = [props.product.product_image];

  return (
    <div className="products ">
      <div className="product_image w-64 h-60 mb-6 relative  group ">
        <div className="cart_btn group">
          <div
            className="cart_img_container text-l cursor-pointer absolute left-52 top-4 bg-white  p-2 rounded-full w-8 opacity-0 group-hover:opacity-100 transition ease-in-out delay-150 shadow-xl "
            onClick={() => props.addProductToCartFunction(props.product)}
          >
            <i>
              <BsFillHandbagFill />
            </i>
          </div>
          <div className="add_to_cart_btn absolute text-3xl left-44 top-4  p-2 opacity-0 group-hover:opacity-100 transition ease-in-out delay-150   ">
            <MdArrowRight />
          </div>
          <div className="add_to_cart_btn absolute left-28 top-4 bg-black text-white p-2 rounded-md border-r-2 opacity-0  border-r-white text-sm group-hover:opacity-100 transition ease-in-out delay-150">
            Add to cart{" "}
          </div>
        </div>

        <img src={img} alt="product image" />
      </div>
      <div className="product_name_container ">
        <h1 className="text-sm text-gray-600 mb-1 ">
          {props.product.category.category_name}
        </h1>
        <h1 className="product_name text-lg mb-1">
          {props.product.product_name}
        </h1>
      </div>

      <div className="product_price flex">
        <div className="flex flex-row text-center">
          <i className="mt-1  ">
            <LiaRupeeSignSolid />
          </i>
          <span className="pb-1 -ml-1">{props.product.product_price}</span>
        </div>
      </div>
    </div>
  );
}
export default HomeProducts;
