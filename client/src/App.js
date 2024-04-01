import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Teams from './pages/teams/teams';
import Home from './pages/home/home';
import Team from './pages/team/team';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="app">
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/teams/:id' element={<Team/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
