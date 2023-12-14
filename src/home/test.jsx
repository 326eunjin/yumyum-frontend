import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import instance from "./axios";

const YourComponent = () => {
  const [state, setState] = useState({
    center: { lat: 37.4946567, lng: 126.9062257 },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    const apiUrl = `/restaurants/nearby?latitude=${newCenter.lat}&longitude=${newCenter.lng}`;

    const handleGeoLocation = (position) => {
      const newCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setState((prev) => ({ ...prev, center: newCenter, isLoading: false }));

      // Log the updated coordinates to the console
      console.log("Latitude:", newCenter.lat);
      console.log("Longitude:", newCenter.lng);
    };

    // Make a POST request to your Django backend
    instance
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
  }, []);

  const coffeePositions = [
    { lat: 37.499590490909185, lng: 127.0263723554437 },
    { lat: 37.499427948430814, lng: 127.02794423197847 },
    { lat: 37.498553760499505, lng: 127.02882598822454 },
    { lat: 37.497625593121384, lng: 127.02935713582038 },
    { lat: 37.49646391248451, lng: 127.02675574250912 },
    { lat: 37.49629291770947, lng: 127.02587362608637 },
    { lat: 37.49754540521486, lng: 127.02546694890695 },
  ];

  // 편의점 마커가 표시될 좌표 배열입니다
  const storePositions = [
    { lat: 37.497535461505684, lng: 127.02948149502778 },
    { lat: 37.49671536281186, lng: 127.03020491448352 },
    { lat: 37.496201943633714, lng: 127.02959405469642 },
    { lat: 37.49640072567703, lng: 127.02726459882308 },
    { lat: 37.49640098874988, lng: 127.02609983175294 },
    { lat: 37.49932849491523, lng: 127.02935780247945 },
    { lat: 37.49996818951873, lng: 127.02943721562295 },
  ];

  // 주차장 마커가 표시될 좌표 배열입니다
  const carparkPositions = [
    { lat: 37.49966168796031, lng: 127.03007039430118 },
    { lat: 37.499463762912974, lng: 127.0288828824399 },
    { lat: 37.49896834100913, lng: 127.02833986892401 },
    { lat: 37.49893267508434, lng: 127.02673400572665 },
    { lat: 37.49872543597439, lng: 127.02676785815386 },
    { lat: 37.49813096097184, lng: 127.02591949495914 },
    { lat: 37.497680616783086, lng: 127.02518427952202 },
  ];

  const imageSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };

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
        height: "450px",
      }}
      level={3}
    >
      {!state.isLoading && (
        <>
          <MapMarker position={state.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "Are you here?"}
            </div>
          </MapMarker>
          {renderMarkers(coffeePositions, "/images/category_Cafe.png")}
          {renderMarkers(storePositions, "/images/category_Guitar.png")}
          {renderMarkers(carparkPositions, "/images/category_China.png")}
        </>
      )}
    </Map>
  );
};

export default YourComponent;
