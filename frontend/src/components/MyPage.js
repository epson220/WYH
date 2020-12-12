import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyPage = () => {
  const [Myboards, setMyboards] = useState([]);

  useEffect(async () => {
    async function fetchData() {
      console.log("react myboards get axios 호출");
      const result = await axios.get("http://localhost:3001/myboard");
      console.log(result.data);
      setMyboards(result.data);
    }
    fetchData();
  }, []);

  const handleDeleteBoard = async (boardId) => {
    const result = await axios.post("http://localhost:3001/deleteBoard", {
      boardId: boardId,
    });
    setMyboards(result.data);
  };

  return (
    <div>
      <Link to="/board">홈으로</Link>
      <h1>작성한 게시글 목록</h1>
      {Myboards.map((myboard) => (
        <div key={myboard._id}>
          <Link to={`/detailBoard/${myboard._id}`}>
            {myboard.title} {myboard.created_at}
          </Link>
          <button onClick={() => handleDeleteBoard(myboard._id)}>삭제</button>
        </div>
      ))}
    </div>
  );
};

export default MyPage;
