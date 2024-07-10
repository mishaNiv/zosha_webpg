import React, {useContext} from 'react';
import '../App.css';
import { CollegeListContext } from '../CollegeListContext';

const FormattedSearchList = ({ list }) => {
    const { listAdd } = useContext(CollegeListContext);

    const finderSelectHandler = (collegeName) => {
        listAdd(collegeName);
    }

    const parseContent = (text) => {
        if (typeof text !== 'string') {
            console.error("Invalid content format:", text);
            return null;
        }

        const colleges = text.split(';');
        const elements = colleges.map((college, index) => {
            return (
                <div key={index}>
                    <div className='searchResult'>
                        {college}
                        <button className='addButton' onClick={() => finderSelectHandler(college)}></button>
                    </div>
                </div>
            );
        });

        return elements;
    }

    return <div>{parseContent(list)}</div>;
}

const SearchResults = ({ results }) => {

    return (
        <div className='searchResults'>
            <FormattedSearchList list={results}/>
        </div>
    )
}

export default SearchResults;