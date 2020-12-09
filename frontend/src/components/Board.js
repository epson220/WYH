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
  const [choice, setChoice] = useState("ex/sp");
  const handleChangeSelect = (e) => {
    setChoice(e.target.value);
    console.log(choice);
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

  const handleOnSubmit2 = () => {
    async function fetchData3() {
      console.log("react board search axios2 호출");
      const result3 = await axios.post("http://localhost:3001/searchHobby", {
        hobby: choice,
      });
      console.log(result3.data);
      setResponse(result3.data);
    }
    fetchData3();
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

      {/* <form
        action="http://localhost:3001/searchHobby"
        method="post"
        onSubmit={handleOnSubmit2}
      > */}
      <select name="choice" onChange={handleChangeSelect}>
        <option value="" disabled>
          검색할 취미를 선택하세요.
        </option>
        <option value="ex/sp">운동/스포츠</option>
        <option value="out/tr">아웃도어/여행</option>
        <option value="bk/wr">인문학/책/글</option>
        <option value="fg/lg">외국/언어</option>
        <option value="cul/pfm">문화/공연</option>
        <option value="mu/inst">음악/악기</option>
        <option value="cft">공예/만들기</option>
        <option value="dan">댄스/무용</option>
        <option value="volu">봉사활동</option>
        <option value="par">사교/인맥</option>
        <option value="game">게임/오락</option>
        <option value="pic">사진/편집/촬영/영상</option>
        <option value="inv">제테크/투자</option>
        <option value="cok/fod">요리/음식/맛집</option>
        <option value="fas/bea">패션/뷰티/코디</option>
        <option value="art/draw">미술/그림</option>
      </select>
      <button type="submit" onClick={handleOnSubmit2}>
        게시글검색
      </button>
      {/* </form> */}

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
