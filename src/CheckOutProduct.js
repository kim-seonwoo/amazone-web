import React from "react";
import "./CheckOutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckOutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkOutProduct">
      <img className="checkOutProduct_image" src={image} alt="" />
      <div className="checkOutProduct_info">
        <p className="checkOutProduct_title">{title}</p>
        <p className="checkOutProduct_price">
          <small>₩</small>
          <strong>{price}</strong>
          <small>원</small>
        </p>
        <div className="checkOutProduct_rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>★</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>장바구니에서 제거</button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
