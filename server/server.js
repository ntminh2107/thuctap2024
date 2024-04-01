import express, { response } from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const salt = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "10.144.13.87",
  user: "ipcc_voice",
  password: "ipcc_voice@11x@2018@HCM123",
  database: "thuctap",
});

//test dbconnection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database successfully!");
});

// API signup
app.post("/api/signup", (req, res) => {
  const { username, name, email, password } = req.body;

  // Check if username already exists in the database
  db.query(
    "SELECT * FROM minhusers WHERE username = ?",
    [username],
    (err, usernameRows) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      // If a user with the provided username already exists, return an error
      if (usernameRows.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Check if email already exists in the database
      db.query(
        "SELECT * FROM minhusers WHERE email = ?",
        [email],
        (err, emailRows) => {
          if (err) {
            return res.status(500).json({ error: "Internal server error" });
          }

          // If a user with the provided email already exists, return an error
          if (emailRows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
          }

          // If the username and email are unique, proceed with registration
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: "Error hashing password" });
            }

            const sql =
              "INSERT INTO minhusers(username, name, email, password) VALUES (?, ?, ?, ?)";
            const values = [username, name, email, hash];
            db.query(sql, values, (err, result) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Error inserting data into database", err });
              }
              return res.status(201).json({ Status: "Success" });
            });
          });
        }
      );
    }
  );
});

//API login
app.post("/api/login", (req, res) => {
  const sql = "SELECT * FROM minhusers WHERE username = ?";
  db.query(sql, [req.body.username], (err, data) => {
    if (err) return res.json({ Error: "Login error", err });

    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Login error", err });
          if (response) {
            //jwt token key
            const name = data[0].name;
            const token = jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "success" });
          } else return res.json({ Error: "wrong password" });
        }
      );
    } else {
      return res.json({ Error: "no username existed" });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token.toString());
  if (!token) {
    return res.json({ Error: "you are not autheticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decode) => {
      if (err) {
        return res.json({ Error: "token wrong" });
      } else {
        req.name = decode.name;
        next();
      }
    });
  }
};

app.get("/api", verifyUser, (req, res) => {
  return res.json({ Status: "success", name: req.name });
});

app.get("/api/check", (req, res) => {
  res.json({ message: "Server is running and reachable" });
});
app.listen(8080, () => {
  console.log("server running...");
});
