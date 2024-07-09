import '../App.css';
import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-IeNG9OKxN1QKicEY89eso7sn",
    project: "proj_vfzVdnagUhHybW0Kxgq0GnJt",
    apiKey: "dummy-key",
    dangerouslyAllowBrowser: true,
});

const SearchBar = ({ setResults }) => {
    const [placeHolderText, setPlaceHolder] = useState("Enter your college preferences here");
    const [searchInput, setSearchInput] = useState("");
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
        messages.push({ role: "user", content: value});   

        const completion = await openai.chat.completions.create({
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