import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DetailBoard = ({ match }) => {
  const { board_id } = match.params;
  const [Board, setBoard] = useState({
    title: "",
    content: "",
    hobby: "",
    picture: "",
    writer: "",
    created_at: "",
    _id: "",
  });
  // const [Comments, setComments] = useState({
  //   _id: "",
  //   board_id: "",
  //   writer: "",
  //   input: "",
  // });
  const [Comments, setComments] = useState([]);
  const [Imgurl, setImgurl] = useState("");
  const [Comment, setComment] = useState("");

  const onChangeComment = (e) => setComment(e.target.value);

  console.dir(match.params);
  console.log("board_id : " + board_id);

  useEffect(async () => {
    async function fetchData() {
      console.log("react detailBoard axios post 호출1");
      let res = await axios.post("http://localhost:3001/getDetailBoard", {
        id: board_id,
      });
      console.log("res : ");
      console.dir(res);
      setBoard(res.data.detailBoard);
      console.log(Board);
      setComments(res.data.boardComments);
      setImgurl(
        "http://localhost:3001/uploads/" + res.data.detailBoard.picture
      );
    }
    fetchData();
  }, []);

  return (
    <>
      <Link to="/board">홈으로</Link>
      <br></br>
      <Link to={`/profile/${Board.writer}`}>작성자 : {Board.writer}</Link>
      <h3 style={{ width: "50%", border: "1px solid black" }}>{Board.title}</h3>
      <div style={{ width: "80%", border: "1px solid black" }}>
        {Board.content}
      </div>
      <div>
        <img src={Imgurl} style={{ width: "600px", height: "600px" }}></img>
      </div>
      <div>
        <form method="post" action="http://localhost:3001/writeComment">
          <input
            type="text"
            placeholder="댓글을 작성해 주세요."
            name="comment"
            value={Comment}
            onChange={onChangeComment}
          ></input>
          <input type="hidden" name="writer" value={Board.writer}></input>
          <input type="hidden" name="boardId" value={Board._id}></input>
          <button type="submit">작성완료</button>
        </form>
      </div>
      <div>
        <ol>
          {Comments.map((c) => (
            <li key={c._id}>
              {c.input} <Link to={`/profile/${c.writer}`}>{c.writer}</Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default DetailBoard;
