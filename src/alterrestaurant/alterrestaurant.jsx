import React, { useState } from 'react';
import './alterrestaurant.css';

const ThreadItem = ({ thread, onCancelReservation, onMenuBrowse }) => {
    let category = thread.category;
    let numofcategory = category.length;

    let keywordbox = ['#기타', '#한식', '#일식', '#중식', '양식', '#술집', '#패스트푸드', '#인스턴트', '#카페'];

    return (
        <div className="altertotalcontainer">
            <div className="alterblockcontainer">
            <span className="alterblockrestaurantname">{thread.name}</span>
                <div className="category-container">
                    {category.map((cat, index) => {
                        const categoryIndex = Math.min((cat/100), keywordbox.length - 1);
                        return (
                            <span key={index} className="alterblockrestaurantkeyword">
                                {keywordbox[categoryIndex]}
                            </span>
                        );
                    })}
                </div>
                <span className="alterblockrestaurantopeninghour">
                    {thread.is_24_hours == true
                        ? "영업 시간: 24시간 운영"
                        : `영업 시간: ${thread.start_time} - ${thread.end_time}`
                    }
                </span>
                <span className="alterblockrestaurantcomment">현재 위치에서 {thread.distance}</span>
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

const alterrestaurant = () => {
    const reviews = [
        {
            restaurant_id : 123,
            name : "샐러데이즈 숭실대점",
            category : [100, 500],
			is_24_hours: false,
			day_of_week: [0, 1, 2, 3, 4],
			start_time : "09:00",
			end_time : "22:30",
			etc_reason : "그냥",
            distance : "12.33m" //현재 위치로부터의 거리
        },
        {
            restaurant_id : 124,
            name : "은하수식당 숭실대점",
            category : [100, 200, 300],
						is_24_hours: true,
						day_of_week : [1, 2, 4, 5],
						start_time : "00:00",
						end_time : "00:00",
						etc_reason : "그냥그냥",
             distance  : "23.152m" //현재 위치로부터의 거리
        },
        {
            restaurant_id : 125,
            name : "우마이 숭실대점",
            category : [100],
						is_24_hours : false,
						day_of_week : [1, 2, 4, 5],
						start_time : "11:00",
						end_time : "20:00",
						etc_reason : "그냥그냥",
             distance  : "46.5m" //현재 위치로부터의 거리
        },
        {
            restaurant_id : 125,
            name : "우마이 숭실대점",
            category : [100],
						is_24_hours : false,
						day_of_week : [1, 2, 4, 5],
						start_time : "11:00",
						end_time : "20:00",
						etc_reason : "그냥그냥",
             distance  : "46.5m" //현재 위치로부터의 거리
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
        <div className="alterbackground">
            <div className="altercontext">
                <ThreadList threads={reviews} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
            </div>
            <div className="alterbottom">
                <button className="alterbackbutton"> 홈으로 </button>
            </div>
        </div>
    );
};

export default alterrestaurant;
