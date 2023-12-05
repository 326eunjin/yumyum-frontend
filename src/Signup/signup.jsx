import React from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();

    function movelogin(){
        navigate('/login');
    }
    return (
        <div className = "background">
            <div className="content">
                <div className="signuplogo"></div>
                <div className="multibox">
                    <div className="inputbox">
                    <div className="phonecert">
                        <div className="sendcert">
                        <div className="phonebox"><span className="e389_29">휴대번호</span></div>
                        <div className="sendbutton"><span className="e398_72">전송</span></div>
                        </div>
                        <div className="checkcert">
                        <div className="certbox"><span className="e389_31">인증번호</span></div>
                        <div className="checkbutton"><span className="e389_42">확인</span></div>
                        </div>
                    </div>
                    <div className="pwcert">
                        <div className="pwbox"><span className="e389_33">비밀번호</span></div>
                        <div className="checkpw">
                        <div className="repwbox"><span className="e389_35">비밀번호확인</span></div>
                        <div className="pwcheckbutton"><span className="e398_74">확인</span></div>
                        </div>
                    </div>
                    <div className="signup">
                        <button className="signupbutton">완료</button>
                    </div>
                    </div>
                    <div className="signupback">
                    <button className="backbutton" onClick={movelogin}>뒤로</button>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default SignUpPage;
