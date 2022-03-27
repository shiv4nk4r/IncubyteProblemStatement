import axios from "axios";

const serverAddress = "https://loanmanagerapi.herokuapp.com";

//get all words
let getWords = async () => {
  let data;
  await axios.get(`${serverAddress}/api/word/read`).then((res) => {
    data = res.data;
  });
  return await data;
};

//create word
let createWord = (value) => {
  axios
    .post(`${serverAddress}/api/word/addWord`, { value: value })
    .then((res) => {
      if (res === "success") {
        return true;
      } else {
        return false;
      }
    });
};

//update a word
let updateWord = (id, value) => {
  axios
    .post(`${serverAddress}/api/word/update`, { id: id, value: value })
    .then((res) => {
      if (res === "success") {
        return true;
      } else {
        return false;
      }
    });
};

//delete a word
let deleteWord = (id) => {
  axios.post(`${serverAddress}/api/word/delete`, { id: id }).then((res) => {
    if (res === "success") {
      return true;
    } else {
      return false;
    }
  });
};

//delete all words
let deleteAll = () => {
  axios.post(`${serverAddress}/api/word/deleteall`).then((res) => {
    if (res === "success") {
      return true;
    } else {
      return false;
    }
  });
};

export { getWords, createWord, updateWord, deleteAll, deleteWord };
