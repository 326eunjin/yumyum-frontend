import React, { useState } from 'react';
import mainlogo from "./logo.png";
import "./login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function LoginPage() {
  const navigate = useNavigate();

  const [id, setid] = useState("");
  const [pw, setpw] = useState("");

  const loginFunc = async (e) => {
    e.preventDefault();
    if (!id && !pw) {
      return alert("ID와 PW를 입력해주세요");
    }
    if (!id) {
      return alert("ID를 입력하세요.");
    } else if (!pw) {
      return alert("PW를 입력하세요.");
    } else {
      try {
        // Make a POST request to example.com

        const API_URL = '/yumyum/users/auth';

        const response = await axios.post(API_URL, {
          id: id,
          pw: pw,
        });

        // Assuming the response has a state property, log it to the console
        console.log("Response State: " + response.data.state);

        // Handle the response or navigate based on the state, if needed

      } catch (error) {
        // Handle errors
        console.error("Error during login:", error.message);
      }
    }
  };

  function movesignup() {
    navigate('/signup');
  }

  return (
    <div className="background">
      <div className="content">
        <img className="mainlogo" src={mainlogo} alt="Logo" />
        <div className="loginform">
          <div id="phonebox">
            <span className="phone">휴대번호</span>
            <input className="inputphone" type="text" value={id} onChange={(e) => setid(e.target.value)} />
          </div>
          <div id="pwbox">
            <span className="pw">비밀번호</span>
            <input className="inputpw" type="password" value={pw} onChange={(e) => setpw(e.target.value)} />
          </div>
          <button className="login" onClick={loginFunc}>로그인</button>
          <div className="extrabutton">
            <button id="signupbutton" onClick={movesignup}>회원가입</button>
            <button id="findbutton">ID / PW 찾기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
