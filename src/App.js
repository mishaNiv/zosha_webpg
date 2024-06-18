import './App.css';
import Home from './Home';
import ColList from './Col-List';
import Contact from './Contact';
import Finder from './Finder';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/col-list" element={<ColList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/finder" element={<Finder />} />
      </Routes>
    </Router>
  );
}

export default App;