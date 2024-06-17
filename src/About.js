import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js'


function About() {
  return ( 
    <div className="About"> 
      <AboutTitle />
      <Header scrollLimit={163}/>
      <img src="https://wallpapers.com/images/hd/navy-blue-background-bw6vsd28azbphob4.jpg"></img>
    </div>
  );
}

function AboutTitle() {
  return (
    <header className="page_title">
      <h1>About</h1>
    </header>
  )
}



export default About;