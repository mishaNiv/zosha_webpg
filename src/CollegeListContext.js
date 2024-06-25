import React, { createContext, useState } from 'react';

// Create the context
export const CollegeListContext = createContext();

// Create a provider component
export const CollegeListProvider = ({ children }) => {
  const [collegeList, setCollegeList] = useState([]);

  const listAdd = (newCollege) => {
    if (!collegeList.includes(newCollege)) {
      setCollegeList((prevList) => [...prevList, newCollege]);
      alert(`${newCollege} added to list`);
    } else {
      alert(`${newCollege} is already in your list`);
    }
  };

  return (
    <CollegeListContext.Provider value={{ collegeList, listAdd }}>
      {children}
    </CollegeListContext.Provider>
  );
};