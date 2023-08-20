// Card.js
import React, { useContext, useState } from "react";
import "./Card.css";
import MyContext from "../../../../Store/ContextProvider";

const Card = ({ dish, userNameProp}) => {
  const { updateUserRankAtIndex, userListData, userName } =
    useContext(MyContext);
  
  const user = userListData.find((user) => user.username === userName);



  return (
    <div className="card">
      <img src={dish.image} alt={dish.dishName} />
      <div className="text">
        <h3>{dish.dishName}</h3>
        <p>{dish.description}</p>
      </div>
      <div className="ranking">
        Give Ranking
        <button
          className={
            user.rankGiven[0] === dish.id
              ? "selected ranking-btn"
              : "ranking-btn"
          }
          onClick={() => {
            updateUserRankAtIndex(userNameProp, 0, dish.id);
          }}
        >
          Rank1
        </button>
        <button
          className={
            user.rankGiven[1] === dish.id
              ? "selected ranking-btn"
              : "ranking-btn"
          }
          onClick={() => {
            updateUserRankAtIndex(userNameProp, 1, dish.id);
          }}
        >
          Rank2
        </button>
        <button
          className={
            user.rankGiven[2] === dish.id
              ? "selected ranking-btn"
              : "ranking-btn"
          }
          onClick={() => {
            updateUserRankAtIndex(userNameProp, 2, dish.id);
          }}
        >
          Rank3
        </button>
      </div>
    </div>
  );
};

export default Card;
