import React, { useState } from 'react';
import './thread.css';
import EmptyHeart from './images/emptyheart.png';
import FilledHeart from './images/emptyheart.png';

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
    const reviews = [
        {
            restaurant_id : 1,
            restaurant_name : "서브웨이 숭실대점",
            user_id : 123,
            user_name : "SSU_SW_박병찬",
            category : 300,
            stars : 4.1,
            menu : "김치찌개",
            contents : "음식이 친절하고, 사장님이 맛있어요",
            created_at : "2023-10-04 12:30:00",
            updated_at : "2023-10-04 12:35:00"
        },
        {
            restaurant_id : 2,
            restaurant_name : "황궁 숭실대점",
            user_id : 456,
            user_name : "SSU_SW_장은진",
            category : 200,
            stars : 4.3,
            menu : "김치찌개",
            contents : "짜장면 양이 많고, 사장님도 친절합니다. 음식도 빨리 나와서 좋아요",
            created_at : "2023-10-04 12:30:00",
            updated_at : "2023-10-04 12:35:00"
        },
        {
            restaurant_id : 4,
            restaurant_name : "은하수식당 숭실대점",
            user_id : 112,
            user_name : "SSU_SW_강재일",
            category : 100,
            stars : 3.7,
            menu : "김치찌개",
            contents : "돈까스 가성비가 좋아요. 근데 특색이 없어서 그냥 가끔 올듯",
            created_at : "2023-10-04 12:30:00",
            updated_at : "2023-10-04 12:35:00"
        },
        {
            restaurant_id : 5,
            restaurant_name : "맥도날드 숭실대점",
            user_id : 113,
            user_name : "SSU_MATH_정한수",
            category : 100,
            stars : 3.7,
            menu : "김치찌개",
            contents : "돈까스 가성비가 좋아요. 근데 특색이 없어서 그냥 가끔 올듯",
            created_at : "2023-10-04 12:30:00",
            updated_at : "2023-10-04 12:35:00"
        },
    ];

    const handleCancelReservation = (storeName) => {
        console.log(`예약이 취소된 가게: ${storeName}`);
        // 여기에서 예약 취소 로직을 추가할 수도 있습니다.
    };

    const handleMenuBrowse = (rating) => {
        console.log(`현재 대기 인원: ${rating}`);
        // 여기에서 메뉴 둘러보기 로직을 추가할 수도 있습니다.
    };

    return (
        <div className="threadbackground">
            <div className="threadcontext">
                <ThreadList threads={reviews} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
            </div>
            <div className="threadbottom">
                <button className="threadbackbutton"> 홈으로 </button>
            </div>
        </div>
    );
};

export default Thread;
