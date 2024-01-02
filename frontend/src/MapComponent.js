import React,{useEffect, useState} from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

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

const containerStyle = {
  width: '400px',
  height: '400px'
};

export default MyMapComponent;