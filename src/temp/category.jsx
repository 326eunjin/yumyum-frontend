// CategoryMarkerStyle.jsx

import React from "react";

const CategoryMarkerStyle = () => {
  return (
    <style>
      {`
        #mapwrap {
          position: relative;
          overflow: hidden;
        }
        
        .category,
        .category * {
          margin: 0;
          padding: 0;
          color: #000;
        }
        
        .category {
          position: absolute;
          overflow: hidden;
          top: 10px;
          left: 10px;
          width: 150px;
          height: 50px;
          z-index: 10;
          border: 1px solid black;
          font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
          font-size: 12px;
          text-align: center;
          background-color: #fff;
        }
        
        .category .menu_selected {
          background: #ff5f4a;
          color: #fff;
          border-left: 1px solid #915b2f;
          border-right: 1px solid #915b2f;
          margin: 0 -1px;
        }
        
        .category li {
          list-style: none;
          float: left;
          width: 50px;
          height: 45px;
          padding-top: 5px;
          cursor: pointer;
        }
        
        .category .ico_comm {
          display: block;
          margin: 0 auto 2px;
          width: 22px;
          height: 26px;
          background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png') no-repeat;
        }
        
        .category .ico_coffee {
          background-position: -10px 0;
        }
        
        .category .ico_store {
          background-position: -10px -36px;
        }
        
        .category .ico_carpark {
          background-position: -10px -72px;
        }
      `}
    </style>
  );
};

export default CategoryMarkerStyle;
