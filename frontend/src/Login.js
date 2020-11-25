import React, { useState } from "react";
import { post } from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  // const handleFormSubmit = () => {
  //   const url = "/login";
  //   let formData = new FormData();
  //   formData.append("username", username);
  //   formData.append("password", password);

  //   let config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };

  //   return post(url, formData, config);
  // };

  return (
    <form action="http://localhost:3001/login" method="post">
      <h1>로그인 화면</h1>
      이메일:
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChangeUsername}
      ></input>
      비밀번호:
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChangePassword}
      ></input>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
