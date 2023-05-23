import './style/App.css';
import './style/bootstrap.min.css';
import $ from 'jquery'

import {Error,Analytics,Classes,Profile, LoginSignin,Students,Examens,PasserExamenPage,EditerExamen,VerifyEmail, Home } from './Routes';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector(state=>state.auth);
  
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home/>}/>

        <Route path="/Auth" element={!user ? <LoginSignin/> : <Navigate to="/Analytics"/>}/>

        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail/> : <Navigate to="/Analytics"/>}/>

        <Route path="/Analytics" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Analytics/>}/>

        <Route path="/Classes" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Classes/>}/>

        <Route path="/Profile/:id" element={!user || user?.role === "etudiant" ? <Navigate to="/"/>:<Profile/>}/>

        <Route path="/Classes/:idClasse/Students" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Students/>}/>

        <Route path="/Classes/:idClasse/Examens" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Examens/>}/>

        <Route path="/editer/examens/:ExamId" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <EditerExamen/>}/>

        <Route path="/passer/examens" element={<PasserExamenPage/>}/>

        <Route path="*" element={<Error/>}/> 

      </Routes>
    </Router>
  );
}

export default App;
