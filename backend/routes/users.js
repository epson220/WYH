var express = require("express");
const passport = require("passport");
var flash = require("connect-flash");
var router = express.Router();
var UserModel = require("../models/user");
var BoardModel = require("../models/board");
var cors = require("cors");
const { ConnectionStates } = require("mongoose");
var path = require("path");

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
      res.redirect("http://localhost:3000/board");
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

router.get("/board", async function (req, res) {
  console.log("/board 패스 요청됨.");
  // console.log("세션:" + req.session.user);
  // console.dir(req.session);
  // try {
  //   let boards = await BoardModel.find({});
  //   console.log(boards);
  //   res.send(boards);
  // } catch (err) {
  //   console.log(err);
  // }

  BoardModel.find({}, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length > 0) {
      console.log(results);
      res.send(results);
    } else {
      res.send(null);
    }
  });
});

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    var extension = path.extname(file.originalname);
    var basename = path.basename(file.originalname, extension);
    callback(null, basename + Date.now() + extension);
  },
});

var upload = multer({
  storage: storage,
});

router.post("/writeBoard", upload.array("photo", 1), function (req, res) {
  console.log("/writeBoard 호출됨.");

  try {
    var files = req.files;

    if (files.length > 0) {
      console.log(files[0]);
    } else {
      console.log("업로드된 파일 x");
    }

    let originalname = "";
    let filename = "";
    let mimetype = "";
    let size = 0;

    if (Array.isArray(files)) {
      console.log("배열에 들어있는 파일 갯수 : %d", files.length);

      for (let i = 0; i < files.length; i++) {
        originalname = files[i].originalname;
        filename = files[i].filename;
        mimetype = files[i].mimetype;
        size = files[i].size;
      }
    } else {
      console.log("파일 개수 : 1");
      originalname = files[0].originalname;
      filename = files[0].name;
      mimetype = files[0].mimetype;
      size = files[0].size;
    }

    console.log(
      "현재 파일 정보 : " +
        originalname +
        ", " +
        filename +
        ", " +
        mimetype +
        ", " +
        size
    );

    let save_board = new BoardModel({
      title: req.body.title,
      content: req.body.content,
      hobby: req.body.hobby,
      picture: filename,
    });

    save_board.save();
    console.log("게시글 저장 완료");
    res.redirect("http://localhost:3000/board");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
