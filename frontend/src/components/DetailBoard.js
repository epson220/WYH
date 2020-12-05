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
  const [Imgurl, setImgurl] = useState("");

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
      setBoard(res.data);
      console.log(Board);
      setImgurl("http://localhost:3001/uploads/" + res.data.picture);
    }
    fetchData();
  }, []);

  return (
    <>
      <Link to="/profile">작성자 : {Board.writer}</Link>
      <h3 style={{ width: "50%", border: "1px solid black" }}>{Board.title}</h3>
      <div style={{ width: "80%", border: "1px solid black" }}>
        {Board.content}
      </div>
      <div>
        <img src={Imgurl} style={{ width: "600px", height: "600px" }}></img>
      </div>
    </>
  );
};

export default DetailBoard;
