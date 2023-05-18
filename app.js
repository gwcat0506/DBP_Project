const express = require("express");
const router = require("./src/router");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", router);
app.get("/", (req, res, next) => {
  res.send("2023 DBP Server");
});

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
});
