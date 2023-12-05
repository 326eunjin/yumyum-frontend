import React from 'react';
import './book.css';
import booklogo from './images/booklogo.png'

const BookItem = ({ book, onCancelReservation, onMenuBrowse }) => {
  return (
    <div className="bookcontainer">
      <span className="booknametag">{book.name}</span>
      <span className="bookwaitingtag">현재 앞에 {book.rating}팀 대기중</span>
      <button className="bookcancelbutton" onClick={() => onCancelReservation(book.name)}>
        예약 취소
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
  const books = [
    { name: '서브웨이 숭실대점', rating: 0 },
    { name: '생활맥주 숭실대점', rating: 3 },
    { name: '긴자료코 숭실대점', rating: 2 },
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
    <div className="bookbackground">
      <div className="booklogocontainer">
      <img className="booklogo" src={booklogo} alt="Logo" />
      </div>
      <div className='bookcontext'>
        <BookList books={books} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
      </div>
      <div className='bookbottom'>
        <button className="bookbackbutton">뒤로가기</button>
      </div>
    </div>
  );
};

export default Book;
