import '../App.css';
import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

const SearchBar = ({ setResults }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        fetchData(searchInput);
    };

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users").then((response) => 
            response.json()).then(json => {
                const results = json.filter((user) => {
                    return value && user && user.name && 
                        user.name.toLowerCase().includes(value);
                })
                setResults(results);
            });
    }   
    
    return (
        <div className='searchBar'>
            <input type="text" placeholder="Enter some preferences for your future college" onChange={handleChange} 
                value={searchInput} />     
            <FaSearch className="searchIcon"/>   
        </div>
    )
}

export default SearchBar;