import '../App.css';
import React, { useContext, useState } from 'react';
import { CollegeListContext } from './CollegeListContext';
import { useAPI } from '../Components/APIContext.js';

const FormattedSearchList = ({ list }) => {
    const { listAdd, fetchCollegeList, setCollegeList, collegeList } = useContext(CollegeListContext);
    const [ collegeDescription, setCollegeDescription ] = useState("");
    let col_desc = "";
    const [ description, setDescription ] = useState("");
    const { API } = useAPI();

    const fetchColDesc = async (college) => {
        if (college.length === 0 || !API) return;
    
        let messages = [
          { role: "system", content: "You are an intelligent assistant for college searches." },
          {
            role: "user",
            content: `Provide a short description, no more than 50 words, of the following college that` + 
              `would be suited for a student deciding whether to apply for said college: ${college}`,
          },
        ];
    
        try {
          const completion = await API.chat.completions.create({
            messages: messages,
            model: "gpt-4",
          });
    
          const content = completion.choices[0].message.content;
          if (typeof content === "string") {
            col_desc = content;
          } else {
            console.error("Unexpected content format:", content);
            col_desc = "";
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          col_desc = "";
        }
    };

    const finderSelectHandler = async (collegeName) => {
        await fetchColDesc(collegeName);
        listAdd(collegeName, col_desc);
        fetchCollegeList();
    }

    const parseContent = (text) => {
        const colleges = text.split(';');
        const elements = colleges.map((college, index) => {
            let isInList = collegeList.includes(college);
            return (
                <div key={index}>
                    <div className='searchResult'>
                        {college}
                        <button className={isInList ? 'addedButton' : 'addButton'} 
                            onClick={() => {finderSelectHandler(college); fetchCollegeList();}} disabled={isInList}>    
                        </button>
                    </div>
                </div>
            );
        });

        return elements;
    }

    return <div>{parseContent(list)}</div>;
}

const SearchResults = ({ results }) => {

    if (typeof results !== 'string') {
        console.error("Invalid content format:", results);
        return null;
    }

    if (!results.includes(';')) {
        return (
            <div className='preferencesRequest'>{results + " Please enter these preferences in addition to your original search."}</div>
        )
    }

    return (
        <div className='searchResults'>
            <FormattedSearchList list={results}/>
        </div>
    )
}

export default SearchResults;