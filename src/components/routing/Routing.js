import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "../todo/Todo";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Todo} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
