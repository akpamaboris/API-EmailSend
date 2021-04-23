const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();
require("dotenv").config();

const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({
  apiKey: process.env.APIKEY,
  domain: DOMAIN,
});

app.use(formidable());

app.use(cors());
app.get("/", (req, res) => {
  console.log("now started in => '/'");
  res.send("<h1>Hey</h1>");
});

app.post("/post", async (req, res) => {
  const data = await {
    from: "Zeliwipin@gmail.com",
    to: "zeliwipin@gmail.com",
    subject: "New User",
    text: `New User created firstname => ${req.fields.firstName} lastname => ${req.fields.lastName} email => ${req.fields.email}`,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });

  console.log("now started in => /post");
  console.log(req.fields);
  res.json({ message: "reçu 5/5" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
