const express = require("express");
const app = express();
const tasks = require("../server/routes/tasks");
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./Middleware/not-found");

// middleware
// const corsOptions = {
//   origin: "http://localhost:3000/" 
// }

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

app.use("/tasks", tasks);
app.use(notFound);

const PORT= process.env.PORT || 8000;
const startDbAndServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server stared on ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

startDbAndServer();
