const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  console.log("Success login ", req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get('/google/callback',passport.authenticate('google'), (req, res) => {
//   console.log("user",req.user)
//   res.send(req.user);
// });

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    session: false,
  })
);


// router.post('/email', (req, res)=>{
//   console.log("user", req.header())
  // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // if(req.body.email.match(mailformat))
  // {
  //     console.log("valid")
  //     res.send("Valid email address!");
  // }
  // else
  // {
  //     console.log("Invalid")
  //     res.send("You have entered an invalid email address!");
  // }
  // if(CheckUser(req.body))
  // {
  //     let token = jwt.sign({
  //         data: req.body
  //         }, 'secret', { expiresIn: '1h' });
  //     res.cookie('jwt', token)
  //     res.send(`Log in success ${req.body.email}`)
  // }else{
  //     res.send('Invalid login credentials')
  // }
// })

module.exports = router