import { useContext, useState } from 'react'

import UserLogIn from './Components/LogInPage/UserLogIn';
import HomePage from './Components/Home/HomePage';
import MyContext from './Store/ContextProvider';


import './App.css'

function App() {
  
  const { isLoggedIn } = useContext(MyContext);

  return (
    <>
    {!isLoggedIn && (<UserLogIn/>)}
    {isLoggedIn && (<HomePage/>)}   
    </>
  )
}

export default App
