import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import instance from "./axios";

const YourComponent = () => {
  const [state, setState] = useState({
    center: { lat: 37.4946567, lng: 126.9062257 },
    errMsg: null,
    isLoading: true,
    GuitarPositions: [], // 0
    KoreanPositions: [], // 100
    JapanesePositions: [], // 200
    ChinesePositions: [], // 300
    WesternPositions: [], //400
    BarPositions: [],
    FastPositions: [],
    InstantPositions: [],
    CafePositions: [], // 800
  });

  const [fetchedData, setFetchedData] = useState(false); // 플래그 변수

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

      // Clean up the watchPosition when the component unmounts
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
      console.error("위치를 가져오는 중 에러 발생:", error);
      setState((prev) => ({
        ...prev,
        errMsg: "위치를 가져오는 중 에러 발생",
        isLoading: false,
      }));
    }
  };

  const imageSize = { width: 32, height: 36 };

  const renderMarkers = (positions, markerImageSrc) =>
    positions.map((position) => (
      <MapMarker
        key={`${position.lat},${position.lng}`}
        position={position}
        image={{
          src: markerImageSrc,
          size: imageSize,
        }}
      />
    ));

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
            renderMarkers(state.GuitarPositions, "/images/category_Guitar.png")}
          {Array.isArray(state.KoreanPositions) &&
            renderMarkers(state.KoreanPositions, "/images/category_Korea.png")}
          {Array.isArray(state.ChinesePositions) &&
            renderMarkers(state.ChinesePositions, "/images/category_China.png")}
          {Array.isArray(state.JapanesePositions) &&
            renderMarkers(
              state.JapanesePositions,
              "/images/category_Japan.png"
            )}
          {Array.isArray(state.WesternPositions) &&
            renderMarkers(
              state.WesternPositions,
              "/images/category_Western.png"
            )}
          {Array.isArray(state.BarPositions) &&
            renderMarkers(state.BarPositions, "/images/category_Beer.png")}
          {Array.isArray(state.FastPositions) &&
            renderMarkers(state.FastPositions, "/images/category_FastFood.png")}
          {Array.isArray(state.InstantPositions) &&
            renderMarkers(
              state.InstantPositions,
              "/images/category_Instant.png"
            )}
          {Array.isArray(state.CafePositions) &&
            renderMarkers(state.CafePositions, "/images/category_Cafe.png")}
        </>
      )}
    </Map>
  );
};

export default YourComponent;
