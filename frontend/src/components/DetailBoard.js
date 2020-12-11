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
  const [reply, setReply] = useState("");
  const [Replies, setReplies] = useState([]);

  const onChangeComment = (e) => setComment(e.target.value);
  const onChangeReply = (e) => setReply(e.target.value);

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
      setReplies(res.data.boardReplies);
      if (
        res.data.detailBoard.picture != "" &&
        res.data.detailBoard.picture != null
      ) {
        console.log("이미지있음");
        setImgurl(
          "http://localhost:3001/uploads/" + res.data.detailBoard.picture
        );
      } else {
        console.log("이미지없음");
        setImgurl("");
      }
    }
    fetchData();
  }, []);

  const handleReply = async (id) => {
    const c_id = id;
    async function fetchReplies(cid) {
      console.log("fetch reply axios 호출");
      const result = await axios.post("http://localhost:3001/postReply");
      console.log(result);
      setReplies(result);
    }
    fetchReplies(c_id);
  };

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
        {Imgurl && (
          <img src={Imgurl} style={{ width: "600px", height: "600px" }}></img>
        )}
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
              {c.input} <Link to={`/profile/${c.writer}`}>{c.writer}</Link>{" "}
              {Replies.map((re) => {
                if (re.comment_id == c._id) {
                  return (
                    <div key={re._id}>
                      - {re.reply_content}{" "}
                      <Link to={`/profile/${re.writer}`}>{re.writer}</Link>
                    </div>
                  );
                }
              })}
              <form method="post" action="http://localhost:3001/postReply">
                <input type="text" name="reply"></input>
                <input type="hidden" name="comment_id" value={c._id}></input>
                <input type="hidden" name="boardId" value={Board._id}></input>
                <input type="hidden" name="writer"></input>
                <button type="submit">답글작성</button>
              </form>
              {/* <input type="text" value={reply} onChange={onChangeReply}></input>
              <input type="hidden" value={c._id}></input>
              <button onClick={() => handleReply(c._id)}>답글작성</button> */}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default DetailBoard;
