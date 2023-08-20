import React, { useContext, useEffect } from 'react';
import { useState } from 'react';


import validateUser from '../../Utils/userLogIn/validateUser';
import MyContext from '../../Store/ContextProvider';

import "./UserLogIn.css";
import data from '../../Utils/userLogIn/users.json';


const UserLogIn = () => {

   const { logInFunctionHandler, setAdmin, setUserNameHandler, loadUserData } =
     useContext(MyContext);

    useEffect(() => {
      const storedData = localStorage.getItem("userData");

      if (storedData) {
        loadUserData(JSON.parse(storedData));
      } else {
        loadUserData(data.users);
        localStorage.setItem("userData", JSON.stringify(data.users));
      }
    }, []);
  
   
   const initialLogInDetailsStage = {
     userName: "",
     passWord: "",
   };

   const [loginDetails, setLoginDetails] = useState(initialLogInDetailsStage);

   const loginFromHandler = (e) => {
     e.preventDefault();
     const { isValidUser, isAdmin } = validateUser(loginDetails);
     if(isValidUser){
      logInFunctionHandler();
      setUserNameHandler(loginDetails.userName);
      if(isAdmin){
        setAdmin(true);
      }
      setLoginDetails(initialLogInDetailsStage);
     }else{
      alert("No user found pleace enter valid userinfo")
     }
   };

  return (
    <form className="loginForm" onSubmit={loginFromHandler}>
      <h3>Login</h3>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={loginDetails.userName}
        onChange={(e) => {
          setLoginDetails((prv) => ({ ...prv, userName: e.target.value }));
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={loginDetails.passWord}
        onChange={(e) => {
          setLoginDetails((prv) => ({ ...prv, passWord: e.target.value }));
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default UserLogIn;