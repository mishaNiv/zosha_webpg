import React, {useContext} from 'react';
import '../App.css';
import { CollegeListContext } from '../CollegeListContext';

const SearchResults = ({ results }) => {

    const { listAdd } = useContext(CollegeListContext);

    const finderSelectHandler = (collegeName) => {
        alert(`${collegeName} added to list`);
        listAdd(collegeName);
    }

    return (
        <div className='searchResults'>
            {
                results.map((result, id) => {
                    return <div className='searchResult' key={id} 
                            onClick={() => finderSelectHandler(result.name)}>
                        {result.name}
                    </div>
                })
            }
        </div>
    )
}

export default SearchResults;