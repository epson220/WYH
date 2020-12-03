import React from "react";
import { Route, Link } from "react-router-dom";

const Board = () => {
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
