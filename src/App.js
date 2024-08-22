import './App.css';
import Form from './pages/Form'
import axios from 'axios';
import Fetch from './components/Fetch'
import AttendancePage from './components/Attendance'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserView from './components/UserView';
import MessDuty from './components/MessDuty';
import Front from './components/Front';
import Login from './components/login';
import UserPage from './components/UserPage';
import Complaints from './components/Complaints';
import ComplaintForm from './components/ComplaintForm';
import MessBillCalculation from './components/MessBillCalculation';
import MessBillForm from './components/MessBillForm';
import LhRules from './components/LhRules';
import Contact from './components/Contact';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import statements
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
axios.defaults.baseURL='https://hostel-mate-backend.vercel.app';
axios.defaults.withCredentials=true
function App() {
  return (
    <>
    <Router>
      
    <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/front" exact element={<Form/>} />
          <Route path="/fetch" element={<Fetch/>  } />
          <Route path="/attendance" element={<AttendancePage/>  } />
          <Route path="/userview" element={<UserView/>  } />
          <Route path="/messduty" element={<MessDuty/>  } />
          <Route path="/" element={<Front/>  } />
          <Route path="/messbill" element={<MessBillCalculation/>  } />
          <Route path="/login" element={<Login/>  } />
          <Route path="/nextpage"element={<UserPage/>}/>
          
          <Route path="/complaints"element={<Complaints/>}/>
          <Route path="/complaint"element={<ComplaintForm/>}/>
          <Route path="/mb"element={<MessBillForm/>}/>
          <Route path="/complaintform" element={<ComplaintForm/>} />
          <Route path="/rules" exact element={<LhRules/>} />
          <Route path="/contact" element={<Contact/>} />


        </Routes>
        </Elements>
      </Router>

    </>
  );
}

export default App;
