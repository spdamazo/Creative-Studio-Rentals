const express = require('express');
const path = require('path');
var cors = require('cors');
const apiRoutes = require('./MVC/routes/apiRoutes');
const app = express();
const port = 7777;

console.log("Starting server setup...");

app.use(cors());
app.use(express.static(path.join(__dirname)));

console.log("CORS middleware applied.");
console.log("Static files served from: ", path.join(__dirname));

app.use('/api', apiRoutes);

console.log("API routes configured.");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});