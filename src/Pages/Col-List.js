import '../App.css';
import Header from '../Components/Header.js';
import ColListButtons from '../Components/ColListButtons.js';
import React, { useContext, useState } from 'react';
import { CollegeListProvider, CollegeListContext } from '../CollegeListContext';
import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-IeNG9OKxN1QKicEY89eso7sn",
    project: "proj_vfzVdnagUhHybW0Kxgq0GnJt",
    apiKey: "dummykey",
    dangerouslyAllowBrowser: true,
});

function ColList() {
  const { collegeList, setCollegeList } = useContext(CollegeListContext);
  const [ openCollegeIndex, setOpenCollegeIndex ] = useState(null);
  const [ summaryTop, setSummaryTop ] = useState(0);
  const [ collegeDescription, setCollegeDescription ] = useState(null);

  const CollegeSummary = ({ index, college, top, description }) => {

    if (index === -1) {
      college = 'Loading...';
      description = null;
    }
    return (
      <div className="collegeSummary" style={{ top: `${top}px` }}>
        <h3>{college}</h3>
        <p>{collegeDescription}</p>
      </div>
    );
  };
  
  async function fetchData(college) {

    if (college.length === 0) {return;}
  
    let messages = [{ role: "system", content: "You are a intelligent assistant for college searches." }];
    messages.push({ role: "user", content: 
        ("Provide a short description, no more than 50 words, of the following college that would be suited for a " + 
          "student deciding whether to apply for said college: " + college)});   
  
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4o",
    });
  
    const content = completion.choices[0].message.content;
  
    if (typeof content === 'string') {
        setCollegeDescription(content);
    } else {
        console.error("Unexpected content format:", content);
        setCollegeDescription("");
    }
  }

  const handleCollegeClick = async (index, college) => {
    if (index === openCollegeIndex) {
      setOpenCollegeIndex(null);
    } else { 
      await fetchData(college);
      setOpenCollegeIndex(index);
      setSummaryTop(index*40);
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
          <p className="nonemptyMessage">Click on colleges to learn more about them and use the buttons to change your list!</p>
          <div className="collegeListBlock">
            <ul className="collegeList">
              {collegeList.map((newCollege, index) => (
                <div className="collegeListItem" key={index}>
                  <li onClick={() => handleCollegeClick(index, newCollege)}>{newCollege}</li>
                  <ColListButtons index={index} />
                  {openCollegeIndex === index && 
                    <CollegeSummary index={index} college={newCollege} top={summaryTop} description={collegeDescription}/>}
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