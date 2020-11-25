var express = require("express");
const passport = require("passport");
var flash = require("connect-flash");
var router = express.Router();
var UserModel = require("../models/user");

let LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      console.log("passport의 local-login 호출됨." + email + ", " + password);
      try {
        let u = await UserModel.findOne({ email: email, password: password });
        if (!u) {
          console.log("이메일과 비밀번호가 일치하지 않습니다.");
          return done(
            null,
            false,
            req.flash("loginMessage", "이메일과 비밀번호를 다시 확인해 주세요.")
          );
        }
        console.log("계정과 비밀번호가 일치함");
        console.log(u);
        return done(null, user);
      } catch (err) {
        console.log("로그인 인증과정에서 에러발생");
        console.log(err);
        return done(err);
      }
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      var paramName = req.body.name || req.query.name;
      console.log(
        "passport의 local-signup 호출됨 : " +
          email +
          ", " +
          password +
          ", " +
          paramName
      );
      try {
        let u = await UserModel.findOne({ email: email });
        if (u) {
          console.log("기존에 계정이 있음.");
          return done(
            null,
            false,
            req.flash("signupMessage", "계정이 이미 있습니다.")
          );
        } else {
          let user = new UserModel({
            email: email,
            password: password,
            name: paramName,
          });
          let saved = await user.save();
          if (saved) {
            console.log("사용자 데이터 추가함.");
            return done(null, user);
          }
        }
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser() 호출됨.");
  console.dir(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializeUser()호출됨.");
  console.dir(user);

  done(null, user);
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local-login", function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (user) {
      console.log("req.user : " + JSON.stringify(user));
      let json = JSON.parse(JSON.stringify(user));

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
      });
    } else {
      console.log("login fail!!!!!!!!!!!!!!!");
      res.send([]);
    }
  })(req, res, next);
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = router;
