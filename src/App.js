import './App.css';
import Navbar from './components/Navbar';
import Form from './pages/Form'
import axios from 'axios';


axios.defaults.baseURL='http://localhost:5000';
axios.defaults.withCredentials=true
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Form/>

    </div>
  );
}

export default App;
