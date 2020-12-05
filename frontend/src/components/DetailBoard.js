import React, { useEffect, useState } from "react";
import axios from "axios";

const DetailBoard = ({ match }) => {
  const { board_id } = match.params;
  const [Board, setBoard] = useState([]);
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
    }
    fetchData();
  }, []);

  return (
    <div>
      {Board.map((b) => (
        <div>
          <div>{b.title}</div> <div>{b.content}</div>
        </div>
      ))}
    </div>
  );
};

export default DetailBoard;
