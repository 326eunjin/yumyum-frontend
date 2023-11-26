import React from 'react';
import './mypage.css';
import IMG from './images/ellipse_9.png';

function StoreText({ text }) {
  return <span className="store-text">ㅁ {text}</span>;
}

const MyPage = () => {
  return (
    <div id = "background">
        <div className="content">
            <div id="top">
                <span className="loginAlert">로그인을 해주세요</span>
                <div className="imagecontainer">
                    <img id="image" src={IMG} alt="image" />
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
            
            <button id="alertbutton">알림창</button>
            <button id="bookbutton">예약 현황</button>
            <button className="loginbutton">로그인</button>
            <button className="backhome">홈으로</button>
        </div>
    </div>
  );
};

export default MyPage;
