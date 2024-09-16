import '../App.css';
import Header from '../Components/Header.js';
import ColListButtons from '../Components/ColListButtons.js';
import React, { useContext, useState, useEffect } from 'react';
import { CollegeListContext } from '../Components/CollegeListContext.js';
import { useAPI } from '../Components/APIContext.js';

const CollegeSummary = ({ college, top, desc }) => {
  return (
    <div className="collegeSummary" style={{ top: `${top}px` }}>
      <div className="collegeSummaryTriangle"></div>
      <h3>{college}</h3>
      <p>{desc}</p>
    </div>
  );
};

function ColList() {
  const { collegeList, setCollegeList, fetchCollegeList, listClear, getDesc, description } = useContext(CollegeListContext);
  const [ openCollegeIndex, setOpenCollegeIndex ] = useState(null);
  const [ summaryTop, setSummaryTop ] = useState(0);
  const { API } = useAPI();

  useEffect(() => {fetchCollegeList(); fetchCollegeList(); }, []);

  const handleCollegeClick = async (index, college) => {
    if (index === openCollegeIndex) {
      setOpenCollegeIndex(null);
    } else {      
      setOpenCollegeIndex(index);
      setSummaryTop(index * 40);
      await getDesc(college);
    }
  };

  const handleClearClick = () => {
    listClear();
    window.location.reload();
  }

  return (
    <div className="collistpg">
      <Header currPage="ColList" />
      <p className="collegeTitle">My College List</p>
      {collegeList.length === 0 ? (
        <p className="emptyMessage">Your college list is empty. Add some colleges to get started!</p>
      ) : (
        <div>
          <p className="nonemptyMessage">
            Click on colleges to learn more about them and use the buttons to change your list!
          </p>
          <div className="collegeListBlock">
            <ul className="collegeList">
              {collegeList.map((newCollege, index) => (
                <div className="collegeListItem" key={index}>
                  <li onClick={() => handleCollegeClick(index, newCollege)}>{newCollege}</li>
                  <ColListButtons index={index} />
                  {openCollegeIndex === index && 
                    <CollegeSummary college={newCollege} top={summaryTop} desc={description} />}
                </div>
              ))}
            </ul>
            <button className="clearListButton" onClick={() => { handleClearClick() }}>Clear list</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColList;