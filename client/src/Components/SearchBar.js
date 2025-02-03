import '../App.css';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ setResults }) => {
    const [ placeHolderText, setPlaceHolder ] = useState("Enter your college preferences here");
    const [ searchInput, setSearchInput ] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);  
    };

    const handleKeyDown = (enter) => {
        if (enter.keyCode === 13) {  
            setSearchInput('');          
            setPlaceHolder("Loading...");
            fetchData(searchInput); 
        }
    }

    const handleClick = (ev) => {
        setSearchInput('');          
        setPlaceHolder("Loading...");
        fetchData(searchInput);
    }
    
    async function fetchData(value) {
        if (value.length === 0) {return;}

        try {
            const response = await fetch('http://localhost:3001/api/generate_results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ preferences: value })
            });

            const content = await response.json();
            const result = content.result;

            if (response.ok && typeof result === 'string') {
                setResults(result);
            } else {
                console.error("Unexpected content format:", result);
                setResults("");
            }    
        } catch (error) {
            console.error("Error generating search results: ", error);
            setResults("");
        }

        
        setPlaceHolder("");
    }
    
    return (
        <div>
            <div className='searchBar'>
                <input type="text" placeholder={placeHolderText}
                    onChange={handleChange} value={searchInput} onKeyDown={handleKeyDown}/>     
                <FaSearch className="searchIcon" onClick={handleClick}/>   
            </div>
        </div>
    )
}

export default SearchBar;
