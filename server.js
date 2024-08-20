const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7777;

// Middleware to parse JSON bodies with increased size limit
app.use(express.json({ limit: '10mb' }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Path to the JSON files
const usersFilePath = path.join(__dirname, 'data', 'users.json');
const listingsFilePath = path.join(__dirname, 'data', 'listings.json');

// Utility function to read JSON files
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};

// Utility function to write JSON files
const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

// Route to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await readJsonFile(usersFilePath);
        res.json(users);
    } catch (error) {
        console.error('Error reading users data:', error);
        res.status(500).json({ success: false, message: 'Unable to read users data' });
    }
});

// Route to fetch all studio listings
app.get('/api/studios', (req, res) => {
    fs.readFile(listingsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Unable to read listings data' });
        }
        res.json(JSON.parse(data));
    });
});

// Route to update a specific studio listing
app.put('/api/studios/:name', (req, res) => {
    const name = req.params.name;
    const updatedListing = req.body;

    // Load existing listings
    fs.readFile('data/listings.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error' });

        let listings = JSON.parse(data);
        const index = listings.findIndex(listing => listing.name === name);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }

        // Update the listing
        listings[index] = updatedListing;

        // Save updated listings
        fs.writeFile('data/listings.json', JSON.stringify(listings, null, 2), (err) => {
            if (err) return res.status(500).json({ success: false, message: 'Server error' });
            res.json({ success: true });
        });
    });
});

// Route to update all studio listings
app.put('/api/studios', async (req, res) => {
    const updatedListings = req.body;

    if (!Array.isArray(updatedListings)) {
        return res.status(400).json({ success: false, message: 'Invalid data format' });
    }

    try {
        await writeJsonFile(listingsFilePath, updatedListings);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating listings:', error);
        res.status(500).json({ success: false, message: 'Unable to update listings' });
    }
});

// Route to delete a specific studio listing
app.delete('/api/studios/:name', async (req, res) => {
    const name = req.params.name;

    try {
        let listings = await readJsonFile(listingsFilePath);
        const updatedListings = listings.filter(listing => listing.name !== name);
        await writeJsonFile(listingsFilePath, updatedListings);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ success: false, message: 'Unable to delete listing' });
    }
});

// Route to register a new user
app.post('/api/register', async (req, res) => {
    const newUser = req.body;

    // Validate new user data
    if (!newUser.role || !newUser.name || !newUser.phone || !newUser.email) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const users = await readJsonFile(usersFilePath);
        const userExists = users.some(user => user.email === newUser.email);

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        users.push(newUser);
        await writeJsonFile(usersFilePath, users);
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({ success: false, message: 'Unable to register new user' });
    }
});

// Route to update user profile and related listings
app.put('/api/update-profile', async (req, res) => {
    const updatedProfile = req.body;

    // Validate updated profile data
    if (!updatedProfile.name || !updatedProfile.phone || !updatedProfile.email || !updatedProfile.role) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        let users = await readJsonFile(usersFilePath);
        users = users.map(user => user.email === updatedProfile.email ? updatedProfile : user);
        await writeJsonFile(usersFilePath, users);

        let listings = await readJsonFile(listingsFilePath);
        listings = listings.map(listing => {
            if (listing.ownerEmail === updatedProfile.email) {
                listing.ownerName = updatedProfile.name;
                listing.ownerPhone = updatedProfile.phone;
            }
            return listing;
        });
        await writeJsonFile(listingsFilePath, listings);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating profile and listings:', error);
        res.status(500).json({ success: false, message: 'Unable to update profile and listings' });
    }
});

// Route to add a new listing
app.post('/api/add-listing', async (req, res) => {
    const newListing = req.body;

    // Validate new listing data
    if (!newListing.name || !newListing.address || !newListing.type || !newListing.price || !newListing.ownerEmail) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const listings = await readJsonFile(listingsFilePath);
        listings.push(newListing);
        await writeJsonFile(listingsFilePath, listings);
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error adding new listing:', error);
        res.status(500).json({ success: false, message: 'Unable to add new listing' });
    }
});

// Route to fetch all listings (deprecated or for testing)
app.get('/api/listings', (req, res) => {
    const listings = require('./data/listings.json');
    res.json(listings);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
