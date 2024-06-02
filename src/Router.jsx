import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalComp from "./ModelComp/Home";
import Header from "./Header-footer/Header";
import TodoTask from "./TodoTask/TodoTask";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ModalComp />} />
          <Route path="/ModalComp" element={<ModalComp />} />
          <Route path="/TodoTask" element={<TodoTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
