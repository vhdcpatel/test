import { createContext, useState,useEffect } from "react";

const MyContext = createContext({
  isLoggedIn: false,
  logInFunctionHandler: () => {},
  logOutHandler: () => {},
  addLikeHandler: () => {},
  userListData: [],
  userName: null,
  setUserNameHandler: () => {},
  updateUserRankAtIndex:()=>{}
});


export const ContextProvider = ({ children }) => {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [userName,setUserName] = useState(null);

  const [dishListData,setDishListData] = useState([]);
  const [userListData, setListUserData] = useState([]);

  const setAdmin = ()=>{
    setIsAdmin(true);
  }

  const logInFunctionHandler = ()=>{
    setIsLoggedIn(true);
  }
   
  const logOutHandler = ()=>{
    setIsAdmin(false);
    setIsLoggedIn(false);
  }

  const loadDishesData = (newData) => {
    setDishListData(newData);
  }

  const setUserNameHandler = (currUserName)=>{
    setUserName(currUserName);
  }

  const loadUserData = (newData)=>{
    setListUserData(newData);
  }



  const updateUserRankAtIndex = (username, rankno, dishIndex) => {
    

    // Modify the userData 
    setListUserData((prevUserData) => {
      return prevUserData.map((user) => {
        
        if (user.username === username) {

           if (user.rankGiven.includes(dishIndex)) {
             alert("Rank already given to this dish");
             return user;
           }
            
          const point = rankno === 0 ? 30 : rankno === 1 ? 20 : 10;
          let oldDishId = user.rankGiven[rankno];
      

          if(oldDishId !==-1){
          // Remove Ponints from new 
            setDishListData((prevDishData) => {
            return prevDishData.map((dish) => {
              if (dish.id === oldDishId) {
                const updatedPoints = dish["Points"] - point;
                return {
                  ...dish,
                  Points: updatedPoints,
                };
              }
              return dish;
            });
          });}

          // Add Points to new 
          setDishListData((prevDishData) => {
            return prevDishData.map((dish) => {
              if (dish.id === dishIndex) {
                const updatedPoints = dish["Points"] + point;
                return {
                  ...dish,
                  Points: updatedPoints,
                };
              }
              return dish;
            });
          });

          setDishListData((prevDishData) => {
            localStorage.setItem("dishesData", JSON.stringify(prevDishData));
            return prevDishData;
          });

          const updatedRankArray = [...user.rankGiven];
            updatedRankArray[rankno] = dishIndex;

          return {
            ...user,
            rankGiven: updatedRankArray,
          };
        }
        return user;
      });
    });

     setListUserData((prevUserData) => {
       localStorage.setItem("userData", JSON.stringify(prevUserData));
       return prevUserData;
     });  
  };


  return (
    <MyContext.Provider
      value={{
        isLoggedIn,
        logInFunctionHandler,
        logOutHandler,
        isAdmin,
        setAdmin,
        dishListData,
        loadDishesData,
        userName,
        setUserNameHandler,
        updateUserRankAtIndex,
        loadUserData,
        userListData,
        setListUserData,
        setDishListData
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext