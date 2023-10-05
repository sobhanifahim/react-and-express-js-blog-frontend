import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { UserProvider } from './components/UserContext';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Userprofile from './components/userprofile';
import Createblog from './components/createblog';
import Readblog from './components/readblog';
function App() {
  return (
    <div className="App">
        <BrowserRouter>     
        <UserProvider>
        <Routes>
         
                <Route exact path = "/" element={<Login/>}></Route>
                <Route path = "/register" element={<Register/>}></Route>
                <Route path = "/home" element={<Home/>}></Route>
                <Route path = "/profile" element={<Userprofile/>}></Route>
                <Route path = "/createblog" element={<Createblog/>}></Route>
                <Route path = "/readblog" element={<Readblog/>}></Route> 
          
        </Routes>
        </UserProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
