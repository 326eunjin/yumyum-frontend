import React, { useState } from 'react';
import logo from "./logo.png";
import "./login.css"

function LoginPage() {

  const [id, setid] = useState("")
  const [pw, setpw] = useState("")

  const loginFunc = (e) => {
    e.preventDefault();
    if (!id && !pw) {
      return alert("ID와 PW를 입력해주세요")
    }
    if(!id){
      return alert("ID를 입력하세요.");
    }
    
    else if (!pw) {
      return alert("PW를 입력하세요.");
    }
    else{
      console.log("id : " + id);
      console.log("pw : " + pw);
    }
    
  }

  return (
  <div className = "background">
    <div className="content">
      <img className="logo" src={logo} alt="Logo" />
      <div className="loginform">
        <div className="phonebox">
          <span className="phone">휴대번호</span>
          <input className="inputphone" type="text" value={id} onChange={(e) => setid(e.target.value)} />
        </div>
        <div className="pwbox">
          <span className="pw">비밀번호</span>
          <input className="inputpw" type="password" value={pw} onChange={(e) => setpw(e.target.value)} />
        </div>
        <button className="login" onClick={loginFunc} >로그인</button>
        <div className="extrabutton">
          <button className="signupbutton">회원가입</button>
          <button className="findbutton">ID / PW 찾기</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;
