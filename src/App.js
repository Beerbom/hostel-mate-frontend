import './App.css';
import Navbar from './components/Navbar';
import Form from './pages/Form'
import axios from 'axios';
import Fetch from './components/Fetch'
import AttendancePage from './components/Attendance'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserView from './components/UserView';
import MessDuty from './components/MessDuty';
import Attendance from './components/Show';
import Front from './components/Front';
import Login from './components/login';



axios.defaults.baseURL='http://localhost:5000';
axios.defaults.withCredentials=true
function App() {
  return (
    <div className="App">
    <Router>
        <Navbar />
        <Routes>
          <Route path="/front" exact element={<Form/>} />
          <Route path="/fetch" element={<Fetch/>  } />
          <Route path="/attendance" element={<AttendancePage/>  } />
          <Route path="/userview" element={<UserView/>  } />
          <Route path="/messduty" element={<MessDuty/>  } />
          <Route path="/view" element={<Attendance/>  } />
          <Route path="/" element={<Front/>  } />
          <Route path="/login" element={<Login/>  } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
