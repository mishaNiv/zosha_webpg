import React, { createContext, useState, useEffect } from 'react';
import axios, * as others from 'axios';

// Create the context
export const CollegeListContext = createContext();

// Create a provider component
export const CollegeListProvider = ({ children }) => {
  const [collegeList, setCollegeList] = useState([]);

  useEffect(() => {
    const fetchCollegeList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/selected_colleges");
        const data = response.data;
        setCollegeList((data.map(row => row.college_name)));
      } catch (error) {
        console.error('Error fetching college list from database: ', error);
      }
    };
    
    fetchCollegeList();  
  }, []);

  const listAdd = async (newCollege) => {
    if (!collegeList.includes(newCollege)) {
      try {
        const payload = { college_name: newCollege };
        await axios.post("http://localhost:3001/selected_colleges", payload);
        setCollegeList((prevList) => [...prevList, newCollege]);
      } catch (error) {
        console.error('Error adding college to list: ', error);
      }
    }
  };
  
  return (
    <CollegeListContext.Provider value={{ collegeList, setCollegeList, listAdd }}>
      {children}
    </CollegeListContext.Provider>
  );
};