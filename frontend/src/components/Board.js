import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

const Board = () => {
  const [response, setResponse] = useState([]);
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

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
      const result = await axios.get("http://localhost:3001/board", {
        input: input,
      });
      console.log(result.data);
      setResponse(result.data);
    }
    fetchData();
  }, []);

  const handleOnSubmit = () => {
    async function fetchData2() {
      console.log("react board search axios 호출");
      const result2 = await axios.post("http://localhost:3001/searchBoard", {
        input: input,
      });
      console.log(result2.data);
      setResponse(result2.data);
    }
    fetchData2();
  };

  return (
    <div>
      <button>
        <Link to="/writeBoard">게시글 작성</Link>
      </button>
      <button>
        <Link to="/updateProf">프로필 작성</Link>
      </button>

      <input
        type="text"
        //name="searchKeyword"
        onChange={handleInputChange}
      ></input>
      <button type="submit" onClick={handleOnSubmit}>
        게시글검색
      </button>

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
