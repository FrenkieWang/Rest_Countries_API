import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkCard from './LinkCard';

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
          Search Keyword:  <span style = {{color:'blue'}}>&nbsp;&nbsp;{searchTerm}</span>
          Selected Option:  <span style = {{color:'blue'}}>{selectedContinent}</span>
        </h3>
  
        <h3>Type your search keyword here: </h3>
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" />

        <h3>Select the Countinent</h3>  
        <select value={selectedContinent} onChange={(e) => setSelectedContinent(e.target.value)}>
          <option value="">All</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Oceania">Oceania</option>
        </select>      
  
        <div style={styles.container}>
          {data.filter(countryFilterFunction(searchTerm)).map((item, index) => 
            <LinkCard key={index} data={item} />
          )}
        </div>
      </div>
    );
  }

  const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
};      

export default HomePage;