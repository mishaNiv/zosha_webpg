import './App.css';
import Home from './Pages/Home';
import ColList from './Pages/Col-List';
import Contact from './Pages/Contact';
import Finder from './Pages/Finder';
import Fyp from './Pages/Fyp';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { CollegeListProvider } from './CollegeListContext';

function App() {
  return ( 
    <CollegeListProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/col-list" element={<ColList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/fyp" element={<Fyp />} />
        </Routes>
      </Router>
    </CollegeListProvider>
  );
}

export default App;