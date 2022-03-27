import React, { useState } from "react";
import "./Header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

import { createWord, deleteAll } from "../../API/index";

function Header({ updateData }) {
  const [word, setWord] = useState("");
  const [AddWord, setAddWord] = useState(false);

  let toggleAddWord = () => {
    setAddWord(!AddWord);
  };

  let addThis = async () => {
    createWord(word);
    await toggleAddWord();
    toast.success("Added Succesfully");
    setWord("");
    setTimeout(() => {
      updateData();
    }, 1000);
  };

  let deleteAllFunc = () => {
    deleteAll();
    toast.error("Deleted All");
    setTimeout(() => {
      updateData();
    }, 1000);
  };

  return (
    <div className="Header">
      <div className="container">
        <div className="title">All Words</div>
        <div className="right">
          {AddWord ? (
            <div className="input">
              <input
                placeholder="Type Here . . ."
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <FontAwesomeIcon icon={faCheck} onClick={addThis} />
            </div>
          ) : (
            <div className="create" onClick={toggleAddWord}>
              <FontAwesomeIcon icon={faPlus} /> Add Word
            </div>
          )}
          <div className="delete" onClick={deleteAllFunc}>
            Delete All
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
