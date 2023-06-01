import './style/App.css';
import './style/bootstrap.min.css';
import {Error,Analytics, ResultOffQuizTable,Classes,Profile, LoginSignin,Students,Examens,PasserExamenPage,ResultOffQuiz,EditerExamen,VerifyEmail, Home,Subscrib, ForgotPassword, StudentDashboard, ResetPassword } from './Routes';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
function App() {
  const {user} = useSelector(state=>state.auth);
  
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home/>}/>

        <Route path="/Auth" element={!user || user?.role === "etudiant" ? <LoginSignin/> : <Navigate to="/Analytics"/>}/>

        <Route path="/profs/:userId/verify/:token" element={!user ? <VerifyEmail/> : <Navigate to="/Analytics"/>}/>

        <Route path="/students/:userId/verify/:token" element={!user ? <VerifyEmail/> : <Navigate to="/Students-Dashboard"/>}/>

        <Route path="/Analytics" element={!user || user?.role === "etudiant" ? <Navigate to="/Auth"/> : <Analytics/>}/>

        <Route path="/Classes" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Classes/>}/>

        <Route path="/Profile/:id" element={!user || user?.role === "etudiant" ? <Navigate to="/"/>:<Profile/>}/>

        <Route path="/Classes/:idClasse/Students" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Students/>}/>

        <Route path="/Classes/:idClasse/Examens" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <Examens/>}/>

        <Route path="/Classes/:idClasse/Examens/Editer/:ExamId" element={!user || user?.role === "etudiant" ? <Navigate to="/"/> : <EditerExamen/>}/>

        <Route path="/passer/examens/:ExamId" element={<PasserExamenPage/>}/>

        <Route path='/Inviter/:idClasse' element={<Subscrib/>}/>

        <Route path='/Forgot-Password' element={<ForgotPassword/>}/>

        <Route path='/reset-password/:userId/:token' element={<ResetPassword/>}/>

        <Route path='/Students-Dashboard' element={<StudentDashboard/>}/>

        <Route path='/resultOffQuiz/:ExamId' element={<ResultOffQuiz/>}/>

        <Route path='/Classes/:classId/ExamensResultat/:examId' element={<ResultOffQuizTable/>}/>

        <Route path="*" element={<Error/>}/> 

      </Routes>
    </Router>
  );
}

export default App;
