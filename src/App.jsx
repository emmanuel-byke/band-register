import { useContext } from "react";
import { AppContext } from './AppProvider';
import Details from './Componets/Details';
import HomePage from './Componets/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AuthForm from "./Componets/AuthForm";
import AuthForm from "./features/auth/components/AuthForm";
import Profile from "./Componets/Profile";
import AdminSite from "./Componets/AdminSite";
import RevealText from "./features/auth/components/Test";
import { NewCommer } from "./features/welcome/NewCommer";



function App() {
  const{ currentInstr, setCurrentInstr } = useContext(AppContext)
  const{ userId, setUserId } = useContext(AppContext)

  return (
      <Router>
        <Routes>
          {/* <Route path='/' element={<RevealText />} /> */}
          <Route path='/' element={<HomePage />} />
          <Route path='/instrument/detail/:id' Component={Details} />
          <Route path='/auth' Component={AuthForm} />
          <Route path='/userprofile' Component={Profile} />
          <Route path='/admin' Component={AdminSite} />
          <Route path='/welcome' Component={NewCommer} />
        </Routes>
      </Router>
  )
}

export default App
