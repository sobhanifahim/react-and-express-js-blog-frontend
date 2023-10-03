import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Userprofile from './components/userprofile';

function App() {
  return (
    <div className="App">
        <BrowserRouter>     
        <Routes>
                <Route exact path = "/" element={<Login/>}></Route>
                <Route path = "/register" element={<Register/>}></Route>
                <Route path = "/home" element={<Home/>}></Route>
                <Route path = "/profile" element={<Userprofile/>}></Route>
                {/*<Route path = "/forgotpassword" element={<Forgotpassword/>}></Route>
                <Route path = "/merchantdashboard" element={<MerchantDash/>}></Route> */}
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
