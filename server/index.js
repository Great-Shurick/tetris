console.log('test');

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const directoryToServe = 'client';
const port = 3443;

app.use('/', express.static(path.join(__dirname, '..', directoryToServe)));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
