import './style/App.css';
import './style/bootstrap.min.css';
import {Error,Analytics,Classes,Profile, LoginSignin,Students,Examens,PasserExamenPage,EditerExamen,VerifyEmail } from './Routes';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector(state=>state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/Auth" element={!user ? <LoginSignin/> : <Navigate to="/Analytics"/>}/>
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail/> : <Navigate to="/Analytics"/>}/>
        <Route path="/Analytics" element={user?.role === "prof" || user?.role === "admin" ? <Analytics/> : <Navigate to="/Auth"/>}/>
        <Route path="/Classes" element={user?.role === "prof" || user?.role === "admin" ?<Classes/> : <Navigate to="/Auth"/>}/>
        <Route path="/Profile/:id" element={user?.role === "prof" || user?.role === "admin" ? <Profile/> : <Navigate to="/Auth"/>}/>
        <Route path="/students" element={user?.role === "prof" || user?.role === "admin" ? <Students/> : <Navigate to="/Auth"/>}/>
        <Route path="/examens" element={user?.role === "prof" || user?.role === "admin" ? <Examens/> : <Navigate to="/Auth"/>}/>
        <Route path="/editer/examens" element={user?.role === "prof" || user?.role === "admin" ? <EditerExamen/> : <Navigate to="/Auth"/>}/>
        <Route path="/passer/examens" element={<PasserExamenPage/>}/>

        <Route path="*" element={<Error/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
