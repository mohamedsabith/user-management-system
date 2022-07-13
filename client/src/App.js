import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard';
import NotFound from './components/NotFound/NotFound';
import {ThemeProvider} from '@mui/material/styles';
import theme from './styles/muiTheme';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
          <Router>
           <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route exact path='/admin' element={<AdminLogin/>}/>
            <Route exact path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path="*" element={<NotFound/>} />
           </Routes>
          </Router>
      </ThemeProvider> 
    </div>
  );
}

export default App;
