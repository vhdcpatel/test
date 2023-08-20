import React, { useContext } from "react";
import MyContext from "../../../../Store/ContextProvider";
import "./Results.css"; // Import your custom CSS for styling

const Results = () => {
  const { dishListData, userListData, userName } = useContext(MyContext);

  const user = userListData.find((user) => user.username === userName);
  

  // Sort the dishListData in descending order based on Points
  const sortedDishes = dishListData.sort((a, b) => b.Points - a.Points);

  console.log(sortedDishes);

  return (
    <div className="Results-container">
      <h2>Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Dish Name</th>
            <th>Description</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedDishes.map((dish, index) => (
            <tr
              key={dish.id}
              className={user.rankGiven.includes(dish.id) ? "selected" : ""}
            >
              <td>{index + 1}</td>
              <td>{dish.dishName}</td>
              <td>{dish.description}</td>
              <td>{dish.Points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
