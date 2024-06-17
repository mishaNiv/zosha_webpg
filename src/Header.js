import { useEffect, useState } from 'react';
import './components.css';
import { Link } from 'react-router-dom';

function Header({ scrollLimit }) {
    const [isStuck, setSticky] = useState(false);
  
    const scrollHandler = () => {
      if (window.scrollY > scrollLimit) {setSticky(true);}
      else {setSticky(false);}
    };
  
    useEffect(() => {
      window.addEventListener('scroll', scrollHandler);
      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    }, []);
  
    return (
      <header className={`header ${isStuck ? 'stuck_header' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/" activeClassName="active">Home</Link></li>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/blog" activeClassName="active">Blog</Link></li>
            <li><Link to="/contact" activeClassName="active">Contact</Link></li>
          </ul>
        </nav>
      </header>
    );
  }

export default Header;