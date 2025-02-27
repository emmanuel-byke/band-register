import { useContext } from "react";
import { AppContext } from './AppProvider';
import Details from './Componets/Details';
import HomePage from './Componets/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from "./Componets/AuthForm";
import Profile from "./Componets/Profile";
import AdminSite from "./Componets/AdminSite";




function App() {
  const{ currentInstr, setCurrentInstr } = useContext(AppContext)
  const{ userId, setUserId } = useContext(AppContext)

  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/instrument/detail/:id' Component={Details} />
          <Route path='/auth' Component={AuthForm} />
          <Route path='/userprofile' Component={Profile} />
          <Route path='/admin' Component={AdminSite} />
        </Routes>
      </Router>
  )
}

export default App
