import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";

// -- endpoint function from controller
import handleRegister from "./controller/handleRegister.js";
import handleSignin from "./controller/handleSignin.js";
import handleProfile from "./controller/handleProfile.js";
import handleImage from "./controller/handleImage.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "0818",
    database: "smart_brain",
  },
});

// setup custom port here
const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Sign In POST
app.post("/signin", (req, res) => handleSignin(req, res, db, bcrypt));

// Register POST
app.post("/register", (req, res) => handleRegister(req, res, db, bcrypt));

// --Profile GET--
app.get("/profile/:id", (req, res) => handleProfile(req, res, db));

// -- image entries PUT --
app.put("/image", (req, res) => handleImage(req, res, db));

app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}`);
});

//   / --> res = this is working
//   /signin --> POST = success/fail
//   /register --> POST = user(obj)
//   /profile/:userID --> GET = user(obj)
//   /image  --> PUT --> user rank
