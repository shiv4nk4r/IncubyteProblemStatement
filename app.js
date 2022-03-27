// Getting the dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//Imporiting routes
const apiRoute = require("./Routes/api");

//Middleswares
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

//Connecting the DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

//Configring Routes
app.use("/api", apiRoute);
app.get("/", (req, res) => {
  res.send("This is an API made for INCUBYTE test by Shivankar Sharma");
});
//Port Configration
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
