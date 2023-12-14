import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import instance from "./axios";
import { useNavigate } from 'react-router-dom';
import "./home.css";

const Marker = ({ position, markerImageSrc }) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/restaurants/nearby/?latitude=${position.lat}&longitude=${position.lng}&dist=0`
      );
      setRestaurantData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  return (
    <MapMarker
      position={position}
      image={{
        src: markerImageSrc,
        size: { width: 32, height: 36 },
      }}
      onClick={(marker) => map.panTo(marker.getPosition())}
      onMouseOver={() => {
        fetchData(); // Fetch data on mouse over
        setIsVisible(true);
      }}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && (
        <div>
          {restaurantData ? (
            <div id="resInfo">
              <h2>{restaurantData.data.name}</h2>
              <p>{restaurantData.data.address}</p>
              <p>"대기 예약 : {restaurantData.data.waiting}"</p>
              <p>
                "운영 시간 : {restaurantData.data.start_time} ~{" "}
                {restaurantData.data.end_time}"
              </p>
              {/* Add other fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </MapMarker>
  );
};

const YourComponent = () => {
  const [state, setState] = useState({
    center: { lat: 37.4946567, lng: 126.9062257 },
    errMsg: null,
    isLoading: true,
    GuitarPositions: [],
    KoreanPositions: [],
    JapanesePositions: [],
    ChinesePositions: [],
    WesternPositions: [],
    BarPositions: [],
    FastPositions: [],
    InstantPositions: [],
    CafePositions: [],
  });

  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    const handleGeoLocation = (position) => {
      const newCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setState((prev) => ({ ...prev, center: newCenter, isLoading: false }));

      // Log the updated coordinates to the console
      console.log("Latitude:", newCenter.lat);
      console.log("Longitude:", newCenter.lng);

      if (!fetchedData) {
        fetchData();
        setFetchedData(true);
      }
    };

    const handleGeoLocationError = (err) => {
      setState((prev) => ({ ...prev, errMsg: err.message, isLoading: false }));
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        handleGeoLocation,
        handleGeoLocationError
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "Geolocation is not supported.",
        isLoading: false,
      }));
    }
  }, [fetchedData]);

  const fetchData = async () => {
    const categories = [0, 100, 200, 300, 400, 500, 600, 700, 800];

    try {
      const promises = categories.map(async (category) => {
        const response = await instance.get(
          `/restaurants/all/?category=${category}`
        );
        return response.data.restaurants;
      });

      const results = await Promise.all(promises);

      setState((prev) => ({
        ...prev,
        GuitarPositions: results[0] || [],
        KoreanPositions: results[1] || [],
        JapanesePositions: results[2] || [],
        ChinesePositions: results[3] || [],
        WesternPositions: results[4] || [],
        BarPositions: results[5] || [],
        FastPositions: results[6] || [],
        InstantPositions: results[7] || [],
        CafePositions: results[8] || [],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setState((prev) => ({
        ...prev,
        errMsg: "Error fetching data",
        isLoading: false,
      }));
    }
  };

  const navigate = useNavigate();

  function gotothread (){
      navigate('/thread');
  }

  function gotomypage(){
    navigate('/login');
  }

  function gotosearchpage(){
    navigate('/restaurantsearch');
  }

  return (
    <Map
      center={state.center}
      style={{
        width: "100%",
        height: "100vh",
      }}
      level={1}
    >
      {!state.isLoading && (
        <>
          <MapMarker position={state.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "Are you here?"}
            </div>
          </MapMarker>
          {Array.isArray(state.GuitarPositions) &&
            state.GuitarPositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Guitar.png"
              />
            ))}
          {Array.isArray(state.KoreanPositions) &&
            state.KoreanPositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Korea.png"
              />
            ))}
          {Array.isArray(state.JapanesePositions) &&
            state.JapanesePositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Japan.png"
              />
            ))}
          {Array.isArray(state.ChinesePositions) &&
            state.ChinesePositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_China.png"
              />
            ))}
          {Array.isArray(state.WesternPositions) &&
            state.WesternPositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Western.png"
              />
            ))}

          {Array.isArray(state.InstantPositions) &&
            state.InstantPositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Instant.png"
              />
            ))}
          {Array.isArray(state.FastPositions) &&
            state.FastPositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_FastFood.png"
              />
            ))}
          {Array.isArray(state.BarPositions) &&
            state.BarPositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Beer.png"
              />
            ))}
          {Array.isArray(state.CafePositions) &&
            state.CafePositions.map((position) => (
              <Marker
                key={`${position.lat},${position.lng}`}
                position={position}
                markerImageSrc="/images/category_Cafe.png"
              />
            ))}
        </>
      )}
      <div className="e294_42">
        <div className="e403_16">
          <div className="searchbar">
            <input
              id="searchkey"
              type="text"
              placeholder="검색할 음식을 입력해주십시오"
            />
          </div>
          <div className="iconbox">
            <div className="searchbutton" onClick={gotosearchpage}>
              <div className="e313_8"></div>
            </div>
            <div className="mypagebutton" onClick={gotothread}>
              <img
                className="buttonform"
                src="/images/thread.png"
                alt="CommuLogo"
              />
            </div>
            <div className="mypagebutton" onClick={gotomypage}>
              <img
                className="buttonform"
                src="/images/mypage.png"
                alt="CommuLogo"
              />
            </div>
          </div>
        </div>
        <div id="bottombutton">
          <button className="GPSButton">
            <img id="logo" src="/images/GPS.png" alt="Logo" />
          </button>
        </div>
      </div>
    </Map>
  );
};

export default YourComponent;
