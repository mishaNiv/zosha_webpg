import '../App.css';
import Header from '../Components/Header.js';
import ColListButtons from '../Components/ColListButtons.js';
import React, { useContext, useState } from 'react';
import { CollegeListContext } from '../Components/CollegeListContext.js';
import { useAPI } from '../Components/APIContext.js';

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
  const { collegeList, setCollegeList } = useContext(CollegeListContext);
  const [ openCollegeIndex, setOpenCollegeIndex ] = useState(null);
  const [ summaryTop, setSummaryTop ] = useState(0);
  const [ collegeDescription, setCollegeDescription ] = useState("");
  const { API } = useAPI();

  const fetchData = async (college) => {
    if (college.length === 0 || !API) return;

    let messages = [
      { role: "system", content: "You are an intelligent assistant for college searches." },
      {
        role: "user",
        content: `Provide a short description, no more than 50 words, of the following college that` + 
          `would be suited for a student deciding whether to apply for said college: ${college}`,
      },
    ];

    try {
      const completion = await API.chat.completions.create({
        messages: messages,
        model: "gpt-4",
      });

      const content = completion.choices[0].message.content;
      if (typeof content === "string") {
        setCollegeDescription(content);
      } else {
        console.error("Unexpected content format:", content);
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
            <button className="clearListButton" onClick={() => { setCollegeList([]) }}>Clear list</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColList;