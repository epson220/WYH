import React, { useEffect, useState } from "react";
import axios from "axios";

const DetailBoard = ({ match }) => {
  const { boardId } = match.params;
  const [Board, setBoard] = useState([]);

  useEffect(async () => {
    async function postData() {
      console.log("react detailBoard axios post 호출1");
      axios
        .post("http://localhost:3001/getDetailBoard", { id: boardId })
        .then(function (response) {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    postData();
  });

  useEffect(async () => {
    async function fetchData() {
      console.log("react detailBoard axios post 호출2");
      const result = await axios.post("http://localhost:3001/getDetailBoard");
      console.log(result.data);
      setBoard(result.data);
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
