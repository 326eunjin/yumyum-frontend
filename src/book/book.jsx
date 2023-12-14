import React, { useEffect, useState } from 'react';
import './book.css';
import booklogo from './images/booklogo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book, onCancelReservation, onMenuBrowse }) => {

  return (
    <div className="bookcontainer">
      <span className="booknametag">{book.restaurant}</span>
      <span className="bookwaitingtag">현재 앞에 {book.position}팀 대기중</span>
      <button className="bookcancelbutton" onClick={() => onCancelReservation(book.restaurant)}>
        예약 취소 요청
      </button>
      <button className="bookmenufindbutton" onClick={() => onMenuBrowse(book.rating)}>
        메뉴 둘러보기
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

const Book = () => {

  const navigate = useNavigate();

  const [booklist, setbooklist] = useState([]);
  
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
    instance.get('/users/waitings/', {
        })
        .then(response => {
            console.log(response.data.waitings);
            setbooklist(response.data.waitings);
            // Handle the response and update the state
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []); 

  const handleCancelReservation = (storeName) => {
    console.log(`예약이 취소된 가게:   ${storeName}`);
    // 여기에서 예약 취소 로직을 추가할 수도 있습니다.
  };

  const handleMenuBrowse = (rating) => {
    console.log(`현재 관리자 페이지 구현으로 인해 준비중입니다.`);
    // 여기에서 메뉴 둘러보기 로직을 추가할 수도 있습니다.
  };

  function gotoback() {
    navigate('/mypage');
  }

  return (
    <div className="bookbackground">
      <div className="booklogocontainer">
      <img className="booklogo" src={booklogo} alt="Logo" />
      </div>
      <div className='bookcontext'>
        <BookList books={booklist} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
      </div>
      <div className='bookbottom'>
        <button className="bookbackbutton" onClick={gotoback}>뒤로가기</button>
      </div>
    </div>
  );
};

export default Book;
