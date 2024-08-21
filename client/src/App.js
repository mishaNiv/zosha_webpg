import './App.css';
import Home from './Pages/Home';
import ColList from './Pages/Col-List';
import Contact from './Pages/Contact';
import Finder from './Pages/Finder';
import Fyp from './Pages/Fyp';
import Onboarding from './Pages/Onboarding';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { CollegeListProvider } from './Components/CollegeListContext';
import { APIProvider } from './Components/APIContext';

function App() {
  return ( 
    <CollegeListProvider> 
      <APIProvider>
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
      </APIProvider>
    </CollegeListProvider>
  );
}

export default App;