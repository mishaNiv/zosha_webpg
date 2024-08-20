import '../App.css';
import React, { useContext, useState, useEffect } from 'react';
import { CollegeListProvider, CollegeListContext } from './CollegeListContext';

function ColListButtons(props) {
    const { collegeList, setCollegeList, fetchCollegeList, listSwap, listRemove } = useContext(CollegeListContext);
    const preferences = useState([]);

    const moveItemDown = async (index) => {
        if (index == 0) { return; }
        await listSwap(collegeList[index], collegeList[index + 1]);
        fetchCollegeList();
    }

    const moveItemUp = async (index) => {
        if (index == 0) { return; }
        await listSwap(collegeList[index], collegeList[index - 1]);
        fetchCollegeList();
    }

    const deleteItem = async (index) => {
        await listRemove(collegeList[index]);
        fetchCollegeList();
        window.location.reload();
    }

    return (
        <div className='collegeListButtons'>
            <button className='collegeListUp' onClick={() => moveItemUp(props.index)}></button>
            <button className='collegeListDown' onClick={() => moveItemDown(props.index)}></button>
            <button className='collegeListDelete' onClick={() => {
                deleteItem(props.index);
                window.location.reload();
            }}></button>
        </div>
    )
}

export default ColListButtons;