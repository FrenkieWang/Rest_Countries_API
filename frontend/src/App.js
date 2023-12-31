// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Brief from './Brief';
import MapComponent from './MapComponent'; 
import { BrowserRouter as
  Router, Routes, Route, Link } from "react-router-dom";

function HomePage(){
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all') 
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function onSearchFormChange(event) {
    setSearchTerm(event.target.value);
  }

  function onSelectContinentchange(event) {
    setSelectedContinent(event.target.value);
  }
  
  function countryFilterFunction(searchTerm) {
    return function (countryObject) {
      let commonName = countryObject.name.common.toLowerCase();
      let region = countryObject.region.toLowerCase();
      return (        
          commonName.includes(searchTerm.toLowerCase())    
          && region.includes(selectedContinent.toLowerCase())
      );
    };
  }

  return(
    <div>
      <h1>Bonuce Insights Challenge</h1>
      <h3> 
        Search Keyword:  {searchTerm} &nbsp;&nbsp;
        Selected Option:  {selectedContinent}
      </h3>

      <form>
        <h3>Type your search here: </h3>
        <input onChange={onSearchFormChange} type="text" />
      </form>

      <select value={selectedContinent} onChange={onSelectContinentchange}>
        <option value="">All</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Antarctic">Antarctic</option>
        <option value="Oceania">Oceania</option>
      </select>
      

      <div style={styles.container}>
        {data.filter(countryFilterFunction(searchTerm)).map((item, index) => <Brief key={index} data={item} />)}
      </div>
    </div>
  );
}

const App = () => {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/country/:name" element={<Card />} />
        </Routes>
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
};

export default App;