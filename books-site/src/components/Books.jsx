import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Books.css";

function Books() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    const filteredResults = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.authors.some((author) =>
          author.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setSearchResults(filteredResults);
  }, [data, searchTerm]);

  setInterval(() => {
    Books();
  }, 2000);

  return (
    <div>
      <div className="top">
          <h3>KALVIUM BOOKS</h3>
        <div className="box">
          <div className="search">
            <input
              className="searchBox"
              type="text"
              placeholder="Search by Title or Author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="register"><Link className='link' to='/form'>Register</Link></button>
        </div>
      </div>
      <hr />
      <div className="main">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div className="display" key={item.id}>
              <img src={item.imageLinks.thumbnail} />
              <p>
                <b>{item.title}</b>
              </p>
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
