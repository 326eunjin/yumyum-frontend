import React, { useEffect, useState, useCallback } from "react";

const MapComponent = () => {
  const [map, setMap] = useState(null);

  // useCallback을 사용하여 의존성 배열이 변하지 않도록 함
  const handleNoGeolocation = useCallback((map) => {
    const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const message = "geolocation 사용이 허용되지 않았습니다.";
    displayMarker(map, locPosition, message);
  }, []);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const initialCenter = new window.kakao.maps.LatLng(33.450701, 126.570667);

    const options = {
      center: initialCenter,
      level: 10,
    };

    const newMap = new window.kakao.maps.Map(mapContainer, options);
    setMap(newMap);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
          const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
          displayMarker(newMap, locPosition, message);
        },
        (error) => {
          console.error(error.message);
          // useCallback으로 감싸진 함수를 호출
          handleNoGeolocation(newMap);
        }
      );

      // Watch position to update map in real-time
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
          moveMarker(newMap, locPosition);
        },
        (error) => {
          console.error(error.message);
        }
      );

      // Cleanup watchPosition on component unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      // useCallback으로 감싸진 함수를 호출
      handleNoGeolocation(newMap);
    }
  }, [handleNoGeolocation]); // handleNoGeolocation 함수를 의존성 배열에 추가

  const displayMarker = (map, locPosition, message) => {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: message,
      removable: true,
    });

    infowindow.open(map, marker);
    map.setCenter(locPosition);
  };

  const moveMarker = (map, locPosition) => {
    if (map) {
      map.panTo(locPosition);
    }
  };

  const handleCenterMap = () => {
    if (map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
          map.panTo(locPosition);
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  };

  const buttonStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: "1",
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      {map && (
        <button style={buttonStyle} onClick={handleCenterMap}>
          Center Map
        </button>
      )}
    </div>
  );
};

export default MapComponent;
