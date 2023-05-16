import React, { useEffect, useState } from "react";
import "./Payment.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import CheckOutProduct from "./CheckOutProduct";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer";
import { Troubleshoot } from "@mui/icons-material";
import axios from "axios";
import { ConfirmCardPaymentData } from "@stripe/stripe-js";

function Payment() {
  //user, 구매 정보를 가져와야함

  const promise = loadStripe(
    "sk_test_51N7EyZK3YVCjSOc5w2Fk6FeOoaGrpZb3lzY9Ocfu6VsR6OXtslTPmnOYt6m6bjmxGXqMc4OsyBSaHBtGTUTbxn1800BBom15CE"
  ); // publishable API key를 가져옴
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [process, setProcess] = useState("");
  const [succeed, setSucceed] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await axios({
        method: "post",
        url: "/payments/create?total=" + getBasketTotal(basket) * 100,
        // 소수점으로 인한 오류를 방지 하기 위해 100곱함
      });
      setClientSecret(res.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  // basket이 바뀔 때만 렌더링
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcess(true);

    const payload = await stripe
      .ConfirmCardPaymentData(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceed(true);
        setError(null);
        setProcess("");

        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  }; //submit 될때만 동기화 시킴
  const handleChange = (event) => {
    setDisable(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const stripe = useStripe();
  const elements = useElements(true);

  return (
    <>
      <Header />
      <Elements stripe={promise}>
        {/* element 형태로 가져와야지 stripe가 제공하는 암호화 과정을 거침 */}
        <div className="payment">
          <div className="payment_container">
            <Link className="linkTOCheckout" to="/checkout">
              <h1>장바구니로 돌아가기</h1>
            </Link>
            <h1>({basket?.length} 개의 상품 목록이 존재합니다.)</h1>
            <div className="payment_section">
              <div className="payment_title">
                <h3>배달 받을 곳</h3>
              </div>
              <div className="payment_adress">
                <p>{user?.email}님의 주소</p>
                <p>서울특별시</p>
                <p>동대문구</p>
              </div>
            </div>
          </div>
          <div className="payment_section">
            <div className="payment_title">
              <h3>상품 목록</h3>
            </div>
            <div className="payment_item">
              {basket.map((item) => (
                <CheckOutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment_section">
            <div className="payment_title">
              <h3>결제</h3>
            </div>
            <div className="payment_details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment_priceContaine">
                  {/* currencyFormat - subtotal에서 사용했던 형태를 그대로 가져옴 */}
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <p>
                          총액 ( {basket.length} items):{" "}
                          <strong>{value}원</strong>
                        </p>
                        <small className="subtotal_gift">
                          <input type="checkbox" />
                          구매 하시겠습니까?
                        </small>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₩"}
                  />
                  <button disabled={process || disable || succeed}>
                    <span>{process ? "결제 중..." : "결제 완료"}</span>
                  </button>
                </div>
                {error && <div> {error} </div>}
              </form>
            </div>
          </div>
        </div>
      </Elements>
    </>
  );
}

export default Payment;
