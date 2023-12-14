import React, { useEffect, useState } from 'react';
import './mypage.css';
import mypagelogo from './images/ellipse_9.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StoreText({ text }) {
  return <span className="store-text"> ㅁ  {text}</span>;
}

const MyPage = () => {
    const navigate = useNavigate();
    const [userName, setuserName] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token');  // Replace 'your_token_key' with the actual key used for the token

        const instance = axios.create({
            baseURL: "https://yumyum-backend-48405822bc43.herokuapp.com",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`,
            },
          })

        // Fetch data from the server using axios
        instance.get('/users/mypage/')  
            .then(response => {
                // Handle the response and update the state
                setuserName(response.data.user.name);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 

    function gohome() {
        navigate('/home');
    }

    function logout() {
        localStorage.removeItem("token");
        navigate('/home');
    }

    function gotomyreview() {
        navigate('/reviewmanage')
    }

    function gotomybook() {
        navigate('/book')
    }

    return (
        <div className="background">
            <div className="contentcontainer">
                <div className="topclass">
                    <span className="loginAlert"> {userName} </span>
                    <div className="imagecontainer">
                        <img className="mypageimage" src={mypagelogo} alt="mypageimage" />
                    </div>
                </div>
                <div className="e284_148">
                    <div className="e284_149">
                        <span className="e284_153">최근 본 가게</span>
                    </div>
                    <div className="store-container">
                        <StoreText text="서브웨이 숭실대입구점" />
                        <StoreText text="역전할머니맥주 숭실대점" />
                        <StoreText text="피자스쿨 숭실대입구점" />
                    </div>
                    <button className="morebutton">더보기</button>
                </div>

                <button id="alertbutton" onClick={gotomyreview}>리뷰 관리</button>
                <button id="bookbutton" onClick={gotomybook}>예약 현황</button>
                <button id="mypageloginbutton" onClick={logout}>로그아웃</button>
                <button id="backhome" onClick={gohome}>홈으로</button>
            </div>
        </div>
    );
};

export default MyPage;
