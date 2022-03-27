import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Components/Header/Header";
import Header from "./Components/Header/Header";
import Word from "./Components/Word/Word";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { getWords } from "./API/index";

import "./App.scss";

function App() {
  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);

  let filterIT = () => {
    let tempData = filterFunction(filter);
    setFilteredWords([...tempData]);
  };

  let allWords = async () => {
    let data = await getWords();
    setWords([...data.words]);
  };
  useEffect(() => {
    allWords();
  }, []);

  useEffect(() => {
    filterIT();
  }, [words, filter]);

  const filterFunction = (search) => {
    let filteredData = words;
    if (search === undefined || search == "") {
      return filteredData;
    }

    filteredData = filteredData.filter((data) =>
      data.Value.toLowerCase().includes(search.toLowerCase())
    );

    return filteredData;
  };
  return (
    <div className="App">
      <Header updateData={allWords} />
      <div className="container">
        <div className="filter">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="wordsContainer">
        <div className="container">
          {filteredWords.map(({ Value, id, LastEdited, DateCreated }) => (
            <Word
              key={id}
              word={Value}
              createdAt={DateCreated}
              lastEdited={LastEdited}
              id={id}
              updateData={allWords}
            />
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
