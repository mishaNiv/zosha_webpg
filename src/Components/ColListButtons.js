import '../App.css';
import React, {useContext, useState} from 'react';
import { CollegeListProvider, CollegeListContext } from './CollegeListContext';

function ColListButtons(props) {
    const { collegeList, setCollegeList } = useContext(CollegeListContext);
    const preferences = useState([]);

    const moveItemDown = (index) => {
        if (index == (collegeList.length - 1)) { return; }
        const newList = [...collegeList];
        [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
        setCollegeList(newList);
    }

    const moveItemUp = (index) => {
        if (index == 0) { return; }
        const newList = [...collegeList];
        [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
        setCollegeList(newList);
    }

    const deleteItem = (index) => {
        const newList = collegeList.filter((_, i) => i !== index);
        preferences.push(prompt("Help us help you! \nIn as few words as possible, why did you remove this college?"));
        setCollegeList(newList);
    }

    return (
        <div className='collegeListButtons'>
            <button className='collegeListUp' onClick={() => moveItemUp(props.index)}></button>
            <button className='collegeListDown' onClick={() => moveItemDown(props.index)}></button>
            <button className='collegeListDelete' onClick={() => deleteItem(props.index)}></button>
        </div>
    )
}

export default ColListButtons;