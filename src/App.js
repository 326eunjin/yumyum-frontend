import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './login/login';  
import LoadingPage from './loading/loading';
import MyPage from './mypage/mypage';
import SignUpPage from './Signup/signup';
import HomePage from './home/home';
import NewReview from './newreview/newreview';
import Book from './book/book';
import ReviewManage from './reviewmanage/reviewmanage';
import RestaurantPage from './restaurantsearch/restaurantsearch';
import Thread from './thread/thread'
import Alterrestaurant from './alterrestaurant/alterrestaurant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/newreview" element={<NewReview />} />
        <Route path="/book" element={<Book />} />
        <Route path="/reviewmanage" element={<ReviewManage />} />
        <Route path="/restaurantsearch" element={<RestaurantPage />} />
        <Route path="/thread" element={<Thread />} />
        <Route path='/alterrestaurant' element={<Alterrestaurant />} />
        <Route path="/*" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
