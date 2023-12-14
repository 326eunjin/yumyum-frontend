/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./restaurantsearch.css";
import testrestaurantlogo from "./images/subway.png";
import testrestaurantmap from "./images/subwaymap.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  function gotoalter(){
    navigate('/alterrestaurant');
  }

  function gotohome(){
    navigate('/home');
  }
  function newreview() {
    const restaurantId = restaurant.restaurant_id;
    const restaurantName = restaurant.name;
    navigate(`/newreview`, {
      state: { id: restaurantId, name: restaurantName },
    });
  }

  return (
    <div className="searchcontentinnercontainer">
      <div className="searchcontentcontainer">
        <img
          className="searchrestaurantlogo"
          src={testrestaurantlogo}
          alt="Logo"
        />
        <span className="searchnametag">{restaurant.name}</span>
        <span className="searchcontexttag">#간편 #다이어트 #샌드위치</span>
        <span className="searchcontexttag">
          리뷰 평점 : {restaurant.score}점
        </span>
        <span className="searchcontexttag">
          운영시간 : {restaurant.opentime} - {restaurant.closetime}
        </span>
        <span className="searchcontexttag">위치 : {restaurant.loacation}</span>
        <span className="searchparttag">메뉴 구성</span>
        <div className="restarantmenulist">
          <span className="restaurantcontexttag">
            관리자페이지 추가 후 구현 예정
          </span>
          <button className="showallmenubutton">전체 보기</button>
        </div>
        <span className="searchparttag">공지 사항</span>
        <div className="restarantmenulist">
          <span className="restaurantcontexttag">
            관리자페이지 추가 후 구현 예정
          </span>
          <button className="showallmenubutton">전체 보기</button>
        </div>
          <span className="searchparttag">이용 후기</span>
        <div className="restarantmenulist">
          <span className="restaurantcontexttag">유저 : {restaurant.review1.username}</span>
          <span className="restaurantcontextcontent">별점 : {restaurant.review1.stars}</span>
          <span className="restaurantcontextcontent">내용 : {restaurant.review1.comments}</span>

          <span className="restaurantcontexttag">유저 : {restaurant.review2.username}</span>
          <span className="restaurantcontextcontent">별점 : {restaurant.review2.stars}</span>
          <span className="restaurantcontextcontent">내용 : {restaurant.review2.comments}</span>
          <button className="showallmenubutton" onClick={newreview}>
            리뷰 작성
          </button>
        </div>
        <span className="searchparttag">대기 현황</span>
        <div className="restarantmenulist">
          <span className="restaurantwaitingtag1">평균 대기 시간 : </span>
          <span className="restaurantwaitingtag2">현재 대기중인 팀 : </span>
          <span className="restaurantwaitingtag3">예상 대기 시간 : </span> 
          <button className="showallmenubutton" onClick={gotoalter}>줄서기</button>
        </div>
      </div>
      <button className="searchbackbutton" onClick={gotohome}>뒤로 가기</button>
    </div>
  );
};

const RestaurantSlider = ({ restaurants }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage(
      currentPage - 1 < 0 ? restaurants.length - 1 : currentPage - 1
    );
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage + 1) % restaurants.length);
  };

  return (
    <div className="searchbackground">
      <div className="searchtotalcontainer">
        <RestaurantCard restaurant={restaurants[currentPage]} />
        <div className="changepageslide">
          <button className="searchslidebutton" onClick={handlePrevPage}>
            이전 결과
          </button>
          <button className="searchslidebutton" onClick={handleNextPage}>
            다음 결과
          </button>
        </div>
      </div>
    </div>
  );
};

const RestaurantPage = () => {
  const [restaurantlist, setrestaurantlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key used for the token

    const instance = axios.create({
      baseURL: "https://yumyum-backend-48405822bc43.herokuapp.com",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Fetch data from the server using axios
    instance
      .get("/restaurants/filtered/?latitude=37.50726305&longitude=126.9599876")
        .then(response => {
            console.log(response.data.restaurants);
            setrestaurantlist(response.data.restaurants);
            console.log(restaurantlist);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []); 

  
  const restaurants = [
    {
      restaurant_id: 3310,
      name: "알리바바 중앙대병원점",
      score: 4.67,
      opentime: "00:00",
      closetime: "24:00",
      loacation: "서울특별시 동작구 흑석동 190-45",
      review1 : {
        username : "테스트유저",
        stars : 5,
        comments : "국물이 깊고 감칠맛이 일품이에요, 각 음식마다 정성이 느껴져서 특별한 날이나 손님 맞이할 때 딱인 곳입니다"
      },
      review2 : {
        username : "테스트유저",
        stars : 4,
        comments : "세련된 음식과 품격 있는 분위기, 정성 가득한 서비스까지. 감각적인 요리와 함께하는 즐거운 시간을 선사합니다"
      }
      
    },
    {
      restaurant_id: 1755,
      name: "돼지가",
      score: 4.67,
      opentime: "09:00",
      closetime: "20:00",
      loacation: "서울특별시 동작구 흑석동 223-41",
      review1 : {
        username : "테스트유저",
        stars : 4.8,
        comments : "셰프의 정성 가득한 요리는 물론, 정갈한 디자인과 세련된 음악까지 조화로운 식사를 선사합니다. 매번 새로운 맛을 기대하며 찾게 되는 가게"
      },
      review2 : {
        username : "테스트유저",
        stars : 4.2,
        comments : "음식이 빠르게 나와서 좋고, 가끔 간편하게 먹기 좋아요"
      }
    },
    {
      restaurant_id: 434,
      name: "진호프",
      score: 4.53,
      opentime: "11:00",
      closetime: "19:00",
      loacation: "서울특별시 동작구 흑석동 190-9",
      review1 : {
        username : "테스트유저",
        stars : 4.8,
        comments : "셰프의 정성 가득한 요리는 물론, 정갈한 디자인과 세련된 음악까지 조화로운 식사를 선사합니다. 매번 새로운 맛을 기대하며 찾게 되는 가게"
      },
      review2 : {
        username : "테스트유저",
        stars : 4.2,
        comments : "독특한 플레이팅과 정갈한 인테리어로 눈과 입 모두 즐거운 식당. 맛 또한 뛰어나고 가격도 합리적. 친구와의 소소한 모임에 딱이에요."
      }
    },
    {
      restaurant_id: 390,
      name: "서울특별시 동작구 흑석동 184-27",
      score: 4.33,
      opentime: "09:00",
      closetime: "19:00",
      loacation: "서울특별시 동작구 흑석동 184-27",
      review1 : {
        username : "테스트유저",
        stars : 4,
        comments : "음식이 빠르게 나와서 좋고, 가끔 간편하게 먹기 좋아요"
      },
      review2 : {
        username : "테스트유저",
        stars : 4.7,
        comments : "독특한 플레이팅과 정갈한 인테리어로 눈과 입 모두 즐거운 식당. 맛 또한 뛰어나고 가격도 합리적. 친구와의 소소한 모임에 딱이에요.ㄴ"
      }
    },
    {
      restaurant_id: 390,
      name: "서울특별시 동작구 흑석동 190-37",
      score: 4.33,
      opentime: "12:00",
      closetime: "21:00",
      loacation: "서울특별시 동작구 흑석동 184-27",
      review1 : {
        username : "테스트유저",
        stars : 4,
        comments : "각 음식의 정성이 느껴져서 정말 가족이나 친구와 함께 음식들을 한 자리에서 즐길 수 있었습니다"
      },
      review2 : {
        username : "테스트유저",
        stars : 4.7,
        comments : "여러 차례 다른 집들을 찾았지만 결국 여기로 돌아오게 되네요. 인테리어도 정말 멋져요."
      }
    },
    // 추가적인 레스토랑 데이터
  ];

  return (
    <div>
      <RestaurantSlider restaurants={restaurants} />
    </div>
  );
};

export default RestaurantPage;
