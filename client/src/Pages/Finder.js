import '../App.css';
import React, {useState} from 'react';
import Header from '../Components/header.js';
import SearchBar from '../Components/searchBar.js';
import SearchResults from '../Components/searchResults.js';

function Finder() {

  const [results, setResults] = useState([]);

  return ( 
    <div className="finder"> 
      <Header currPage="Finder" />
      <SearchBar setResults = {setResults}/>
      <SearchResults results = {results}/>
    </div>
  );
}

export default Finder;