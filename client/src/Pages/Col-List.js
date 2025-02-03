import '../App.css';
import Header from '../Components/header.js';
import ColListButtons from '../Components/colListButtons.js';
import React, { useContext, useState, useEffect } from 'react';
import { CollegeListContext } from '../Components/collegeListContext.js';

const CollegeSummary = ({ college, top, description }) => {
  return (
    <div className="collegeSummary" style={{ top: `${top}px` }}>
      <div className="collegeSummaryTriangle"></div>
      <h3>{college}</h3>
      <p>{description}</p>
    </div>
  );
};

function ColList() {
  const { collegeList, fetchCollegeList, listClear } = useContext(CollegeListContext);
  const [ openCollegeIndex, setOpenCollegeIndex ] = useState(null);
  const [ summaryTop, setSummaryTop ] = useState(0);
  const [ collegeDescription, setCollegeDescription ] = useState("");

  useEffect(() => {fetchCollegeList()}, []);

  const fetchData = async (college) => {
    if (college.length === 0) return;

    try {
      const response = await fetch('http://localhost:3001/api/generate_desc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ col_name: college })
      });

      const content = await response.json();
      const result = content.result;

      if (typeof result === "string") {
        setCollegeDescription(result);
      } else {
        console.error("Unexpected content format:", result);
        setCollegeDescription("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCollegeDescription("");
    }
  };

  const handleCollegeClick = async (index, college) => {
    if (index === openCollegeIndex) {
      setOpenCollegeIndex(null);
    } else {      
      setOpenCollegeIndex(index);
      setCollegeDescription('Loading...');
      setSummaryTop(index * 40);
      await fetchData(college);
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
                    <CollegeSummary college={newCollege} top={summaryTop} description={collegeDescription} />}
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