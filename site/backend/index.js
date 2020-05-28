// EXPRESS DEPENDENCIES
const express = require("express");
const path = require("path");
const app = express();

// BACKEND API ROUTES
app.use(express.static(path.join(__dirname + "/../frontend/build")));

const email_route = require("./api/routes/email_route");
app.use("/api/email", email_route);

// REDIRECT TO REACT APP FOR ALL OTHER ROUTES
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
});

// PORT AND ERROR HANDLING
PORT = process.env.PORT || 3001;
app.listen(PORT, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("BACKEND RUNNING ON PORT " + PORT);
  }
});
