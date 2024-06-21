import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "../todo/Todo";
import go from "../go";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Todo} />
          <Route path="/go" Component={go} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
