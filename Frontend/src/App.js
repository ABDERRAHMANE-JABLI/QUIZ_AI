import './style/App.css';
import './style/bootstrap.min.css';
import {Error,Analytics,Classes,Profile, LoginSignin,Students,Examens,EditerExamen,VerifyEmail } from './Routes';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector(state=>state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/Auth" element={!user ? <LoginSignin/> : <Navigate to="/Analytics"/>}/>
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail/> : <Navigate to="/Analytics"/>}/>
        <Route path="/Analytics" element={user?.role === "prof" || user?.role === "admin" ? <Analytics/> : <Navigate to="/"/>}/>
        <Route path="/Classes" element={user?.role === "prof" || user?.role === "admin" ?<Classes/> : <Navigate to="/"/>}/>
        <Route path="/Profile/:id" element={user?.role === "prof" || user?.role === "admin" ? <Profile/> : <Navigate to="/"/>}/>
        <Route path="/students" element={user?.role === "prof" || user?.role === "admin" ? <Students/> : <Navigate to="/"/>}/>
        <Route path="/examens" element={user?.role === "prof" || user?.role === "admin" ? <Examens/> : <Navigate to="/"/>}/>
        <Route path="/editer/examens" element={user?.role === "prof" || user?.role === "admin" ? <EditerExamen/> : <Navigate to="/"/>}/>
        <Route path="*" element={<Error/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
