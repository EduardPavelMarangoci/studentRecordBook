import React from 'react';
import { Routes, Route, } from "react-router-dom";
import  Home  from "./screens/Home";
import  ListExam  from "./screens/ListExam";

function Routing(){
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/listaEsami' element={<ListExam/>} />
        </Routes>
    )
}
export default Routing;