import React,{useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function MyMapComponent (props) {
  const [latLng, setLatLng] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/resolve-map-url?url=${props.mapUrl}`)
        .then(response => response.json())
        .then(data => setLatLng(data))
        .catch(error => console.error('Error:', error));
  }, [props.mapUrl]);

  
  return(
    <LoadScript googleMapsApiKey="AIzaSyDA-IwlortvMyFA8lH9_kQOdbhj1aBNCHM">
      <GoogleMap mapContainerStyle={containerStyle} center={latLng} zoom={5}>
          <Marker position={latLng} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMapComponent;
// npm install --force --save @react-google-maps/api
// 'AIzaSyDA-IwlortvMyFA8lH9_kQOdbhj1aBNCHM'