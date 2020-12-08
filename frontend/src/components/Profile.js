import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
axios.defaults.withCredentials = true; // 기존에 해당 설정으로 cors 에러가 나게 한 부분

const Profile = ({ match, history }) => {
  const { email } = match.params;
  const [Profile, setProfile] = useState({
    profile_photo: "",
    created_at: "",
    self_intro: "",
    user_id: "",
    user_email: "",
    age: "",
    location: "",
  });

  const [User, setUser] = useState({
    email: "",
    password: "",
    name: "",
    created_at: "",
    deleted_at: "",
  });

  const [Img, setImg] = useState("");

  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios.post("http://localhost:3001/profile", {
        email: email,
      });
      console.dir(result);
      setProfile(result.data.p);
      setUser(result.data.u);

      setImg("http://localhost:3001/uploads/" + result.data.p.profile_photo);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>{Profile.user_email} 의 프로필화면</h1>
      <div>닉네임:{User.name}</div>
      <div>자기소게:{Profile.self_intro}</div>
      <div>나이:{Profile.age}</div>
      <div>사는곳:{Profile.location}</div>
      <div>
        프로필사진:<img src={Img} width="200px" height="200px"></img>
      </div>
      <Link to="/board">메인화면으로 돌아가기</Link>
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </>
  );
};

// const Profile = (login_info) => {
//   const [user, setUser] = useState("");

//   fetch("/profile", {
//     method: "get",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//     },
//     credentials: "same-origin",
//     body: JSON.stringify(login_info),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.dir(data);
//       setUser(data);
//     });

//   return (
//     <div>
//       <h1>{user.username}</h1>
//       <h1>{user.nicname}</h1>
//     </div>
//   );
// };

export default withRouter(Profile);
