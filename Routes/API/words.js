const wordsRoute = require("express").Router();
const Words = require("../../Model/Words");

const jsonparser = require("body-parser").json();

//Get Words
wordsRoute.get("/read", async (req, res) => {
  await Words.find().then((docs) => {
    const response = {
      count: docs.length,
      words: docs.map((doc) => {
        return {
          id: doc._id,
          Value: doc.Value,
          LastEdited: doc.LastEdited,
          DateCreated: doc.DateCreated,
        };
      }),
    };
    res.status(200).json(response);
  });
});

// Create a new word
wordsRoute.post("/addWord", async (req, res) => {
  if (req?.body?.value === undefined) {
    res.status(400);
    res.send("Invalid");
  }
  let { value } = req?.body;
  value = value.split(" ").join("");

  const word = new Words({
    Value: value,
  });

  try {
    const savedWord = await word.save();
    res.send({ word: word._id });
  } catch (err) {
    res.send(400);
  }
});

//Delete a word
wordsRoute.post("/delete", jsonparser, (req, res) => {
  let { id } = req?.body;
  console.log(req.body);
  Words.deleteOne({ _id: id }).then((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Done", result);
    }
  });
});

//Delete All
wordsRoute.post("/deleteall", (req, res) => {
  Words.deleteMany({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = wordsRoute;

//Update word
wordsRoute.post("/update", async (req, res) => {
  let { id, value } = req?.body;

  await Words.findOneAndUpdate(
    { _id: id },
    {
      Value: value.split(" ").join(""),
      LastEdited: Date.now(),
    }
  ).then((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
