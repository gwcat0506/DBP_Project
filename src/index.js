const express = require('express')
const json = require('express')
const router = require('./router')

const app = express();
const PORT = 3000;

app.use(json());

app.use("/api", router);

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
