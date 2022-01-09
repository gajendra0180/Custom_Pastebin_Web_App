const express = require("express");
const app = express();
app.set("view engine", "ejs");
const dotenv = require("dotenv");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/document");
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/wastebin", {
// });

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

console.log("dATA",DB)

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("This s an exaksadks");
    console.log(err);
  });

app.get("/", (req, res) => {
  const code = `Welcome to HasuteBin!

Hey, Friends You might be familiar with hastebin and might have used pastebin
many times.This application "HasuteBin" is similar but a lighter version of them. 
Hope you like it. 


#'How to use the application' 

Use the commands in the top right corner
to create a new file to share with others.
To create a new file simply click on  'New' Button on the top
right of the web page.Then Write your content.
To save the file click on the save button and copy the link from the url
and share it with your friends.If you recieved some bin from your
friend and want to edit and improve it, you can click on the
duplicate button to do so.




## Some Quotes to motivate you up:

1) It's not about whether I can, I have to do it. ~ 'Jujutsu Kaisen'.

2) All I Can Do Is Work Hard! That’s The Story Of My Life! ~ 'Demon Slayer'.

3) If I try, I fail. If I don't try, I'm never going to get it. ~ 'Avatar: The Last Airbender'.

4) In All Things, One Cannot Win With Defense Alone. To Win, You Must Attack. ~ 'Death Note' .


## 'Links to the application':

  Github Repo: https://github.com/gajendra0180/Hasutebin_Web_App

  WebApp Link: https://github.com/gajendra0180/Hasutebin_Web_App `;
  // res.render("code_display", { code, language: "plaintext" });
  res.render("code_display", { code });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (e) {
    res.render("new", { value });
  }
  // console.log(value);
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("new", { value: document.value });
  } catch (e) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code_display", { code: document.value, id });
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(3000);
