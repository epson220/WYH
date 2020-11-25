import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3000/profile");
      console.dir(result);
      setUser(result.data);
    };

    fetchData();
  }, []);

  return <div>{user}</div>;
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

export default Profile;
