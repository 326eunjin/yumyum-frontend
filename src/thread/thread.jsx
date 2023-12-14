import React, { useEffect, useState } from 'react';
import './thread.css';
import EmptyHeart from './images/emptyheart.png';
import FilledHeart from './images/emptyheart.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThreadItem = ({ thread, onCancelReservation, onMenuBrowse }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleHeartClick = () => {
        setIsLiked(!isLiked);
        console.log("heart")
        // 여기에서 다른 처리를 추가할 수 있습니다.
    };

    let keywordbox = ['#한식', '#중식', '#일식', '#샐러드'];

    return (
        <div className="threadtotalcontainer">
            <div className="threadUserHeader">
                <div className="threadUserIcon"></div>
                <span className="threadusername">{thread.user_name} </span>
            </div>
            <div className="threadblockcontainer">
                <div className="threadblocknameandheart">
                    <span className="threadblockrestaurantname">{thread.restaurant_name}</span>
                    <img
                        className={`likeHeart ${isLiked ? 'liked' : ''}`}
                        src={isLiked ? FilledHeart : EmptyHeart}
                        alt={isLiked ? 'likedheartLogo' : 'emptyheartLogo'}
                        onClick={handleHeartClick}
                    />
                </div>
                <span className="threadblockrestaurantkeyword">{keywordbox[(thread.category / 100) - 1]}</span>
                <span className="threadblockrestaurantstars">별점 : {thread.stars}</span>
                <span className="threadblockrestaurantcomment">{thread.contents}</span>
            </div>
        </div>
    );
};

const ThreadList = ({ threads, onCancelReservation, onMenuBrowse }) => {
    return (
        <div className="review-list">
            {threads.map((thread, index) => (
                <ThreadItem key={index} thread={thread} onCancelReservation={onCancelReservation} onMenuBrowse={onMenuBrowse} />
            ))}
        </div>
    );
};

const Thread = () => {

    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

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
        instance.get('/reviews/thread', {
            params: {
                latitude: 37.50726305,
                longitude: 126.9599876,
            },
            })
            .then(response => {
                console.log(response.data.reviews);
                setReviews(response.data.reviews);
                console.log(reviews);
                // Handle the response and update the state
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 

    const handleCancelReservation = (storeName) => {
        console.log(`예약이 취소된 가게: ${storeName}`);
        // 여기에서 예약 취소 로직을 추가할 수도 있습니다.
    };

    const handleMenuBrowse = (rating) => {
        console.log(`현재 대기 인원: ${rating}`);
        // 여기에서 메뉴 둘러보기 로직을 추가할 수도 있습니다.
    };

    function gotoback() {
        navigate('/home');
    }

    return (
        <div className="threadbackground">
            <div className="threadcontext">
                <ThreadList threads={reviews} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
            </div>
            <div className="threadbottom">
                <button className="threadbackbutton"onClick={gotoback}> 홈으로 </button>
            </div>
        </div>
    );
};

export default Thread;
