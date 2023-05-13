import React, { useState } from "react";
import "./Login.css";
import { Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //useHistory가 useNavigate로 변경되었다. 페이지 이동을 손쉽게하기.
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((auth) => {
      navigate("/");
      alert("Welcome! " + { email });
    });
  }; //firebase에 있는 정보와 비교해줌
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password) //파이어 베이스에서 제공하는 메소드
      .then((auth) => {
        navigate("/");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <Home className="login_logo" />
      </Link>

      <div className="login_container">
        <h1>Login</h1>
        <form>
          <h5>이메일</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <h5>비밀번호</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button className="login_signButton" onClick={signIn}>
            로그인 하기
          </button>
        </form>
        <p> 회원이 아니십니까?</p>
        <button className="button_register" onClick={register}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
