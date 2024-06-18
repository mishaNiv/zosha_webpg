import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Contact() {
  return ( 
    <div className="Contact"> 
      <Header />
    </div>
  );
}

function Header() {  
  return (
    <header className='header'>
      <nav>
        <ul>
          <li><Link to="/" activeClassName="active">Zosha 
            <img src="https://static.vecteezy.com/system/resources/thumbnails/015/734/136/small_2x/black-circle-icon-geometry-silhouette-png.png" 
            alt="Logo" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
          </Link></li>
          <li><Link to="/finder" activeClassName="active">Find a College</Link></li>
          <li><Link to="/col-list" activeClassName="active">College List</Link></li>
          <li><Link to="/contact" activeClassName="active" className='selected'>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Contact;