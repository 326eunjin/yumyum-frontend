import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

const useGeolocation = () => {
  const watchId = useRef(null);

  const [geolocationInfo, setGeolocationInfo] = useState({
    isLoaded: false,
    error: null,
    latitude: null,
    longitude: null,
  });

  const clearWatch = useCallback(() => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, [watchId]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      maximumAge: Infinity,
      timeout: 100000,
    };

    const onEventSuccess = ({ coords }) => {
      const { latitude, longitude } = coords;
      setGeolocationInfo((prev) => ({
        ...prev,
        isLoaded: true,
        latitude,
        longitude,
      }));
    };

    const onEventError = (error) => {
      setGeolocationInfo((prev) => ({
        ...prev,
        error,
      }));
    };

    if (!navigator.geolocation) return;

    watchId.current = navigator.geolocation.watchPosition(
      onEventSuccess,
      onEventError,
      options
    );

    return () => {
      clearWatch();
    };
  }, [clearWatch]);

  return geolocationInfo;
};

const LocationTracker = () => {
  const geolocationInfo = useGeolocation();
  const mapContainerRef = useRef(null);
  const kakaoMap = useRef(null);

  useEffect(() => {
    if (!kakaoMap.current) {
      // Initialize the map only if it doesn't exist
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 2,
      };
      kakaoMap.current = new window.kakao.maps.Map(
        mapContainerRef.current,
        mapOption
      );
    }
  }, []);

  useEffect(() => {
    if (geolocationInfo.isLoaded && kakaoMap.current) {
      const { latitude, longitude } = geolocationInfo;

      // Your API endpoint in Django
      const apiUrl = `https://yumyum-backend-48405822bc43.herokuapp.com/restaurants/nearby?latitude=${latitude}&longitude=${longitude}`;

      // Make a POST request to your Django backend
      axios
        .get(apiUrl, {
          responseType: "json",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((response) => {
          console.log("Location data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending location data:", error);
        });

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
        imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const locPosition = new window.kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치입니다
      if (!kakaoMap.current.marker) {
        const marker = new window.kakao.maps.Marker({
          position: locPosition,
          image: markerImage,
          map: kakaoMap.current,
        });
        kakaoMap.current.marker = marker;
      } else {
        kakaoMap.current.marker.setPosition(locPosition);
      }

      kakaoMap.current.setCenter(locPosition);
    }
  }, [geolocationInfo]);

  return (
    <div>
      <h2>실시간 위치 추적기</h2>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
      {geolocationInfo.isLoaded ? (
        <div>
          <p>위도: {geolocationInfo.latitude}</p>
          <p>경도: {geolocationInfo.longitude}</p>
        </div>
      ) : (
        <p>위치 로딩 중...</p>
      )}
      {geolocationInfo.error && (
        <p>
          위치 정보를 가져오는 동안 오류 발생: {geolocationInfo.error.message}
        </p>
      )}
    </div>
  );
};

export default LocationTracker;
