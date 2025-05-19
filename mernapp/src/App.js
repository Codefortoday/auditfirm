
import './App.css';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import Footer from './components/Footer';
import Signup from './screens/Signup';
import AdminLogin from './screens/Adminlogin';
//import Home2 from './screens/Home2';
import AdminDash from './screens/AdminDash';
import Testimonial from './components/Testimonal';
import Newslettertb from './components/Newslettertb'
import Appointment from './screens/Appointment'
import Booked_tb from "./components/Booked_tb";
import Price from './screens/Price';
import Client_Profile from "./screens/Client_Profile"
import Contact from './screens/Contact';
import Contact_tb from './screens/Contact_tb';
import Update_profile from './screens/Update_profile';
import Forgotpass from "./components/Forgotpass";
import Resetpass from "./components/Resetpass";
import Calculate from "./components/Calculate"
import Faqs from "./components/Faqs"
import Service from './components/Service';
import Notification from './components/Notification';
import Service_tb from "./screens/Service_tb"


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/footer' element={<Footer />} />
        <Route exact path='/Createuser' element={<Signup />} />
        <Route exact path='/Adminlogin' element={<AdminLogin />} />
        <Route exact path='/AdminDash' element={<AdminDash />} />
        <Route exact path='/Testimonal' element={<Testimonial />} />
        <Route exact path='/Newslettertb' element={<Newslettertb />} />
        <Route exact path='/Booked_tb' element={<Booked_tb />} />
        <Route exact path='/Appointment' element={<Appointment />} />
        <Route exact path='/Price' element={<Price />} />
        <Route exact path='/Client_Profile' element={<Client_Profile />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path='/Contact_tb' element={<Contact_tb />} />
        <Route exact path='/Update_profile' element={<Update_profile />} />
        <Route path="/Forgotpass" element={<Forgotpass />} />
        <Route path="/Resetpass/:token" element={<Resetpass />} />
        <Route path="/Calculate" element={<Calculate />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/Service_tb" element={<Service_tb />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Faqs" element={<Notification />} />
        {/* <Route path="/resetpassword/:token" element={<ResetPassword />} /> */}




        {/* <Route exact path='/' element={<Home2/>} />    */}
      </Routes>
    </Router>
  );

}


export default App;
