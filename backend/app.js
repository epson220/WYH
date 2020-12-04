var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");
var expressSession = require("express-session");
var bodyParser = require("body-parser");
const cors = require("cors");
var multer = require("multer");

const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");
//const UserModel = require("./models/user");

mongoose.connect("mongodb://localhost:27017/local", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongooseAutoInc.initialize(mongoose.connection);

//var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
// app.all("/*", function (req, res, next) {
//   //이미지 권한문제의 핵심 나중에 서버쪽 사람들한테 이걸 붙이라고 해라!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors());
// app.options("*", cors());

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));
// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "me key",
    resave: true,
    saveUninitialized: true,
    //cookie: { maxAge: 30000, secure: false, httpOnly: false },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads");
//   },
//   filename: function (req, file, callback) {
//     var extension = path.extname(file.originalname);
//     var basename = path.basename(file.originalname, extension);
//     callback(null, basename + Date.now() + extension);
//   },
// });

// var upload = multer({
//   storage: storage,
// });

//app.use("/", indexRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
