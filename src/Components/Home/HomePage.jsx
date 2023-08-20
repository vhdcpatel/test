import React, { useContext, useState } from 'react'

import "./HomePage.css";
import MyContext from '../../Store/ContextProvider';
import RankDishes from './Tabs/RankDishes/RankDishes';
import Results from './Tabs/Results/Results';
import Admin from './Tabs/Admin/Admin';

const HomePage = () => {

  const { logOutHandler, isAdmin } = useContext(MyContext);

  const [pageActive, setPageActive] = useState('rank-dishes');


  return (
    <>
      <header className="home-header">
        <div className="tabs">
          <span
            className={pageActive === "rank-dishes" ? "active" : ""}
            onClick={() => {
              setPageActive("rank-dishes");
            }}
          >
            Rank Dishes
          </span>
          <span
            className={pageActive === "results" ? "active" : ""}
            onClick={() => {
              setPageActive("results");
            }}
          >
            Results
          </span>
          {isAdmin && (
            <span
              className={pageActive === "admin" ? "active" : ""}
              onClick={() => {
                setPageActive("admin");
              }}
            >
              Admin Panel
            </span>
          )}
        </div>
        <button className="logout-btn" onClick={logOutHandler}>
          LogOut
        </button>
      </header>
      <main className="main-section">
        {pageActive === "rank-dishes" ? (
          <RankDishes />
        ) : pageActive === "results" ? (
          <Results />
        ) : (
          isAdmin && <Admin />
        )}
      </main>
    </>
  );
}

export default HomePage