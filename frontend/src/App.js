import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Board from "./components/Board";
import WriteBoard from "./components/WriteBoard";

//class App extends Component {
// state = {
//   users: [],
// };
// componentDidMount() {
//   fetch("/users")
//     .then((res) => res.json())
//     .then((users) => this.setState({ users }));
// }
// render() {
//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {this.state.users.map((user) => (
//           <li key={user.id}>{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//}

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/board" component={Board} />
      <Route path="/writeBoard" component={WriteBoard} />
    </div>
  );
};

export default App;
