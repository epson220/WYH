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
  const [Img, setImg] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const handleChangeFile = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  const onChangeProfilePhoto = (e) =>
    setProfile({ profile_photo: e.target.value });
  const onChangeSelfIntro = (e) => setProfile({ self_intro: e.target.value });
  const onChangeLocation = (e) => setProfile({ location: e.target.value });
  const onChangeAge = (e) => setProfile({ age: e.target.value });

  useEffect(async () => {
    async function fetchData() {
      console.log("writeProfile axios get 호출");
      let res = await axios.get("http://localhost:3001/getProfileInfo");
      console.log(res);
      console.dir(res.data[0]);
      if (res.data[0] != undefined) {
        setProfile(res.data[0]);
        setImg("http://localhost:3001/uploads/" + res.data[0].profile_photo);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <label>기존 프로필 사진</label>
      <br></br>
      <img src={Img} width="200px" height="200px"></img>
      <br></br>
      <label>선택한 프로필 사진</label>
      <br></br>
      {/* <div
        style={{ backgroundColor: "#efefef", width: "200px", height: "200px" }}
      > */}
      <img src={imgBase64} width="200px" height="200px" />
      {/* </div> */}
      <form
        method="post"
        action="http://localhost:3001/writeProfile"
        encType="multipart/form-data"
      >
        <label>프로필 사진</label>
        <input
          type="file"
          name="photo"
          //value="http://localhost:3001/uploads/"+`{Profile.profile_photo}`
          // onChange={onChangeProfilePhoto}
          onChange={handleChangeFile}
        ></input>
        <br></br>
        <input
          type="text"
          name="self_intro"
          placeholder="간단한 자기소개 및 관심사"
          value={Profile.self_intro}
          onChange={onChangeSelfIntro}
        ></input>
        <br></br>
        <input
          type="text"
          name="age"
          placeholder="나이"
          value={Profile.age}
          onChange={onChangeAge}
        ></input>
        <br></br>
        <input
          type="text"
          name="loc"
          placeholder="사는 곳"
          value={Profile.location}
          onChange={onChangeLocation}
        ></input>
        <br></br>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default WriteProfile;
