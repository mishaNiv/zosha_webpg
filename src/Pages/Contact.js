import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'

function Contact() {
  return ( 
    <div className="contact"> 
      <Header currPage="Contact" />
      <About />
    </div>
  );
}

function About() {
  return (
    <div className="aboutus">
      <p>About Us</p>
      <p className='aboutustxt'> Zosha is a platform built to deliver you the best college search experience you could ask for.
        As current college students ourselves, we've been through the struggle of knowing what you want or what you don't want, 
        but being unable to find a good, easy way to use those preferences to create a solid college list. We are using AI-powered
        technology to create the perfect, personalized college list for you, using all your likes and dislikes, no matter how
        specific, vague, or unquantifiable they may be. 
      </p>
    </div>
  )
}

export default Contact;