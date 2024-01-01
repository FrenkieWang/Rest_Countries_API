import React,{useEffect, useState} from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function MyMapComponent (props) {
  const [latLng, setLatLng] = useState(null);

  useEffect(() => {
    fetch(`https://rest-countries-api-backend.vercel.app/api/resolve-map-url?url=${props.mapUrl}`)
        .then(response => response.json())
        .then(data => setLatLng(data))
        .catch(error => console.error('Error:', error));
  }, [props.mapUrl]);

  
  return(
    <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      {latLng && (
        <GoogleMap mapContainerStyle={containerStyle} center={latLng} zoom={5}>
          <Marker position={latLng} />
        </GoogleMap>
      )}
    </LoadScriptNext>
  );
}

export default MyMapComponent;

// 以 REACT_APP_ 开头的环境变量名是必须的，因为 Create React App 只会将这些环境变量嵌入到客户端 JavaScript 中。
// npm install --force --save @react-google-maps/api

// fetch(`http://localhost:5000/api/resolve-map-url?url=${props.mapUrl}`)
// Change [localhost:5000] into [deployed backend server]
// Backend Server" rest-countries-api-backend.vercel.app
