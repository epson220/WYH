import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

const Board = () => {
  const [response, setResponse] = useState([]);

  useEffect(async () => {
    // try {
    //   console.log("axios 실행");
    //   let res = [];
    //   res = await axios.get("http://localhost:3001/board");
    //   console.log(res);
    //   setResponse(res.data);
    //   console.log(response);
    // } catch (err) {
    //   console.log("axios err");
    //   console.log(err);
    // }
    async function fetchData() {
      console.log("react board get axios 호출");
      const result = await axios.get("http://localhost:3001/board");
      console.log(result.data);
      setResponse(result.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <button>
        <Link to="/writeBoard">게시글 작성</Link>
      </button>
      <button>
        <Link to="/writeProfile">프로필 작성</Link>
      </button>
      <form action="http://localhost:3001/searchBoard" method="post">
        <input type="text" name="searchKeyword"></input>
        <button type="submit">게시글검색</button>
      </form>
      <ol>
        {response.map((res) => (
          <li key={res._id}>
            {/* <Link to={`/detailBoard/${res._id}`}>
              <div onClick={handleOnClick(res._id)}>
                {res.title} {res.created_at}
              </div>
            </Link> */}
            <Link to={`/detailBoard/${res._id}`}>
              {res.title} {res.created_at}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Board;
