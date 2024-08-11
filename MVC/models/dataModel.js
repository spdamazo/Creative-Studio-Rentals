// MVC/models/dataModel.js
const fs = require('fs');
const path = require('path');

// Set the path for the data file
const dataFilePath = path.join(__dirname, '../../data/data.json');

// Function to read data from the JSON file
exports.readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Function to write data to the JSON file
exports.writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};