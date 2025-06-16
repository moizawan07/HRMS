const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// imports
let dbConnect = require("./config/db");
let authenRoutes = require("./routes/authenRoutes");

// Connect Database
dbConnect();

app.use("/uploads", express.static("./public/uploads"));

app.use('/', authenRoutes)


let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is ruuning in ${PORT}`));
