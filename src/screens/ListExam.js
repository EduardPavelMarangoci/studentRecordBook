import React from "react";
import { useState } from "react";
import "../assets/css/ListExam.css";
import Button from "../funcComponents/ui/Button";
import DataTable from "react-data-table-component";
import Navbar from "../funcComponents/ui/Navbar";
import Footer from "../funcComponents/ui/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function ListExam() {
  const [state] = useState({
    examList:
      localStorage.getItem("examList") === null
        ? []
        : JSON.parse(localStorage.getItem("examList")),
  });
  const [somma, setSomma] = useState(0);
  if (isNaN(somma)) {
    setSomma(0);
  }
  const [numeroE, setNumeroE] = useState(0);
  const [bocciature, setBocciature] = useState(0);
  const [eccellenze, setEccellenze] = useState(0);

  const [isTableVisible, setIsTableVisible] = useState(false);

  const columns = [
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

  function media() {
    let sum = 0;
    let m = 0;
    let count = 0;
    let countB = 0;
    let countE = 0;
    // Check if state.examList.examList is empty
    if (state.examList.length === 0) {
      console.warn("state.examList is empty");
      return; // Exit the function early if state.examList.examList is empty
    }
    console.log("Type of state.examList:", typeof state.examList);
    state.examList.forEach((examList) => {
      count = count + 1;
      sum = sum + parseInt(examList.vote);
      if (parseInt(examList.vote) < 18) {
        countB = countB + 1;
      } else if (parseInt(examList.vote) >= 30) {
        countE = countE + 1;
      }
    });
    m = (sum / count).toFixed(2);
    setBocciature(countB);
    setEccellenze(countE);
    setNumeroE(count);
    setSomma(m);
  }

  return (
    <>
      <Navbar />
      <section>
        <div className="table">
          <DataTable
            title="Libretto esami"
            noDataComponent="Non ci sono dati da mostrare :("
            columns={columns}
            data={state.examList}
          />
        </div>
        {isTableVisible ? (
          <table class="table">
            <thead>
              <tr>
                <td className="colt">Media</td>
                <td className="colt">N° esami</td>
                <td className="colt">N° bocciature</td>
                <td className="colt">N° eccellenze</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{somma}</td>
                <td>{numeroE}</td>
                <td>{bocciature}</td>
                <td>{eccellenze}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div></div>
        )}

        <p>
          <Button
            label={"Visualizza statistiche"}
            classCss={"save"}
            callbackButton={media}
            setIsTableVisible={isTableVisible}
            isTableVisible={isTableVisible}
          />
        </p>
      </section>

      <Footer />
    </>
  );
}
export default ListExam;
