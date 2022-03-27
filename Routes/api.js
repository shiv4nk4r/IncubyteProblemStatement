const apiRouter = require("express").Router();

//Getting all the child routes
const wordRoute = require("./API/words.js");

apiRouter.use("/word", wordRoute);

apiRouter.get("/", (req, res) => {
  res.send("Working");
});

module.exports = apiRouter;
