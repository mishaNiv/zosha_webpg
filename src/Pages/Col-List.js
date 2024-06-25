import '../App.css';
import Header from '../Components/Header.js'
import React, {useContext} from 'react';
import { CollegeListProvider, CollegeListContext } from '../CollegeListContext';

function ColList() {
  const { collegeList } = useContext(CollegeListContext);

  return (
    <div className="collistpg">
      <Header currPage="ColList" />
      <p className='collegeTitle'>My College List</p>
      <ul className='collegeList'>
        {collegeList.map((newCollege, index) => (
          <li key={index}>{newCollege}</li>
        ))}
      </ul>
    </div>
  );
}

export default ColList;