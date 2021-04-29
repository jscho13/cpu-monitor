const express = require('express');
const app = express();
const port = 3000;

const os = require("os");

app.get('/', (req, res) => {
  const cpus = os.cpus().length
  const loadAverage = os.loadavg()[0] / cpus;
  res.send(`Hello Leslie ${loadAverage}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
