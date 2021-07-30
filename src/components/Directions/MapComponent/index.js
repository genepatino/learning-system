import React, { useRef } from "react";
import GoogleMapReact from "google-map-react";
import apiUrl from "../../utility/constantes/apiUrl";

const MapComponent = () => {
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const mapsRef = useRef(null);

  const labels = {
    start: "A",
    end: "B",
  };

  const myLatLngCenter = { lat: 4.711244524892926, lng: -74.07348373567048 };
  const myLatLngOrigin = { lat: 4.69302, lng: -74.02926 };
  const myLatLngDestination = {
    lat: 4.733003647831512,
    lng: -74.0661852300244,
  };

  const initMap = (map, maps) => {
    mapsRef.current = maps;
    new mapsRef.current.Marker({
      position: myLatLngDestination,
      map,
      label: labels.start,
    });
    new mapsRef.current.Marker({
      position: myLatLngOrigin,
      map,
      label: labels.end,
    });

    directionsService.current = new mapsRef.current.DirectionsService();
    directionsRenderer.current = new mapsRef.current.DirectionsRenderer();

    calcRoute();
  };

  const calcRoute = () => {
    var start = myLatLngOrigin;
    var end = myLatLngDestination;
    var request = {
      origin: start,
      destination: end,
      travelMode: "DRIVING",
    };
    directionsService.current.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.current.setDirections(result);
      }
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiUrl.apiUrlGoogleMap }}
        center={myLatLngCenter}
        zoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => initMap(map, maps)}
      ></GoogleMapReact>
    </div>
  );
};

export default MapComponent;
