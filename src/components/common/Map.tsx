/*Since the map was loaded on client side, we need to make this component client rendered as well*/
"use client";

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "600px",
  // borderRadius: "15px 0px 0px 15px",
};

//K2's coordinates
const defaultMapCenter = {
  lat: 36.19980587168142,
  lng: 37.16299669311489,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 15;

//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "terrain",
};

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </div>
  );
};

export default MapComponent;
