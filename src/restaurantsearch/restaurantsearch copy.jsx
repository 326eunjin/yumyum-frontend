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
          <span className="searchcontexttag">리뷰 평점 : {restaurant.star_avg}점</span>
          <span className="searchcontexttag">운영시간 : {restaurant.start_time} - {restaurant.end_time}</span>
          <span className="searchcontexttag">위치 : {restaurant.address}</span>
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
          <span className="searchparttag">이용 후기</span>
          <div className="restarantmenulist">
            
            <button className='showallmenubutton' onClick={newreview}>리뷰 작성</button>
          </div>
          <span className="searchparttag">대기 현황</span>
          <div className="restarantmenulist">
            <span className="restaurantwaitingtag1">평균 대기 시간 :  </span>
            <span className="restaurantwaitingtag2">현재 대기중인 팀 : </span>
            <span className="restaurantwaitingtag3">예상 대기 시간 : </span>
            <button className='showallmenubutton'>줄서기</button>
          </div>
        </div>
          <button className="searchbackbutton">뒤로 가기</button>
    </div>
  );
};

const RestaurantSlider = ({ restaurantlist }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurant_info, setrestaurant_info] = useState([]);
  const token = localStorage.getItem('token');  // Replace 'your_token_key' with the actual key used for the token

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1 < 0 ? restaurantlist.length - 1 : currentPage - 1);
    console.log(restaurantlist[currentPage]);
    const token = localStorage.getItem('token');  // Replace 'your_token_key' with the actual key used for the token
    const instance2 = axios.create({
          baseURL: "https://yumyum-backend-48405822bc43.herokuapp.com",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
          },
    })
    // Fetch data from the server using axios
    instance2.get(`/restaurants/${restaurantlist[currentPage]}`)
      .then(response => {
          setrestaurant_info(response.data.data);
          console.log(restaurant_info);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
    };

    const handleNextPage = () => {
      setCurrentPage((currentPage + 1) % restaurantlist.length);
      const token = localStorage.getItem('token');  // Replace 'your_token_key' with the actual key used for the token
    const instance2 = axios.create({
          baseURL: "https://yumyum-backend-48405822bc43.herokuapp.com",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
          },
    })
    // Fetch data from the server using axios
    instance2.get(`/restaurants/${restaurantlist[currentPage]}`)
      .then(response => {
          setrestaurant_info(response.data.data);
          console.log(restaurant_info);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
      console.log(restaurantlist[currentPage]);
    };

  return (
    <div className="searchbackground">
      <div className="searchtotalcontainer">
        <RestaurantCard restaurant={restaurant_info} />
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
            setrestaurantlist(response.data.restaurants);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, [restaurantlist]); 

  return (
    <div >
      <RestaurantSlider restaurantlist={restaurantlist} /> 
    </div>
  
  );
};

export default RestaurantPage;
