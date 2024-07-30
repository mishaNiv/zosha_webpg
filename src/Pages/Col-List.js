import '../App.css';
import Header from '../Components/Header.js'
import ColListButtons from '../Components/ColListButtons.js'
import React, {useContext} from 'react';
import { CollegeListProvider, CollegeListContext } from '../CollegeListContext';

function ColList() {
  const { collegeList, setCollegeList } = useContext(CollegeListContext);

  return (
    <div className="collistpg">
      <Header currPage="ColList" />
      <p className='collegeTitle'>My College List</p>
      {collegeList.length === 0 ? (
        <p className='emptyMessage'>Your college list is empty. Add some colleges to get started!</p>
      ) : (
        <div className='collegeListBlock'>
          <ul className='collegeList'>
            {collegeList.map((newCollege, index) => (
              <div className='collegeListItem'>
                <li key={index}>{newCollege}</li>
                <ColListButtons index={index}/>
              </div>          
            ))}
          </ul>
          <button className='clearListButton' onClick={() => {setCollegeList([])}}>Clear list</button>
        </div>
      )}
    </div>
  );
}

export default ColList;