import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  console.log("hello", basket);
  return (
    <div className="product">
      <div className="product_Info">
        <p>{title}</p>
        <p className="product_price">
          <small>가격</small>
          <strong>{price}</strong>
          <small>원</small>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>★</p>
            ))}
          {/* Rating 안의 크기만큼 array가 생성 됨, fill메소드에 의해 undefined로 채움
            map으로 별을 개수 만큼 채움 */}
        </div>
      </div>
      <img
        src={image}
        alt="https://blog.kakaocdn.net/dn/vpIEA/btqI9GFodcc/UGl4ruH69FtyP0Or18S82k/img.jpg"
      />
      <button onClick={addToBasket}>장바구니에 담기</button>
    </div>
  );
}

export default Product;
