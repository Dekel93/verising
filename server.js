const express = require('express');
const cors = require('cors'); // Import CORS for cross-origin requests
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies in POST requests
app.use(express.json());

// Google Apps Script URL (replace with your actual deployment URL)
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyC-apO9eANrnr7k-op3F67Snmb_oyNPVbbiaoBCr2AIpqul_FTlolanKN2kC6Qn4sFeA/exec';

// Route to handle email submissions
app.post('/submit-email', async (req, res) => {
    const email = req.body.email; // Extract email from request body
    
    if (!email) {
        // Send a 400 response if no email was provided
        return res.status(400).send('Email is required');
    }

    try {
        // Send the email data to Google Sheets via the Apps Script URL
        const response = await axios.post(googleScriptURL, { email });
        
        // Log success message and send response to client
        console.log('Email sent to Google Sheets:', response.data);
        res.send('Email saved successfully');
    } catch (error) {
        // Log and send an error message if the request fails
        console.error('Error sending email to Google Sheets:', error);
        res.status(500).send('There was an error saving the email');
    }
});

// Start the server on specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
