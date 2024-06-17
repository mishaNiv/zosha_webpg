import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Header from './Header.js'

function Contact() {
  return ( 
      <div className="Contact"> 
          <ContactTitle />
          <Header scrollLimit={163}/>
          <img src="https://wallpapers.com/images/hd/navy-blue-background-bw6vsd28azbphob4.jpg"></img>
      </div>
  );
}

function ContactTitle() {
  return (
    <header className="page_title">
      <h1>Contact</h1>
    </header>
  )
}

export default Contact;