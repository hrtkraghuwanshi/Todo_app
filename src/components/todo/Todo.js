import React, { Fragment, useEffect, useState } from "react";
import "./todo.css";
const Todo = () => {
  const [inputvalue, setinputvalue] = useState("");
  const [inputarray, setinputarray] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");
  //   console.log(inputarray);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setinputarray(storedTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(inputarray));
  }, [inputarray]);
  const handleaddtask = () => {
    if (!inputvalue) {
      alert("Please Enter Task");
      return;
    }
    const newTask = {
      description: inputvalue,
      createdAt: new Date().toLocaleString(),
    };
    setinputarray([newTask, ...inputarray]);
    setinputvalue("");
  };

  const handleremove = (index) => {
    const updatedtodos = inputarray.filter((val, i) => {
      return i !== index;
    });
    // console.log(updatedtodos);
    setinputarray(updatedtodos);
  };
  const handleSaveEdit = (index) => {
    if (editText === "") {
      alert("Please Enter Task ");
      return;
    }
    const updatedTodos = [...inputarray];
    updatedTodos[index] = {
      ...updatedTodos[index],
      description: editText,
    };
    setinputarray(updatedTodos);
    setEditIndex(-1);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(inputarray[index].description);
  };
  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditText("");
  };
  const keypress = (event) => {
    // console.log(event);
    if (event.code === "Space") event.preventDefault();
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>TODO App</h1>
          <div className="todo-input">
            <input
              type="text"
              placeholder="Add a new task"
              value={inputvalue}
              onKeyDown={(e) => keypress(e)}
              onChange={(e) => setinputvalue(e.target.value)}
            />
            <button onClick={() => handleaddtask()}>Add</button>
          </div>
          <ul className="todo-list">
            {inputarray && inputarray.length > 0 ? (
              inputarray.map((todo, index) => (
                <Fragment key={index}>
                  <li>
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editText}
                          onKeyDown={(e) => keypress(e)}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <button onClick={() => handleSaveEdit(index)}>
                          Save
                        </button>
                        <button onClick={() => handleCancelEdit()}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {todo.description}
                        <div className="created">
                          &nbsp;(Created at:{todo.createdAt}){" "}
                        </div>
                        <button onClick={() => handleremove(index)}>
                          Remove
                        </button>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                      </>
                    )}
                  </li>
                </Fragment>
              ))
            ) : (
              <p>No Task Added</p>
            )}
          </ul>
          {inputarray.length > 0 && (
            <button onClick={() => setinputarray([])} className="button">
              Delete All
            </button>
          )}
        </header>
      </div>
    </>
  );
};

export default Todo;
