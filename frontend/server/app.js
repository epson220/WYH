//var createError = require("http-errors");
var http = require("http");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
//var logger = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");
var expressSession = require("express-session");
var bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
//const mongooseAutoInc = require("mongoose-auto-increment");
//const UserModel = require("./models/user");

//디비객체
var database;
//디비스키마객체
var UserSchema;
//디비모델객체
var UserModel;

function connectDB() {
  //데이터베이스 연결 정보
  var databaseUrl = "mongodb://localhost:27017/local";

  console.log("데이터베이스 연결을 시도합니다.");
  mongoose.Promise = global.Promise;
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "mongoose connection error")
  );
  database.on("open", function () {
    console.log("데이터베이스에 연결되었습니다. : " + databaseUrl);

    // UserSchema = mongoose.Schema({
    //     id: String,
    //     name: String,
    //     password: String
    // });

    UserSchema = mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String },
      created_at: { type: Date, default: Date.now },
      deleted_at: { type: Date },
      user_id: { type: Number, default: 0, unique: true },
    });

    UserSchema.static("findById", function (id, callback) {
      return this.find({ id: id }, callback);
    });

    UserSchema.static("findAll", function (callback) {
      return this.find({}, callback);
    });

    console.log("UserSchema정의함.");

    UserModel = mongoose.model("users2", UserSchema);
    console.log("UserModel 정의함.");
  });

  database.on("disconnected", function () {
    console.log("연결이 끊어졌습니다. 5초 후 다시 연결합니다.");
    setInterval(connectDB, 5000);
  });
}

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//mongooseAutoInc.initialize(mongoose.connection);

//var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongooseAutoInc.initialize(mongoose.connection);

// UserSchema.plugin(mongooseAutoInc.plugin, "user");

// var UserModel = mongoose.model("user", UserSchema);

var app = express();
app.set("port", 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // server의 url이 아닌, 요청하는 client의 url
    credentials: true,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//app.use(logger("dev"));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "me key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30000, secure: false, httpOnly: false },
  })
);
//app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
    function (req, email, password, done) {
      console.log("local-signup 실행됨.");
      var paramName = req.body.nicname || req.query.nicname;
      console.log(
        "passport의 local-signup 호출됨 : " +
          email +
          ", " +
          password +
          ", " +
          paramName
      );
      UserModel.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          console.log("기존에 계정이 있음.");
          return done(
            ull,
            false,
            req.flash("signupMessage", "계정이 이미 있습니다.")
          );
        } else {
          var user = new UserModel({
            email: email,
            password: password,
            name: paramName,
          });

          user.save(function (err) {
            if (err)
              return done(
                null,
                false,
                req.flash("signupMessage", "사용자 정보 저장 시 에러발생")
              );
            console.log("사용자 데이터 추가함.");
            return done(null, user);
          });
        }
      });
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

var router = express.Router();

// router.post(
//   "/login",
//   passport.authenticate("local-login", {
//     successRedirect: "/profile",
//     failureRedirect: "http://localhost:3000/login",
//     failureFlash: true,
//   })
// );

// router.route("/signup").post(
//   passport.authenticate("local-signup", {
//     successRedirect: "/profile",
//     failureRedirect: "http://localhost:3000/signup",
//     failureFlash: true,
//   })
// );

router.route("/signup").post(function (req, res, next) {
  console.dir(req.body);
  console.dir(req.user);
});

// router.route("/signup").post(function (req, res) {
//   console.log(
//     "signup " + req.body.username + req.body.password + req.body.nicname
//   );
// });

router.get("/profile", function (req, res) {
  console.log("/profile 패스 요청됨.");
  console.log(req.user);

  if (!req.user) {
    console.log("사용자 인증이 안 된 상태임.");
    res.redirect("/");
    return;
  }

  console.log("사용자 인증된 상태임");
  if (Array.isArray(req.user)) {
    res.send(req.user[0]._doc);
  } else {
    res.send(req.user);
  }
});

app.use("/", router);

//app.use("/", indexRouter);
//app.use("/", usersRouter);

http.createServer(app).listen(app.get("port"), function () {
  console.log("익스프레스 서버를 시작했습니다. : " + app.get("port"));

  connectDB();
});
