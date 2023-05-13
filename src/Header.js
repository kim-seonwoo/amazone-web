import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Lock, LockOpen, ShoppingBasket } from "@mui/icons-material";
import { Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthenticAction = () => {
    if (user) {
      alert("로그아웃 되었습니다");
      auth.signOut();
    }
  };

  // signOut을 통하여 손쉽게 로그아웃 동작을 구현할 수 있음
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://itimg.chosun.com/sitedata/image/201904/28/2019042800409_0.jpg"
        />
      </Link>
      {/* 로고 */}
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      {/* 검색창 */}
      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionLineOne">One</span>
          <Link to={!user && "/login"} className="homeLogin">
            {/* 로그인을 안했을 때만 함수 작동 */}
            <span
              className="header_optionLineTwo"
              onClick={handleAuthenticAction}
            >
              {user ? <LockOpen /> : <Lock />}
            </span>
          </Link>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">돌아가기</span>
          <span className="header_optionLineTwo">주문내역</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">반가워요</span>
          <span className="header_optionLineTwo">좋아요</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasket />
            <span className="header_optionLintTwo_basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
