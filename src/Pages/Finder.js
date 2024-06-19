import '../App.css';
import React, {useState} from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import SearchResults from '../Components/SearchResults';

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