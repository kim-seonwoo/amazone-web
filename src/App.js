import "./App.css";
import Checkout from "./Checkout";
import Header from "./Header.js";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Orders from "./Orders";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("사용자:", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else
        dispatch({
          type: "SET_USER",
          user: null,
        });
    });
  }, []);
  //AUth User정보를 가져옴
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// https://e-clone-web-eddc0.web.app/
