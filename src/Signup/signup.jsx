import React from 'react';
import './signup.css';

const SignUpPage = () => {
  return (
    <div id = "background">
        <div id="content">
        <div className="signuplogo"></div>
        <div id="multibox">
            <div id="inputbox">
            <div id="phonecert">
                <div id="sendcert">
                <div id="phonebox"><span className="e389_29">휴대번호</span></div>
                <div id="sendbutton"><span className="e398_72">전송</span></div>
                </div>
                <div id="checkcert">
                <div id="certbox"><span className="e389_31">인증번호</span></div>
                <div id="checkbutton"><span className="e389_42">확인</span></div>
                </div>
            </div>
            <div id="pwcert">
                <div id="pwbox"><span className="e389_33">비밀번호</span></div>
                <div id="checkpw">
                <div id="repwbox"><span className="e389_35">비밀번호확인</span></div>
                <div id="pwcheckbutton"><span className="e398_74">확인</span></div>
                </div>
            </div>
            <div id="signup">
                <button id="signupbutton">완료</button>
            </div>
            </div>
            <div id="signupback">
            <button id="backbutton">뒤로</button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default SignUpPage;
