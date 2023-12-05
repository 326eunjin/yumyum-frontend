import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/newreview" element={<NewReview />} />
        <Route path="/book" element={<Book />} />
        <Route path="/reviewmanage" element={<ReviewManage />} />
        <Route path="/restaurantsearch" element={<RestaurantPage />} />
        <Route
          path="/*"
          element={
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <Link to="/loading">
                  <button className="App-link" type="button">
                    Go to loading
                  </button>
                </Link>
                <Link to="/login">
                  <button className="App-link" type="button">
                    Go to Login
                  </button>
                </Link>
                <Link to="/myPage">
                  <button className="App-link" type="button">
                    Go to myPage
                  </button>
                </Link>
              </header>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
