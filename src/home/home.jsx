import React from 'react';
import './home.css';
import GPS from './images/GPS.png';

const HomePage = () => {
  return (
    <div id ="background">
        <div className="e294_42">
            <div className="e403_16">
                <div className="searchbar">
                <input id="searchkey" type="text" placeholder="검색할 음식을 입력해주십시오" />
                </div>
                <div className="e403_14">
                <div className="e403_7">
                    <div className="e313_8"></div>
                </div>
                <div className="e403_5">
                    <div className="e313_11"></div>
                </div>
                </div>
            </div >
            <div id = "bottombutton">
                <button className="bookbutton">+2</button>
                <button className="GPSButton">
                    <img id="logo" src={GPS} alt="Logo" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
