import './style/App.css';
import './style/bootstrap.min.css';

import {Error,Home,Classes,Profile, LoginSignin,Students,Examens,EditerExamen } from './Routes';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignin/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Classes" element={<Classes/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/examens" element={<Examens/>}/>
        <Route path="/editer/examens" element={<EditerExamen/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
