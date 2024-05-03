import { useState,useEffect } from "react";

import "../assets/css/Home.css";
import Button from "../funcComponents/ui/Button";
import InputBox from "../funcComponents/ui/InputBox";
import Navbar from "../funcComponents/ui/Navbar";
import Footer from "../funcComponents/ui/Footer";
import DataTable from "react-data-table-component";

function Home() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  let [inputDateTemp, setInputDateTemp] = useState("");
  let [inputNameTemp, setInputNameTemp] = useState("");
  let [inputVoteTemp, setInputVoteTemp] = useState(0);
  let [inputIndex, setInputIndex] = useState(-1);

  const handleChangeDate = (event) => {
    setInputDateTemp(event.target.value);
    console.log("date" + event.target.value);
  };
  const handleChangeName = (event) => {
    setInputNameTemp(event.target.value);
    console.log("name" + event.target.value);
  };
  const handleChangeVote = (event) => {
    setInputVoteTemp(event.target.value);
    console.log("vote" + event.target.value);
  };

  const [state, setState] = useState({
    examList:
      localStorage.getItem("examList") === null
        ? []
        : JSON.parse(localStorage.getItem("examList")),
  });

  useEffect(() => {
    localStorage.setItem("examList", JSON.stringify(state.examList));
  },[state.examList])

  const columns = [
    {
      name: "Indice",
      selector: (row,index) => index,
    },
    {
      name: "Nome esame",
      selector: (row) => row.name,
    },
    {
      name: "Voto",
      selector: (row) => (row.vote === 31 ? "30 e lode" : row.vote),
      conditionalCellStyles: [
        {
          when: (row) => row.vote === 31 || row.vote === 30,
          classNames: ["brown"],
        },
        {
          when: (row) => row.vote >= 18 && row.vote < 30,
          classNames: ["green"],
        },
        {
          when: (row) => row.vote < 18,
          classNames: ["red"],
        },
      ],
    },
    {
      name: "Esito",
      selector: (row) =>
        row.vote >= 18
          ? row.vote <= 30
            ? "PROMOSSO"
            : "PROMOSSO"
          : "BOCCIATO",
      conditionalCellStyles: [
        {
          when: (row) => row.vote === 31 || row.vote === 30,
          classNames: ["brown"],
        },
        {
          when: (row) => row.vote >= 18,
          classNames: ["green"],
        },
        {
          when: (row) => row.vote < 18,
          classNames: ["red"],
        },
      ],
    },
    {
      name: "Data",
      selector: (row) => row.date,
    },
  ];

  function getNameExam(nameExam) {
    inputNameTemp = nameExam;
  }

  function getVoteExam(voteExam) {
    inputVoteTemp = voteExam;
    if (inputVoteTemp > 31) {
      window.alert("Il voto massimo accettabile e  di 31 ");
    }
  }

  function getDataExam(dateExam) {
    inputDateTemp = dateExam;
  }

  const getIndex = (index) => {
    inputIndex = index;
  };

  function save() {
    let stateExamList = state.examList;
    if ((inputDateTemp && inputNameTemp) !== "" && inputVoteTemp !== 0) {
      if (inputVoteTemp >= 0 && inputVoteTemp <= 31) {
        state.examList.push({
          index: state.examList.length,
          name: inputNameTemp,
          vote: inputVoteTemp,
          date: inputDateTemp,
        });
      } else {
        setInputDateTemp("");
        setInputVoteTemp(0);
        setInputNameTemp("");
        window.alert("Il voto deve essere compreso tra 0 e 31");
      }
    } else {
      return window.alert("Compila tutti i campi");
    }

    setState({
      ...state, // viene usato per copiare tutti i valori già presenti nell'oggetto state
      examList: stateExamList,
    });
    localStorage.setItem("examList", JSON.stringify(state.examList));
  }

  const handleIndex = (event) => {
    setInputIndex(event.target.value);
    console.log("IndexDelete" + event.target.value);
  };

  const deleteItem = () => {
    let index = inputIndex;
    const updatedExamList = [...state.examList];
    updatedExamList.splice(index, 1);
    setState({
      ...setState, // viene usato per copiare tutti i valori già presenti nell'oggetto state
      examList: updatedExamList,
    });
  };

  return (
    <div className="App" id="ready">
      <Navbar />

      <h1>Inserimento dati esami</h1>

      <div className="section">
        <InputBox
          inputType={"date"}
          inputName={"date"}
          inputRef={"register({required: true})"}
          callbackInput={getDataExam}
          onChange={handleChangeDate}
        />

        <InputBox
          inputType={"text"}
          inputPlaceholder={"inserisci nome esame"}
          inputMaxLength={99}
          callbackInput={getNameExam}
          onChange={handleChangeName}
        />

        <InputBox
          inputType={"number"}
          value={inputVoteTemp}
          inputPlaceholder={"inserisci Voto"}
          inputMaxLength={2}
          callbackInput={getVoteExam}
          inputMax={31}
          inputMin={0}
          onChange={handleChangeVote}
        />

        <div>
          <Button
            label={"Salva"}
            classCss={"save"}
            callbackButton={save}
            setIsTableVisible={isTableVisible}
            isTableVisible={isTableVisible}
          />
        </div>
        <div>
          <InputBox
            inputType={"number"}
            value={inputIndex}
            inputPlaceholder={"Inserisci l'indice"}
            callbackInput={getIndex}
            onChange={handleIndex}
          />
          <Button
            label={"Cancella"}
            classCss={"save"}
            callbackButton={deleteItem}
          />
        </div>
      </div>

      <div className="tableHome">
        <DataTable
          title="Libretto esami"
          noDataComponent="Non ci sono da mostrare :("
          columns={columns}
          data={state.examList}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
