import './App.css';
import Home from './Pages/Home';
import ColList from './Pages/Col-List';
import Contact from './Pages/Contact';
import Finder from './Pages/Finder';
import Fyp from './Pages/Fyp';
import Onboarding from './Pages/Onboarding';
import Login from './Components/login.js';
import Signup from './Components/signup.js';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { CollegeListProvider } from './Components/collegeListContext.js';

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
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
    </CollegeListProvider>
  );
}

export default App;