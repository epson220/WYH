import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

const Board = () => {
  const [response, setResponse] = useState(null);

  useEffect(async () => {
    try {
      console.log("axios 실행");
      let res = await axios.get("http://localhost:30001/board");
      console.log(res);
      setResponse(res);
    } catch (err) {}
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
      <ol></ol>
    </div>
  );
};

export default Board;
