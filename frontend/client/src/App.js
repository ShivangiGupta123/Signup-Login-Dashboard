// import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Component/Pages/Signup/Signup';
import Signin from './Component/Pages/Signin/Signin';
import Dashboard from './Component/Pages/Dashboard/Dashboard';
import PrivateLayout from './Component/Layout/PrivateLayout';
import Logout from './Component/Pages/Logout.js/Logout';
import PublicLayout from './Component/Layout/PublicLayout';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    <Route element = {<PublicLayout/>}>
    <Route path = '/' element = {<Signin/>}/>
    <Route path = 'admin-signup' element = {<Signup/>} />
    </Route>
    <Route element = {<PrivateLayout/>}>
    
    <Route path = '/dashboard' element = {<Dashboard/>}/>
    <Route path = '/logout' element = {<Logout/>}/>
    </Route>


    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
