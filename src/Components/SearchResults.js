import React, {useContext} from 'react';
import '../App.css';
import { CollegeListContext } from '../CollegeListContext';
import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-IeNG9OKxN1QKicEY89eso7sn",
    project: "proj_vfzVdnagUhHybW0Kxgq0GnJt",
    apiKey: "col-search-api",
    dangerouslyAllowBrowser: true,
});

const SearchResults = ({ results }) => {

    const { listAdd } = useContext(CollegeListContext);

    const finderSelectHandler = (collegeName) => {
        listAdd(collegeName);
    }

    return (
        <div className='searchResults'>
            {
                results.map((result, id) => {
                    return (
                        <div key={id}>
                            <div className='searchResult'>{result.name}
                            <button className='addButton' onClick={() => finderSelectHandler(result.name)}></button>
                            </div>                            
                        </div>
                    );
                })
            }
        </div>
    )
}

export default SearchResults;