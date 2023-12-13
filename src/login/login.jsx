import React, { useState } from "react";
import mainlogo from "./logo.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = async (e) => {
    e.preventDefault();

    if (!phone_number || !password) {
      return alert("ID와 PW를 입력해주세요");
    }

    try {
      const response = await axios.post(`/users/auth/`, {
        phone_number,
        password,
      });
      const { data } = response.data;
      const accessToken = data.token.access;

      if (response.status === 200) {
        console.log("Login successful");

        // Store the token in local storage
        localStorage.setItem("token", accessToken);

        // Navigate to the protected route or perform other actions
        navigate("/mypage");
      } else {
        alert(`Login failed. ${data.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  function movesignup() {
    navigate("/signup");
  }

  return (
    <div className="background">
      <div className="content">
        <img className="mainlogo" src={mainlogo} alt="Logo" />
        <form onSubmit={loginFunc}>
          <div className="loginform">
            <div id="phonebox">
              <span className="phone">휴대번호</span>
              <input
                className="inputphone"
                type="text"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div id="pwbox">
              <span className="pw">비밀번호</span>
              <input
                className="inputpw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login" type="submit">
              로그인
            </button>
            <div className="extrabutton">
              <button id="signupbutton" onClick={movesignup}>
                회원가입
              </button>
              <button id="findbutton">ID / PW 찾기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
