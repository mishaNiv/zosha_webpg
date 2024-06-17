import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Header from './Header.js'

function Home() {
  return ( 
    <div className="Home"> 
      <Title />
      <Header scrollLimit={219}/>
      <img src="https://wallpapers.com/images/hd/navy-blue-background-bw6vsd28azbphob4.jpg"></img>
    </div>
  );
}

function Title() {
  return (
    <header className="title">
      <h1>Life Through Poems</h1>
      <p class="subtitle">An Exploration into the Beauty and Tragedy of Life Through Poetry</p>
    </header>
  )
}

export default Home;
