import React, { useState } from "react";
//import { post } from "../../backend/app";
import { post } from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nicname, setNicname] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeNicname = (e) => setNicname(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  // const handleFormSubmit = () => {
  //   const url = "/signup";
  //   const formData = new FormData();
  //   formData.append("username", username);
  //   formData.append("password", password);
  //   formData.append("nicname", nicname);

  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };

  //   return post(url, formData, config);
  // };

  return (
    <form action="http://localhost:3001/signup" method="post">
      <h1>회원가입</h1>
      이메일:
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChangeEmail}
      ></input>
      비밀번호:
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChangePassword}
      ></input>
      닉네임:
      <input
        type="text"
        name="nicname"
        value={nicname}
        onChange={onChangeNicname}
      ></input>
      <button type="submit">가입완료</button>
    </form>
  );
};

export default Signup;
