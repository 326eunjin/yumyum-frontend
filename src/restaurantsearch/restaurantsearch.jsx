import React, { useEffect, useState } from 'react';
import './restaurantsearch.css';
import testrestaurantlogo from "./images/subway.png";
import testrestaurantmap from "./images/subwaymap.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  function newreview(){
    const restaurantId = restaurant.restaurant_id;
    const restaurantName = restaurant.name;
    navigate(`/newreview`, {state: { id : restaurantId, name : restaurantName },
    });
  }

  return (
    <div className="searchcontentinnercontainer">
        <div className="searchcontentcontainer">
          <img className="searchrestaurantlogo" src={testrestaurantlogo} alt="Logo" />  
          <span className="searchnametag">{restaurant.name}</span>
          <span className="searchcontexttag">#간편 #다이어트 #샌드위치</span>
          <span className="searchcontexttag">리뷰 평점 : {restaurant.score}점</span>
          <span className="searchcontexttag">운영시간 : {restaurant.opentime} - {restaurant.closetime}</span>
          <span className="searchcontexttag">위치 : {restaurant.loacation}</span>
          <img className="searchrestaurantmap" src={testrestaurantmap} alt="Logo" />
          <span className="searchparttag">메뉴 구성</span>
          <div className="restarantmenulist">
            <span className="restaurantcontexttag">관리자페이지 추가 후 구현 예정</span>
            <button className='showallmenubutton'>전체 보기</button>
          </div>

          <span className="searchparttag">공지 사항</span>
          <div className="restarantmenulist">
            <span className="restaurantcontexttag">관리자페이지 추가 후 구현 예정</span>
            <button className='showallmenubutton'>전체 보기</button>
          </div>
          ㄴ
          <span className="searchparttag">이용 후기</span>
          <div className="restarantmenulist">
            <span className="restaurantcontexttag">이용후기 예시</span>
            <button className='showallmenubutton' onClick={newreview}>리뷰 작성</button>
          </div>
          <span className="searchparttag">대기 현황</span>
          <div className="restarantmenulist">
            <span className="restaurantwaitingtag1">평균 대기 시간 : </span>
            <span className="restaurantwaitingtag2">현재 대기중인 팀 : </span>
            <span className="restaurantwaitingtag3">예상 대기 시간 : </span>
            <button className='showallmenubutton'>줄서기</button>
          </div>
        </div>
          <button className="searchbackbutton">뒤로 가기</button>
    </div>
  );
};

const RestaurantSlider = ({ restaurants }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1 < 0 ? restaurants.length - 1 : currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage + 1) % restaurants.length);
  };

  return (
    <div className="searchbackground">
      <div className="searchtotalcontainer">
        <RestaurantCard restaurant={restaurants[currentPage]} />
        <div className='changepageslide'>
          <button className="searchslidebutton" onClick={handlePrevPage}>이전 결과</button>
          <button className="searchslidebutton" onClick={handleNextPage}>다음 결과</button>
          </div>
      </div>
    </div>
  );
};

const RestaurantPage = () => {
  
  const [restaurantlist, setrestaurantlist] = useState([]);
  
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
    instance.get('/restaurants/filtered', {
        params: {
            latitude: 37.50726305,
            longitude: 126.9599876,
        },
        })
        .then(response => {
            console.log(response.data.restaurants);
            setrestaurantlist(response.data.restaurants);
            sle
          })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []); 

  
  const restaurants = [
    { restaurant_id : 1 , name: '서브웨이 숭실대점', score: 4.1, opentime:"07:00", closetime:"22:00", loacation:"서울 동작구 사당로 10 지층 101호"},
    { restaurant_id : 2 , name: '샐러데이즈 상도점', score: 4.58, opentime:"09:00", closetime:"20:00", loacation:"서울 동작구 상도로 337-1 1층"},
    { restaurant_id : 3 , name: '우마이', score: 4.53, opentime:"11:00", closetime:"19:00", loacation:"서울 동작구 상도로 67길 27 3층"},
    { restaurant_id : 3 , name: '우마이', score: 4.53, opentime:"11:00", closetime:"19:00", loacation:"서울 동작구 상도로 67길 27 3층"},
    // 추가적인 레스토랑 데이터
  ];

  return (
    <div >
      <RestaurantSlider restaurants={restaurants} /> 
    </div>
  
  );
};

export default RestaurantPage;