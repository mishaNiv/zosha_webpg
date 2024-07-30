import '../App.css';
import React, {useContext} from 'react';
import { CollegeListProvider, CollegeListContext } from '../CollegeListContext';

function UpDownButtons(props) {
    const { collegeList, setCollegeList } = useContext(CollegeListContext);

    const moveItemDown = (index) => {
        if (index == 0) { return; }
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

    return (
        <div className='collegeListButtons'>
            <button className='collegeListUp' onClick={() => moveItemUp(props.index)}></button>
            <button className='collegeListDown' onClick={() => moveItemDown(props.index)}></button>
        </div>
    )
}

export default UpDownButtons;