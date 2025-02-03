import '../App.css';
import React, {useContext} from 'react';
import { CollegeListContext } from './collegeListContext';

const FormattedSearchList = ({ list }) => {
    const { listAdd, fetchCollegeList, setCollegeList, collegeList } = useContext(CollegeListContext);

    const finderSelectHandler = (collegeName) => {
        listAdd(collegeName);        
        setCollegeList((prevList) => [...prevList, collegeName]);
        fetchCollegeList();
    }

    const parseContent = (text) => {
        const colleges = text.split(';');
        const elements = colleges.map((college, index) => {
            const isInList = collegeList.includes(college);
            return (
                <div key={index}>
                    <div className='searchResult'>
                        {college}
                        <button className={isInList ? 'addedButton' : 'addButton'} 
                            onClick={() => finderSelectHandler(college)} disabled={isInList}>    
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