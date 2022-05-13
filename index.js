const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');

const bodyParser    = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(()=>console.log('connected'))
.catch(e=>console.log("Error", e));

app.use(
  cookieSession({ name: "session", keys: ["aagu"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.post("/email", (req, res)=>{
  console.log("user", req.body)
})

app.listen("5000", () => {
  console.log("Server is running!");
});
