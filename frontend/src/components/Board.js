import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

const Board = () => {
  const [response, setResponse] = useState([]);

  useEffect(async () => {
    try {
      console.log("axios 실행");
      let res = [];
      res = await axios.get("http://localhost:3001/board");
      console.log(res);
      setResponse(res.data);
      console.log(response);
    } catch (err) {
      console.log("axios err");
      console.log(err);
    }
  });

  return (
    <div>
      <button>
        <Link to="/writeBoard">게시글 작성</Link>
      </button>
      <form action="http://localhost:3001/searchBoard" method="post">
        <input type="text" name="searchKeyword"></input>
        <button type="submit">게시글검색</button>
      </form>
      <ol>
        {response.map((res) => (
          <li>
            <Link to="/detailBoard">
              {res.title} {res.created_at}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Board;
