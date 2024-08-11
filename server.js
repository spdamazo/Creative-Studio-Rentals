const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();
const port = 7777;

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/studios-images', express.static(path.join(__dirname, 'studios-images')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Set the path for the data file
const dataFilePath = path.join(__dirname, 'data.json');

// Function to read data from the JSON file
function readData() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

// Function to write data to the JSON file
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET endpoint - Retrieve data
app.get('/api/data', (req, res) => {
  try {
    const data = readData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while retrieving data.' });
  }
});

// POST endpoint - Add new data
app.post('/api/data', (req, res) => {
  try {
    const newData = req.body;
    const data = readData();
    data.push(newData);
    writeData(data);
    res.json({ success: true, message: 'Data successfully added.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while adding data.' });
  }
});

// PUT endpoint - Update existing data
app.put('/api/data/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = updatedData;
      writeData(data);
      res.json({ success: true, message: 'Data successfully updated.' });
    } else {
      res.status(404).json({ success: false, message: 'Data not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while updating data.' });
  }
});

// DELETE endpoint - Delete data
app.delete('/api/data/:id', (req, res) => {
  try {
    const id = req.params.id;
    const data = readData();
    const newData = data.filter(item => item.id !== id);
    writeData(newData);
    res.json({ success: true, message: 'Data successfully deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while deleting data.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});