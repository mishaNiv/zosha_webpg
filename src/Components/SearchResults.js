import React, {useContext} from 'react';
import '../App.css';
import { CollegeListContext } from '../CollegeListContext';

const FormattedContent = ({ content }) => {
    const parseContent = (text) => {
        if (typeof text !== 'string') {
            console.error("Invalid content format:", text);
            return null;
        }

        const lines = text.split('\n');
        const elements = lines.map((line, index) => {
            if (line.startsWith('###')) {
                return <br key={index} />;
            } else if (line.includes('**')) {
                const boldParts = line.split('**').map((part, i) => {
                    return i % 2 === 1 ? <strong key={i}>{part}</strong> : part;
                });
                return <p key={index}>{boldParts}</p>;
            } else if (line.startsWith('-')) {
                return <li key={index}>{line.replace(/^- /, '')}</li>;
            } else {
                return <p key={index}>{line}</p>;
            }
        });
        return elements;
    };

    return <div>{parseContent(content)}</div>;
};

const SearchResults = ({ results }) => {

    const { listAdd } = useContext(CollegeListContext);

    const finderSelectHandler = (collegeName) => {
        listAdd(collegeName);
    }

    return (
        <div className='searchResults'>
            {
                /*results.map((result, id) => {
                    return (
                        <div key={id}>
                            <div className='searchResult'>{result.name}
                            <button className='addButton' onClick={() => finderSelectHandler(result.name)}></button>
                            </div>                            
                        </div>
                    );
                })*/

                <FormattedContent content={results}/>
            }
        </div>
    )
}

export default SearchResults;