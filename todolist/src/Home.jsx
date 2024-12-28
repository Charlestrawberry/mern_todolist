// import React from "react";
import { useState, useEffect } from "react";
import Create from "./Create";
import { BsCheckCircleFill, BsCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

import "./App.css";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then(() => {
        // location.reload();// not a good practice in react
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(() => {
        // location.reload();
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>TodoList Page</h2>
      <Create onTaskAdded={fetchTodos} />
      {todos.length === 0 ? (
        <div>
          <h2>No Record Baby!!</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="results" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsCheckCircleFill className="icon"></BsCheckCircleFill>
              ) : (
                <BsCircleFill className="icon " />
              )}

              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
