import '../App.css';
import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-IeNG9OKxN1QKicEY89eso7sn",
    project: "proj_vfzVdnagUhHybW0Kxgq0GnJt",
    apiKey: 'col-search-api',
    dangerouslyAllowBrowser: true,
});

const SearchBar = ({ setResults }) => {
    const [searchInput, setSearchInput] = useState("");
    const messages = [{"role": "system", "content" : "You are an AI assistant for college searches"}];
    let results = [];

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);  
    };

    const handleKeyDown = (enter) => {
        if (enter.keyCode === 13) {
            fetchData(searchInput);     
        }
    }

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users").then((response) => 
            response.json()).then(json => {
                results = json.filter((user) => {
                    return value && user && user.name && 
                        user.name.toLowerCase().includes(value);
                })  
                setResults(results);             
            });
    }
    
    return (
        <div>
            <div className='searchBar'>
                <input type="text" placeholder="Enter some preferences for your future college" 
                    onChange={handleChange} value={searchInput} onKeyDown={handleKeyDown}/>     
                <FaSearch className="searchIcon"/>   
            </div>
        </div>
    )
}

export default SearchBar;