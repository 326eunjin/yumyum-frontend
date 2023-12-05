import React from 'react';
import './reviewmanage.css';
import reviewmanagelogo from './images/reviewmanagelogo.png'

const BookItem = ({ book, onCancelReservation, onMenuBrowse }) => {
  return (
    <div className="reviewmanagecontainer">
      <span className="reviewmanagenametag">{book.name}</span>
      <span className="reviewmanagecontenttag">평점 : {book.rating}</span>
      <span className="reviewmanagecontenttag">메뉴 : {book.menu}</span>
      <span className="reviewmanagereviewtag">후기 : {book.review}</span>
      <div className='photocontainer'>사진</div>
      <button className="reviewmenufindbutton" onClick={() => onMenuBrowse(book.rating)}>
        리뷰 수정
      </button>
      <button className="reviewcancelbutton" onClick={() => onCancelReservation(book.name)}>
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

const reviewmanage = () => {
  const books = [
    { name: '샐러데이즈 숭실대점', rating: 4.3 , menu : '연어 포케 샐러드', review : '샐러드 양도 많고, 혼자 먹기 괜찮은 분위기'},
    { name: '서브웨이 숭실대점', rating: 4.1 , menu : '스테이크 앤 치즈', review : '혼자 먹기 괜찮은 분위기, 가성비 굿'},
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
    <div className="reviewmanagebackground">
      <div className="reviewmanagelogocontainer">
        <img className="reviewmanagelogo" src={reviewmanagelogo} alt="Logo" />
      </div>
      <div className='reviewmanagecontext'>
        <BookList books={books} onCancelReservation={handleCancelReservation} onMenuBrowse={handleMenuBrowse} />
      </div>
      <div className='reviewmanagebottom'>
        <button className="reviewmanagebackbutton">뒤로가기</button>
      </div>
    </div>
  );
};

export default reviewmanage;
