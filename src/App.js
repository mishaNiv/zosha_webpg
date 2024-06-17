import './App.css';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;