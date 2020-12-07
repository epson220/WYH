import React, { useEffect, useState } from "react";
import axios from "axios";

const WriteProfile = () => {
  const [Profile, setProfile] = useState({
    profile_photo: "",
    created_at: "",
    self_intro: "",
    user_id: "",
    user_email: "",
    location: "",
    age: "",
  });

  useEffect(async () => {
    async function fetchData() {
      console.log("writeProfile axios get 호출");
      let res = axios.get("http://localhost:3001/getProfileInfo");
      console.log(res);
      setProfile(res.data);
    }
    fetchData();
  }, []);

  return (
    <form method="post" action="http://localhost:3001/writeProfile">
      <input type="hidden" value={Profile.user_id} name="uid"></input>
      <input type="hidden" value={Profile.user_email} name="uem"></input>
      <input
        type="file"
        name="photo"
        placeholder="프로필 사진"
        value={Profile.profile_photo}
      ></input>
      <input
        type="text"
        name="self_intro"
        placeholder="간단한 자기소개 및 관심사"
        value={Profile.self_intro}
      ></input>
      <input
        type="text"
        name="age"
        placeholder="나이"
        value={Profile.age}
      ></input>
      <input
        type="text"
        name="loc"
        placeholder="사는 곳"
        value={Profile.location}
      ></input>
      <button type="submit">작성 완료</button>
    </form>
  );
};

export default WriteProfile;
