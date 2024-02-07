import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Books.css";

function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setData(response.data.books);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(data.length);
  }, [data]);

  return (
    <div>
      <div className="main">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="display" key={item.id}>
              <img src={item.imageLinks.thumbnail} />
              <p>{item.title}</p>
              <div className="rating">
                <p>{item.averageRating}</p>
                <p>Free</p>
              </div>
            </div>
          ))
        ) : (
          <p className="spinner"></p>
        )}
      </div>
    </div>
  );
}

export default Books;
