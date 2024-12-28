const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const TodoModel = require("./Model/Todomodel");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003;
const connecteddb = process.env.CONNECT_DB;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Mongoose is connected successfully"))
  .catch((err) => console.error("MongoDB connection error", err));

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app
  .listen(PORT, () => {
    console.log(`server running on localhost:3001`);
  })
  .on("error", (err) => {
    console.error(`Server is down baby!`, err.message);
  });
