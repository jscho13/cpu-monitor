const express = require('express');
const app = express();
const port = 3000;

const os = require("os");

app.get('/load', (req, res) => {
  const cpus = os.cpus().length
  const loadAverage = os.loadavg()[0] / cpus;

  console.log(`polling: ${loadAverage}`);
  res.send(loadAverage.toString());
})

app.listen(port, () => {
  console.log(`Polling service listening at http://localhost:${port}`)
})
