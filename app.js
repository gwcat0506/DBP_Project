const express = require("express");
const router = require("./src/router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('src'));

app.use("/", router);
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/src/public/login.html");
});

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
});
