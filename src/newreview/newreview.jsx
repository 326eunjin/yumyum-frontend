import './newreview.css';
import inputphotologo from './images/rectangle_109.png';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const NewReview = () => {

    const location = useLocation();
    const key = location.state;

    const navigate = useNavigate();

    const restaurant_id = key.id;
    const name = key.name;
    const [stars, setstars] = useState();
    const [menu, setmenu] = useState("");
    const [contents, setcontents] = useState("");

    const signupFunc = async (e) => {
        e.preventDefault();

        if(!stars){
            return alert("평점을 입력해 주세요");
        }

        if(!contents){
            return alert("내용를 입력해주세요");
        }

        if(stars < 0 || stars > 5){
            return alert("평점은 0-5 구간입니다. 다시 입력해주세요");
        }
        else{
        console.log(restaurant_id, name, stars, menu, contents);

        const token = localStorage.getItem('token');  // Replace 'your_token_key' with the actual key used for the token

        const instance = axios.create({
            baseURL: "https://yumyum-backend-48405822bc43.herokuapp.com",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`,
            },
        })

        const jsonData = {
            name,
            stars,
            menu,
            contents,
        };
    

        // Fetch data from the server using axios
        instance.post('/restaurant/reviews/write', jsonData)
        .then(response => {
            // Handle the response and update the state
            console.log(response.status);
            alert("성공적으로 리뷰가 작성되었습니다.");
            navigate('/reviewmanage');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        
    }
    };

    return (

    <div className="background">

        <div className='logocontainer'>
            <div className="logo"></div>
        </div>
        <form onSubmit={signupFunc}>
        <div className="contextcontainer">
            <div className="namecontainer">
                <span className="nametag">식당 이름</span>
                <span className='realname'>{name}</span>

            </div>
            <div className="scorecontainer">
                <span className="scoretag">평점</span>
                <input
                className="inputstars"
                type="number"
                value={stars}
                onChange={(e) => setstars(e.target.value)}
                />
            </div>
            <div className="menucontainer">
                <span className="menutag">메뉴</span>
                <input
                className="inputmenu"
                type="text"
                value={menu}
                onChange={(e) => setmenu(e.target.value)}
                />
            </div>
            <div className="textcontainer">
                <span className="texttag">후기</span>
                <input
                className="inputcontents"
                type="text"
                value={contents}
                onChange={(e) => setcontents(e.target.value)}
                />
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
                <button className="yesbutton" type='submit'>완료</button>
            </div>
        </div>
        </form>
    </div>
  );
};

export default NewReview;
