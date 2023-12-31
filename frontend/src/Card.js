// Card.js
import React, {useState, useEffect} from 'react';
import './styles.css';
import MapComponent from './MapComponent'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { BrowserRouter as
  Router, Routes, Route, Link } from "react-router-dom";

function Card({}) {
  let { name } = useParams(); 

  const [data, setData] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const [countryObject, setCountryObject] = useState({});

  const URL = `https://restcountries.com/v3.1/name/${name}`;

  function countrySelect(searchTerm) {
    return function (countryObject) {
      let commonName = countryObject.name.common.toLowerCase();
      return (        
          commonName == searchTerm.toLowerCase()    
      );
    };
  }

  useEffect(() => {
    axios.get(URL) 
      .then(response => {
        setData(response.data);
        console.log("response data");
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));  
  }, [URL]);

  function showCountryDetail(){
    setShowCountry(!showCountry);
    const selectedCountry = data.filter(countrySelect(name));
    setCountryObject(selectedCountry[0]);  
  }

  return (
    <div style={styles.card}>
      <h1>Country: {name}</h1>
      <button onClick={()=> showCountryDetail()}>Show Country Detail</button>
      <br/>
      <b>Still Loading? Try to refresh then click ShowCountryDetail again!</b>
      <button onClick={()=> window.location.reload()}>Refresh Map</button>


      {showCountry &&
       <div>
        <p>Common Name: <span className="red-bold-text">{countryObject.name.common}</span></p> 
        <p>Official Name: <span className="red-bold-text">{countryObject.name.official}</span></p>  
        <p>Capital: <span className="red-bold-text">{countryObject.capital}</span></p>
        <p>Region: <span className="red-bold-text">{countryObject.region}</span></p>      
        <p>Area: <span className="red-bold-text">{countryObject.area} km&sup2;</span></p>  
        <p>Population: <span className="red-bold-text">{countryObject.population}</span></p>  
        <MapComponent apiKey="AIzaSyDA-IwlortvMyFA8lH9_kQOdbhj1aBNCHM" mapUrl={countryObject.maps.googleMaps} />  
      </div>
      }     
      <br/><Link to= {`/`}>Go Back to HomePage</Link>  

    </div>
  );
}

const styles = {
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    padding: '20px',
    margin: '20px',
    borderRadius: '5px',
    // 可以添加更多的样式
  }
};

export default Card;