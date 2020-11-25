import React, { useState } from "react";

const Profile = (login_info) => {
  const [user, setUser] = useState("");

  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    credentials: "same-origin",
    body: JSON.stringify(login_info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.dir(data);
      setUser(data);
    });

  return (
    <div>
      <h1>{user.username}</h1>
      <h1>{user.nicname}</h1>
    </div>
  );
};

export default Profile;
