import '../App.css';
import React, {useContext} from 'react';
import { CollegeListContext } from '../CollegeListContext';

const FormattedSearchList = ({ list }) => {
    const { listAdd } = useContext(CollegeListContext);

    const finderSelectHandler = (collegeName) => {
        listAdd(collegeName);
    }

    const parseContent = (text) => {
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

    if (typeof results !== 'string') {
        console.error("Invalid content format:", results);
        return null;
    }

    if (!results.includes(';')) {
        return (
            <div className='preferencesRequest'>{results}</div>
        )
    }

    return (
        <div className='searchResults'>
            <FormattedSearchList list={results}/>
        </div>
    )
}

export default SearchResults;