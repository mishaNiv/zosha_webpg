import '../App.css';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import React, {useContext} from 'react';
import { CollegeListProvider, CollegeListContext } from '../CollegeListContext';

function Home() {
  return ( 
    <div className="Home"> 
      <Header currPage="Home" />
      <FinderPgSnip />
    </div>
  );
}

function FinderPgSnip() {

  const { collegeList } = useContext(CollegeListContext);
  return (
    <div className='homepagesnippets'>
      <div className='exploresnippet'>
        <p className='exploresniptext'>Recommended colleges</p>
        <Link to="/fyp" activeClassName="active">
            <button className='exploresnipbutton'>Explore more recommended colleges</button>
        </Link>
      </div>
      <div className='explorewidgets'>Widgets go here</div>
      <div className='findersnippet'>
        <p className='findersniptext'>Find your perfect college by entering your preferences into an AI-powered search bar!</p>
        <Link to="/finder" activeClassName="active">
          <button className='findersnipbutton'>Go to college search bar</button>
        </Link>
      </div>
      <div className='collistsnippet'>
        <p className='collistsniptext'>Your college list</p>
        <Link to="/col-list" activeClassName="active">
          <button className='collistsnipbutton'>See full college list</button>
        </Link>
      </div>
      <ul className='collistsnip'>
        {collegeList.slice(0, 3).map((newCollege, index) => (
          <li key={index}>{newCollege}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home;
