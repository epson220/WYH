import React, { useState } from "react";

const WriteBoard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hobby, setHobby] = useState("");

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeContent = (e) => setContent(e.target.value);
  const onChangeHobby = (e) => setHobby(e.target.value);

  return (
    <div>
      <form
        action="http://localhost:3001/writeBoard"
        method="post"
        encType="multipart/form-data"
      >
        <label>제목</label>
        <input type="text" name="title" onChange={onChangeTitle}></input>
        <br></br>
        <label>본문</label>
        <textarea
          type="text"
          name="content"
          onChange={onChangeContent}
        ></textarea>
        <br></br>
        <label>취미</label>
        <br></br>
        <label>
          <input type="radio" value="ex/sp" name="hobby" />
          운동/스포츠
        </label>
        <br></br>
        <label>
          <input type="radio" value="out/tr" name="hobby" />
          아웃도어/여행
        </label>
        <br></br>
        <label>
          <input type="radio" value="bk/wr" name="hobby" />
          인문학/책/글
        </label>
        <br></br>
        <label>
          <input type="radio" value="fg/lg" name="hobby" />
          외국/언어
        </label>
        <br></br>
        <label>
          <input type="radio" value="cul/pfm" name="hobby" />
          문화/공연
        </label>
        <br></br>
        <label>
          <input type="radio" value="mu/inst" name="hobby" />
          음악/악기
        </label>
        <br></br>
        <label>
          <input type="radio" value="cft" name="hobby" />
          공예/만들기
        </label>
        <br></br>
        <label>
          <input type="radio" value="dan" name="hobby" />
          댄스/무용
        </label>
        <br></br>
        <label>
          <input type="radio" value="volu" name="hobby" />
          봉사활동
        </label>
        <br></br>
        <label>
          <input type="radio" value="par" name="hobby" />
          사교/인맥
        </label>
        <br></br>
        <label>
          <input type="radio" value="game" name="hobby" />
          게임/오락
        </label>
        <br></br>
        <label>
          <input type="radio" value="pic" name="hobby" />
          사진/편집/촬영/영상
        </label>
        <br></br>
        <label>
          <input type="radio" value="inv" name="hobby" />
          제테크/투자
        </label>
        <br></br>
        <label>
          <input type="radio" value="cok/fod" name="hobby" />
          요리/음식/맛집
        </label>
        <br></br>
        <label>
          <input type="radio" value="fas/bea" name="hobby" />
          패션/뷰티/코디
        </label>
        <br></br>
        <label>
          <input type="radio" value="art/draw" name="hobby" />
          미술/그림
        </label>
        <br></br>
        <br></br>
        <label>사진첨부</label>
        <input type="file" name="photo"></input>
        <br></br>
        <button type="submit">ok</button>
      </form>
    </div>
  );
};

export default WriteBoard;
