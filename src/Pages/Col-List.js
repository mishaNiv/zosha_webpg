import '../App.css';
import Header from '../Components/Header.js'
import UpDownButtons from '../Components/UpDownButtons.js'
import React, {useContext} from 'react';
import { CollegeListProvider, CollegeListContext } from '../CollegeListContext';

function ColList() {
  const { collegeList } = useContext(CollegeListContext);

  return (
    <div className="collistpg">
      <Header currPage="ColList" />
      <p className='collegeTitle'>My College List</p>
      {collegeList.length === 0 ? (
        <p className='emptyMessage'>Your college list is empty. Add some colleges to get started!</p>
      ) : (
        <ul className='collegeList'>
          {collegeList.map((newCollege, index) => (
            <div className='collegeListItem'>
              <li key={index}>{newCollege}</li>
              <UpDownButtons index={index}/>
            </div>          
          ))}
        </ul>
      )}
    </div>
  );
}

export default ColList;