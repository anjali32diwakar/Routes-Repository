import { useEffect, useState } from "react";
import { Stops } from "../utils";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  lineSymbol,
} from "react-google-maps";
const RouteMap = (props) => {
  const { route, setViewOnMap } = props;
  const [polyLineCords, setPolyLineCords] = useState([]);
  const [markers, setmarkers] = useState([]);
  useEffect(() => {
    const cordinates = route.stopsList.map((stopId) => {
      const stop = Stops.find((stop) => stop.stopId === stopId);
      return { lat: +stop.latitude, lng: +stop.longitude };
    });
    const routeMarkers = route.stopsList.map((stopId) => {
      const stop = Stops.find((stop) => stop.stopId === stopId);
      return {
        position: { lat: +stop.latitude, lng: +stop.longitude },
        showInfo: true,
        infoContent: stop.stopName,
        stopid: stopId,
      };
    });
    setmarkers(routeMarkers);
    setPolyLineCords(cordinates);
  }, [route]);

  const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap defaultZoom={4} defaultCenter={markers[0].position}>
      {markers.map((marker, index) => (
        <Marker
          key={marker.stopId}
          position={marker.position}
          title=""
          defaultPosition={markers[0].position}
          style={{ height: "20px", width: "20px" , color:'#000'}}
          label= {{text: marker.infoContent, color: "#fff", fontWeight: '500', fontSize: '10px'}}
        />
      ))}
      <Polyline
        options={{
          strokeColor: "#2097e0",
          strokeOpacity: 0.75,
          strokeWeight: 4,
          icons: [
            {
              icon: lineSymbol,
              offset: "0",
              repeat: "20px",
            },
          ],
        }}
        path={polyLineCords}
      />
    </GoogleMap>
  ));
  return (
    <div className="google-map-container">
      <div style={{ height: "10%", textAlign: "center" }}>
        <div className="map-head-label">{`Route :  ${route.name}`}</div>
        <span className="map-close" onClick={() => setViewOnMap(false)}>
          X
        </span>
      </div>
      <MyMapComponent />
    </div>
  );
};
export default RouteMap;
