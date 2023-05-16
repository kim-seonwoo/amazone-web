import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import "./Subtotal.css";
import { getBasketTotal } from "./Reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate(); //useHistory대신 useNavigate를 이용
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              총액 ( {basket.length} items): <strong>{value}원</strong>
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
      <button onClick={(e) => navigate("/payment")}>결제하기</button>
    </div>
  );
}

export default Subtotal;
