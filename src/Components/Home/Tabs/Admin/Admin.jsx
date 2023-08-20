import React, { useContext } from "react";
import MyContext from "../../../../Store/ContextProvider";
import "./Admin.css"; // Import the CSS file

const Admin = () => {
  const { userListData, setListUserData, dishListData, setDishListData } =
    useContext(MyContext);

  const getDishNameById = (dishId) => {
    const dish = dishListData.find((dish) => dish.id === dishId);
    return dish ? dish.dishName : "Not Selected By User";
  };

  const editUser = (username) => {
    // Logic to toggle admin status
  };

  const deleteUser = (username) => {
    const updatedUserList = userListData.filter(
      (user) => user.username !== username
    );
    setListUserData(updatedUserList);

    setListUserData((prevUserData) => {
       console.log(prevUserData);
       localStorage.setItem("userData", JSON.stringify(prevUserData));
       return prevUserData;
     });  
  };


  return (
    <div className="admin-panel">
      <h1 className="admin-title">Admin Panel</h1>
      <ul className="user-list">
        {userListData.map((user) => (
          <li key={user.username} className="user-item">
            <div className="user-info">
              <div className="username">{user.username}</div>
              <div className="favorite-dishes">
                <p>Favorite Dishes:</p>
                <ul>
                  {user.rankGiven.map((dishId, index) => (
                    <li key={index}>{getDishNameById(dishId)}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="action-buttons">
              <button
                className="toggle-admin"
                onClick={() => editUser(user.username)}
              >
                Edit User
              </button>
              <button
                className="delete-user"
                onClick={() => deleteUser(user.username)}
              >
                Delete User
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
