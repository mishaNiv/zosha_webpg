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
        <div key={id}>
            <div className='searchResult'>{result.name}
            <button className='addButton' onClick={() => finderSelectHandler(result.name)}></button>
            </div>                            
        </div>
    );
}

export default SearchResults;