import React, { useEffect, useState } from 'react';
import './reviewmanage.css';
import reviewmanagelogo from './images/reviewmanagelogo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book, onCancelReservation, onMenuBrowse }) => {
  return (
    <div className="reviewmanagecontainer">
      <span className="reviewmanagenametag">{book.name}</span>
      <span className="reviewmanagecontenttag">평점 : {book.stars}</span>
      <span className="reviewmanagecontenttag">메뉴 : {book.menu}</span>
      <span className="reviewmanagereviewtag">후기 : {book.contents}</span>
      <div className='photocontainer'>
      <span className='photocontentempty'>사진</span>
      </div>
      <button className="reviewmenufindbutton" onClick={() => onMenuBrowse(book.rating)}>
        리뷰 수정
      </button>
      <button className="reviewcancelbutton" onClick={() => onCancelReservation(book.name, book.review_id)}>
        리뷰 삭제
      </button>
      
    </div>
  );
};

const BookList = ({ books, onCancelReservation, onMenuBrowse }) => {
  return (
    <div className="review-list">
      {books.map((book, index) => (
        <BookItem key={index} book={book} onCancelReservation={onCancelReservation} onMenuBrowse={onMenuBrowse} />
      ))}
    </div>
  );
};

const ReviewManage = () => {

  const navigate = useNavigate();

  const [myreview, setmyreview] = useState([]);

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
    instance.get('/users/reviews')  
        .then(response => {
            // Handle the response and update the state
            console.log(response.data);
            setmyreview(response.data.reviews);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []); 

  const handleCancelReservation = (storeName, reviewID) => {
    console.log(`${reviewID} | 예약이 취소된 가게: ${storeName}`);
    // 여기에서 예약 취소 로직을 추가할 수도 있습니다.
  };

  const handleMenuBrowse = (rating) => {
    console.log("아직 현재는 지원하지 않는 기능입니다.");
    // 여기에서 메뉴 둘러보기 로직을 추가할 수도 있습니다.
  };

  function gotoback() {
    navigate('/mypage');
  }

  return (
    <div className="reviewmanagebackground">
      <div className="reviewmanagelogocontainer">
        <img className="reviewmanagelogo" src={reviewmanagelogo} alt="Logo" />
      </div>
      <div className='reviewmanagecontext'>
        <BookList books={myreview} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
      </div>
      <div className='reviewmanagebottom'>
        <button className="reviewmanagebackbutton"onClick={gotoback}>뒤로가기</button>
      </div>
    </div>
  );
};

export default ReviewManage;
