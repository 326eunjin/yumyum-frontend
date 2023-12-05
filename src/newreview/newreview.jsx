import React from 'react';
import './newreview.css';
import inputphotologo from './images/rectangle_109.png';

const NewReview = () => {
  return (
    <div className="background">

        <div className='logocontainer'>
            <div className="logo"></div>
        </div>

        <div className="contextcontainer">
            <div className="namecontainer">
                <span className="nametag">식당 이름</span>
            </div>
            <div className="scorecontainer">
                <span className="scoretag">평점</span>
            </div>
            <div className="menucontainer">
                <span className="menutag">메뉴</span>
            </div>
            <div className="textcontainer">
                <span className="texttag">후기</span>
            </div>
            <div className="reviewphotocontainer">
                <img className="inputlogo" src={inputphotologo} alt="inputlogo" />
                <span className="phototag">사진 선택하기</span>
            </div>
            <div className="keywordcontainer">
                <span className="keywordmaintag">키워드</span>
                <span className="keywordinnertag">음식</span>
                <div className="keywordbox"></div>
                <span className="keywordinnertag">분위기</span>
                <div className="keywordbox"></div>
                <span className="keywordinnertag">편의</span>
                <div className="keywordbox"></div>
            </div>
        </div>

        <div className='buttoncontainer'>
            <div className='yesornocontainer'>
                <button className="nobutton">취소</button>
                <button className="yesbutton">완료</button>
            </div>
        </div>
            
    </div>
  );
};

export default NewReview;
