import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk"; // replace 'your-map-library' with the actual library you are using

function YourComponent() {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setState((prev) => ({
            ...prev,
            center: newCenter,
            isLoading: false,
          }));

          // Log the updated coordinates to the console
          console.log("Latitude:", newCenter.lat);
          console.log("Longitude:", newCenter.lng);
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );

      // Clean up the watchPosition when the component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <div>
        <p id="latitude">Latitude: {state.center.lat}</p>
        <p id="longitude">Longitude: {state.center.lng}</p>
      </div>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        {!state.isLoading && (
          <MapMarker position={state.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
            </div>
          </MapMarker>
        )}
      </Map>
    </>
  );
}

export default YourComponent;
