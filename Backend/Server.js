const express = require("express");
const notes = require("./Data/Notes");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const app = express();
dotenv.config();

connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API IS RUNNING");
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// --------------------------deployment------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  console.log("hey");
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//--------------------------------------------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`PORT ${PORT}`));
