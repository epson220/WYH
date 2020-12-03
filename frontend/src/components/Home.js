import React from "react";
import { Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>WYB홈페이지입니다.</h1>
      <button>
        <Link to="/login">로그인</Link>
      </button>
      <button>
        <Link to="/signup">회원가입</Link>
      </button>
    </div>
  );
};

export default Home;
