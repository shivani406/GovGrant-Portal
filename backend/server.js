const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the bridge from Step 2
require('dotenv').config();

const app = express();
app.use(cors()); // Allows Angular (port 4200) to talk to Node (port 3000)
app.use(express.json());

// --- API ROUTES ---

// 1. Get all Grants (for Citizen Dashboard)
app.get('/api/grants', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Grants');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get Citizen Details (for Citizen Profile)
app.get('/api/citizen/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Citizen WHERE citizen_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('Citizen not found');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Submit a Grant Application
app.post('/api/applications', async (req, res) => {
    try {
        const data = req.body;
        
        const query = `
            INSERT INTO Application_form_data 
            (citizen_id, grant_id, applicant_name, applicant_email, applicant_phone_number, 
             applicant_gender, applicant_age, applicant_address, applicant_income, 
             applicant_profession, applicant_verification_type, applicant_verification_number, 
             applied_at, applicant_disability_status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.citizen_id, 
            data.grant_id, 
            data.applicant_name, 
            data.applicant_email, 
            data.applicant_phone_number, 
            data.applicant_gender, 
            data.applicant_age, 
            data.applicant_address, 
            data.applicant_income, 
            data.applicant_profession, 
            data.applicant_verification_type, 
            data.applicant_verification_number, 
            data.applied_at, 
            data.applicant_disability_status
        ];

        const [result] = await db.query(query, values);
        
        res.status(201).json({ 
            message: "✅ Application submitted successfully!", 
            applicationId: result.insertId 
        });
    } catch (err) {
        console.error("❌ Database Error:", err.message);
        res.status(500).json({ error: "Failed to save application. Details: " + err.message });
    }
});

// Citizen Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { full_name, email, password, phone_number } = req.body;
        
        const query = `INSERT INTO Citizen (full_name, email, password, phone_number) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(query, [full_name, email, password, phone_number]);
        
        res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: "Email already exists!" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Backend Server running on http://localhost:${PORT}`);
});