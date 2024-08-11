// MVC/controllers/apiController.js
const dataModel = require('../models/dataModel');

// GET - Retrieve data
exports.getData = (req, res) => {
  try {
    const data = dataModel.readData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while retrieving data.' });
  }
};

// POST - Add new data
exports.addData = (req, res) => {
  try {
    const newData = req.body;
    const data = dataModel.readData();
    data.push(newData);
    dataModel.writeData(data);
    res.json({ success: true, message: 'Data successfully added.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while adding data.' });
  }
};

// PUT - Update existing data
exports.updateData = (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const data = dataModel.readData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = updatedData;
      dataModel.writeData(data);
      res.json({ success: true, message: 'Data successfully updated.' });
    } else {
      res.status(404).json({ success: false, message: 'Data not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while updating data.' });
  }
};

// DELETE - Delete data
exports.deleteData = (req, res) => {
  try {
    const id = req.params.id;
    const data = dataModel.readData();
    const newData = data.filter(item => item.id !== id);
    dataModel.writeData(newData);
    res.json({ success: true, message: 'Data successfully deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while deleting data.' });
  }
};