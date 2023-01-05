const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI || "ATLAS_URI = "mongodb+srv://brijesh:brijesh97s@cluster0.aaak4ma.mongodb.net/?retryWrites=true&w=majority"";
// mongoose.connect(uri);
// const connection = mongoose.connection;
// connection.once("open", () => console.log("Database connected!"));

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.get("/", (req, res) => {
  var dataToSend;
  const python = spawn("python", ["./pythonScript/lineupGen.py", "1"]);
  python.stdout.on("data", function (data) {
    dataToSend = data.toString();
  });
  python.on("close", (code) => {
    res.send(dataToSend);
  });
  // res.send("connected");
});

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log(`server running on port: ${port}`));
