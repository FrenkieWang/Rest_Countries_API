import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinkCard from './LinkCard';

function HomePage(){
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');
  
    useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all') 
        .then(response => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    function handleLetterClick (letter) {
      setSelectedLetter(letter);
    }

    function sortCountryNameAsc(countryA, countryB) {
      let comparison = 0;
  
      if (countryA.name.common < countryB.name.common) comparison = -1;
      else if (countryA.name.common > countryB.name.common) comparison = 1;
      else comparison = 0;
  
      return comparison;
    }
    
    function FilterCountriesbyTerms(searchTerm) {
      return function (countryObject) {
        let commonName = countryObject.name.common.toLowerCase();
        let region = countryObject.region.toLowerCase();
        return (        
            commonName.includes(searchTerm.toLowerCase())    
            && region.includes(selectedContinent.toLowerCase())
        );
      };
    }
    
    function FilterCountriesByLetter(selectedLetter){
      return function (countryObject) {
        if(selectedLetter === ''){
          return true;
        } 
        else{
          return countryObject.name.common
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .startsWith(selectedLetter);
        }
      }
    }   
  
    return(
      <div>
        <h1>Bonuce Insights Challenge</h1>
        <h3> 
          Search Keyword: <span style = {{color:'blue'}}>&nbsp;{searchTerm}&nbsp;</span>
          Selected Option: <span style = {{color:'blue'}}>&nbsp;{selectedContinent}&nbsp;</span>
          Selected Letter: <span style = {{color:'blue'}}>&nbsp;{selectedLetter}&nbsp;</span>
        </h3>
  
        <h3>Type your search keyword here: </h3>
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" />

        <h3>Select the Continent</h3>  
        <select value={selectedContinent} onChange={(e) => setSelectedContinent(e.target.value)}>
          <option value="">All</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Oceania">Oceania</option>
        </select>      

        <h3>Select by the Capital:</h3>  
        <div>
          {/* Show All Countries */}
          <button onClick={() => handleLetterClick('')}>All</button>
          {/* A - Z */}
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
            <button key={letter} onClick={() => handleLetterClick(letter)}>
              {letter}
            </button>
          ))}
        </div>
  
        <div style={styles.container}>
          {data.filter(FilterCountriesbyTerms(searchTerm))
            .filter(FilterCountriesByLetter(selectedLetter))
            .sort(sortCountryNameAsc)
            .map((item, index) => 
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