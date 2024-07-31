import '../App.css';
import { Link } from 'react-router-dom';

function Header({currPage}) {  

  return (
    <header className='header'>
      <nav>
        <ul>
          <li><Link to="/" activeClassName="active" className={currPage === 'Home' ? 'selected' : ''}>Zosha 
            <img src="https://static.vecteezy.com/system/resources/thumbnails/015/734/136/small_2x/black-circle-icon-geometry-silhouette-png.png" 
            alt="Logo" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
          </Link></li>
          <li><Link to="/finder" activeClassName="active" className={currPage === 'Finder' ? 'selected' : ''}>
            Find a College
          </Link></li>
          <li><Link to="/col-list" activeClassName="active" className={currPage === 'ColList' ? 'selected' : ''}>
            College List
          </Link></li>
          <li><Link to="/fyp" activeClassName="active" className={currPage === 'Fyp' ? 'selected' : ''}>
            Explore
          </Link></li>
          <li><Link to="/contact" activeClassName="active" className={currPage === 'Contact' ? 'selected' : ''}>
            Contact
          </Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;