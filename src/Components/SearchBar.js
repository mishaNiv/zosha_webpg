import '../App.css';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useAPI } from '../Components/APIContext.js'

const SearchBar = ({ setResults }) => {
    const [ placeHolderText, setPlaceHolder ] = useState("Enter your college preferences here");
    const [ searchInput, setSearchInput ] = useState("");
    const { API } = useAPI();
    const messages = [{"role": "system", "content" : "You are an AI assistant for college searches"}];
    let results = [];

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

        let messages = [{ role: "system", content: "You are a intelligent assistant for college searches." }];
        messages.push({ role: "user", content: 
            ("Take the following preferences and return a long semicolon separated list of " +
                "colleges that fit them (ordered by best fit), include absolutely no descriptions. If the " +
                "preferences entered are not understandable words, ask again for preferences. If location preferences " + 
                "aren't included, assume the location is the United States of America, and do NOT number the colleges " + 
                "(including the first one) " + value)});   

        const completion = await API.chat.completions.create({
            messages: messages,
            model: "gpt-4o",
        });

        const content = completion.choices[0].message.content;

        if (typeof content === 'string') {
            setResults(content);
        } else {
            console.error("Unexpected content format:", content);
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
