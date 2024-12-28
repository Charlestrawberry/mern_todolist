import { useState } from "react";
import axios from "axios";

const Create = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return; //to prevent empty todos

    axios
      .post("http://localhost:3001/add", { task: task })
      .then(() => {
        onTaskAdded();
        setTask(""); //reset to empty todos after pressing enter
      })
      .catch((err) => console.log(err));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        value={task}
        onKeyDown={handleKeyPress}
        placeholder="Enter your task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
