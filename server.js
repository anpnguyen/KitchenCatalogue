require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const path = require("path");

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/registerUser", require("./routes/api/registerUser.js"));
app.use("/api/authUser", require("./routes/api/authUser"));
app.use("/api/recipe", require("./routes/api/recipe"));
app.use("/api/cookbook", require("./routes/api/cookbook"));

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
