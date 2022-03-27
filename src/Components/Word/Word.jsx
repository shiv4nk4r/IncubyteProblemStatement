import React, { useState, useEffect } from "react";
import ToggleButton from "react-toggle-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCheck,
  faX,
  faTrash,
  faR,
} from "@fortawesome/free-solid-svg-icons";

import { DebounceInput } from "react-debounce-input";
import { updateWord, deleteWord } from "../../API/index";

import { toast } from "react-toastify";

import "./Word.scss";

function Word({ word, createdAt, lastEdited, id, updateData }) {
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  const [wordValue, setWord] = useState(word);

  let toggleIsEdditing = () => {
    setisEditing(!isEditing);
  };

  let handleAutoUpdate = () => {
    setAutoUpdate(!autoUpdate);
    console.log("Changed");
  };

  let updateValue = () => {
    updateWord(id, wordValue);
    if (!autoUpdate) {
      setisEditing(false);
    }
    toast.success("Updated");
    setTimeout(() => {
      updateData();
    }, 300);
  };

  let deleteValue = () => {
    console.log(id);
    deleteWord(id);
    toast.error("Deleted");
    setTimeout(() => {
      updateData();
    }, 1000);
  };

  useEffect(() => {
    setWord(wordValue.split(" ").join(""));
    if (autoUpdate) {
      updateValue();
    }
  }, [wordValue]);

  return (
    <div className="word">
      <div className="upper">
        <div className="timeCreated"></div>
        <div className="autoUpdate">
          <span>Auto Update</span>
          <ToggleButton onClick={handleAutoUpdate} value={autoUpdate} />
        </div>
      </div>
      <div className="middle">
        {isEditing ? (
          <>
            <DebounceInput
              minLength={0}
              debounceTimeout={300}
              placeholder="Edit here"
              value={wordValue}
              onChange={(e) => setWord(e.target.value)}
            />
            {autoUpdate ? (
              <></>
            ) : (
              <FontAwesomeIcon icon={faCheck} onClick={updateValue} />
            )}
            <FontAwesomeIcon icon={faX} onClick={toggleIsEdditing} />
          </>
        ) : (
          <>
            <div className="hero"> {wordValue}</div>
            <FontAwesomeIcon icon={faPen} onClick={toggleIsEdditing} />
          </>
        )}
      </div>
      <div className="lower">
        <div className="timer"></div>
        <div className="remove" onClick={deleteValue}>
          Remove
        </div>
      </div>
    </div>
  );
}

export default Word;
