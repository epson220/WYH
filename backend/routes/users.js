var express = require("express");
const passport = require("passport");
var flash = require("connect-flash");
var router = express.Router();
var UserModel = require("../models/user");

// let LocalStrategy = require("passport-local").Strategy;

// passport.use(
//   "local-login",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async function (req, email, password, done) {
//       console.log("passport의 local-login 호출됨." + email + ", " + password);
//       try {
//         let u = await UserModel.findOne({ email: email, password: password });
//         if (!u) {
//           console.log("이메일과 비밀번호가 일치하지 않습니다.");
//           return done(
//             null,
//             false
//             //req.flash("loginMessage", "이메일과 비밀번호를 다시 확인해 주세요.")
//           );
//         }
//         console.log("계정과 비밀번호가 일치함");
//         console.log(u);
//         return done(null, user);
//       } catch (err) {
//         console.log("로그인 인증과정에서 에러발생");
//         console.log(err);
//         return done(err);
//       }
//     }
//   )
// );

// passport.use(
//   "local-signup",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async function (req, email, password, done) {
//       console.log("local-signup 실행됨.");
//       var paramName = req.body.name || req.query.name;
//       console.log(
//         "passport의 local-signup 호출됨 : " +
//           email +
//           ", " +
//           password +
//           ", " +
//           paramName
//       );
//       try {
//         let u = await UserModel.findOne({ email: email });
//         if (u) {
//           console.log("기존에 계정이 있음.");
//           return done(
//             null,
//             false
//             //req.flash("signupMessage", "계정이 이미 있습니다.")
//           );
//         } else {
//           let user = new UserModel({
//             email: email,
//             password: password,
//             name: paramName,
//           });
//           let saved = await user.save();
//           if (saved) {
//             console.log("사용자 데이터 추가함.");
//             return done(null, user);
//           }
//         }
//       } catch (err) {
//         console.log(err);
//         return done(err);
//       }
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   console.log("serializeUser() 호출됨.");
//   console.dir(user);
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   console.log("deserializeUser()호출됨.");
//   console.dir(user);

//   done(null, user);
// });

// router.post(
//   "/login",
//   passport.authenticate("local-login", {
//     successRedirect: "http://localhost:3001/profile",
//     failureRedirect: "http://localhost:3000/login",
//     failureFlash: true,
//   })
// );

// router.post(
//   "/signup",
//   passport.authenticate("local-signup", {
//     successRedirect: "http://localhost:3001/profile",
//     failureRedirect: "http://localhost:3000/signup",
//     failureFlash: true,
//   })
// );

router.post("/signup", async function (req, res) {
  var paramEmail = req.body.email;
  var paramPassword = req.body.password;
  var paramNicname = req.body.nicname;
  try {
    let checkDuplicated = await UserModel.find({ email: paramEmail });

    if (checkDuplicated.length > 0) {
      console.dir(checkDuplicated);
      console.log("중복된 아이디입니다.");
      res.redirect("http://localhost:3000/signup");
    } else {
      let added_user = new UserModel({
        email: paramEmail,
        password: paramPassword,
        name: paramNicname,
      });

      added_user.save();
      console.log("회원가입 완료!");
      res.redirect("http://localhost:3000/login");
    }
  } catch (err) {
    console.log("회원가입 중 에러발생!");
    console.error(err);
  }
});

router.post("/login", async function (req, res) {
  var paramEmail = req.body.email;
  var paramPassword = req.body.password;

  if (req.session.user) {
    console.log("이미 로그인되어 있습니다.");
    res.redirect("/board");
  } else {
    req.session.user = {
      id: paramEmail,
      authorized: true,
    };

    let found_user = await UserModel.find({
      email: paramEmail,
      password: paramPassword,
    });

    if (found_user) {
      console.log("이메일과 비번이 일치하는 사용자 찾음 ");
      res.redirect("/board");
    } else {
      console.log("이메일과 비밀번호를 다시 확인해주세요.");
      res.redirect("http://localhost:3000/login");
    }
  }
});

router.get("/logout", function (req, res) {
  console.log("/logout 호출됨.");

  if (req.session.user) {
    console.log("로그아웃합니다.");
    req.session.destroy(function (err) {
      if (err) {
        throw err;
      }

      console.log("세션삭제&로그아웃");
      res.redirect("https://localhost:3000/login");
    });
  } else {
    console.log("아직 로그인되어있지않습니다.");
    res.redirect("https://localhost:3000/login");
  }
});

router.get("/board", function (req, res) {
  console.log("/board 패스 요청됨.");
  // console.log("세션:" + req.session.user);
  // console.dir(req.session);
});

module.exports = router;
