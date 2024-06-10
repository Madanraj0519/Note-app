import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <Routes>
        <Route exact path={'/'} element={ <Home /> } />
        <Route exact path={'/login'} element={ <Login /> } />
        <Route exact path={'/signUp'} element={ <SignUp /> } />
     </Routes>
    </BrowserRouter>
  )
}

export default App
