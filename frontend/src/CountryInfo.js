import React, {useState, useEffect} from 'react';
import MapComponent from './MapComponent'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Link } from "react-router-dom";

function CountryInfo({}) {
  let { name } = useParams(); 
  const URL = `https://restcountries.com/v3.1/name/${name}`;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(URL) 
      .then(response => {
        console.log(response.data, "response data");
        setCountries(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [URL]);

  return (
    <div style={styles.card}>
      <h1>Country: {name}</h1>

      { countries.length !== 0 &&
        countries.map((countryObject, index) => 
          <div key={index}>            
            <p>Common Name: <span style={TextStyle}>{countryObject.name.common}</span></p> 
            <p>Official Name: <span style={TextStyle}>{countryObject.name.official}</span></p>  
            <p>Capital: <span style={TextStyle}>{countryObject.capital}</span></p>
            <p>Region: <span style={TextStyle}>{countryObject.region}</span></p>      
            <p>Area: <span style={TextStyle}>{countryObject.area} km&sup2;</span></p>  
            <p>Population: <span style={TextStyle}>{countryObject.population}</span></p>  
            <MapComponent apiKey="AIzaSyDA-IwlortvMyFA8lH9_kQOdbhj1aBNCHM" mapUrl={countryObject.maps.googleMaps} />  
          </div>
        )
      }     
      <br/><Link to= {`/`}>Go Back to HomePage</Link>  

    </div>
  );
}

const TextStyle = {
  fontWeight: 'bold',
  color : 'blue'
};

const styles = {
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    padding: '20px',
    margin: '20px',
    borderRadius: '5px',
  }
};

export default CountryInfo;