import React, { createContext, useState, useEffect } from 'react';
import axios, * as others from 'axios';

// Create the context
export const CollegeListContext = createContext();

// Create a provider component
export const CollegeListProvider = ({ children }) => {
  const [collegeList, setCollegeList] = useState([]);

  const fetchCollegeList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/selected_colleges");
      const data = response.data;
      const sortedData = data.sort((a, b) => Number(a.college_rank) - Number(b.college_rank));
      setCollegeList(sortedData.map(row => row.college_name));
    } catch (error) {
      console.error('Error fetching college list from database: ', error);
    }
  };

  useEffect(() => {fetchCollegeList()}, []);

  const listAdd = async (newCollege) => {
    if (!collegeList.includes(newCollege)) {
      try {
        const payload = { college_name: newCollege };
        await axios.post("http://localhost:3001/selected_colleges", payload);
      } catch (error) {
        console.error('Error adding college to list: ', error);
      }
    }
  };

  const listRemove = async (collegeToRemove) => {
    if (collegeList.includes(collegeToRemove)) {
      try {
        await axios.delete("http://localhost:3001/selected_colleges/" + collegeToRemove);
      } catch (error) {
        console.error('Error removing college from list :', error);
      }
    }
  }

  const listSwap = async (firstCollege, secondCollege) => {
    try {
      await axios.post('http://localhost:3001/swap_colleges', { firstCollege, secondCollege });
    } catch (error) {
      console.error("Error swapping colleges in list: ", error);
    }
  }

  const listClear = async () => {
    try {
      await axios.delete("http://localhost:3001/selected_colleges");
    } catch (error) {
      console.error('Error clearning list: ', error);
    }
  }
  
  return (
    <CollegeListContext.Provider value={{ collegeList, listAdd, fetchCollegeList, listSwap, listRemove, listClear, setCollegeList }}>
      {children}
    </CollegeListContext.Provider>
  );
};