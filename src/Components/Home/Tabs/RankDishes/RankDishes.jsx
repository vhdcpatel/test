import React, { useContext, useEffect, useState } from 'react';

import useDataFetch from '../../../../hooks/useDataFetch';
import MyContext from '../../../../Store/ContextProvider';
import Card from './Card';
import trasfromData from '../../../../Utils/TrasformData/TrasformData';
import getData from '../../../../Utils/getData/getData';

import "./RankDishes.css";

// Local Data because some time api is not woking properly.
import data9 from './data.json';

const RankDishes = () => {
  const { loadDishesData, dishListData, userName  } = useContext(MyContext);

  const apiUrl =
    "https://raw.githubusercontent.com/dctacademy/react-task/main/db.json";
  // const {data,loading,error} = useDataFetch(apiUrl);
  // Can not use the loading and error because We need don't have backend so to store the data into local storage.

  useEffect(() => {
    const storedDishesData = localStorage.getItem("dishesData");

    if (storedDishesData) {
      loadDishesData(JSON.parse(storedDishesData));
    } else {
      // Not Present in the local storage than fetch transform and store the data.
      getData(apiUrl).then((data)=>{
        const newData = trasfromData(data.data);
        loadDishesData(newData);
        localStorage.setItem("dishesData", JSON.stringify(newData));
      })
 
      // for futher testing(Some Time API stop working so uncomment following code);
      // const newData = trasfromData(data9.data);
      // console.log(newData);
      // loadDishesData(newData);
      // localStorage.setItem("dishesData", JSON.stringify(newData));
    }
  }, []);

  // Pagination
  const itemPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // if (loading) {
  //   return <p style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'95vh'}}>Loading data please wait...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  const totalItems = dishListData.length;
  const totalPages = Math.ceil(totalItems / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const itemsToShow = dishListData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <ul className="unordered-list-dishes">
        {itemsToShow.map((item) => (
          <li key={item.id}>
            <Card dish={item} userNameProp={userName}></Card>
          </li>
        ))}
      </ul>

      {/* Pagination section */}
      <div className="pagination">
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`pagination-btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RankDishes