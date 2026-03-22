const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the bridge from Step 2
require('dotenv').config();

const app = express();
app.use(cors()); // Allows Angular (port 4200) to talk to Node (port 3000)
app.use(express.json());

// --- API ROUTES ---

// 1. Citizen Dashboard Route
app.get('/api/grants', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Grants');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Citizen Profile Route
app.get('/api/citizen-profile/:id', async (req, res) => {
    try {
        const citizenId = req.params.id;

        // 1. Get Citizen Basic Info
        const [userRows] = await db.query(
            'SELECT citizen_id, citizen_name, citizen_email, citizen_phone_number FROM citizen WHERE citizen_id = ?', 
            [citizenId]
        );
        
        if (userRows.length === 0) return res.status(404).json({ error: "User not found" });

        // 2. JOIN with Grants (for Title) AND Application_status (for the Status)
        const [appRows] = await db.query(`
           SELECT 
            a.grant_id, 
            g.grant_title, 
            COALESCE(s.app_status, 'Applied') AS app_status 
        FROM Application_form_data a
        JOIN Grants g ON a.grant_id = g.grant_id
        LEFT JOIN Application_status s ON a.application_id = s.application_id
        WHERE a.citizen_id = ?`, [citizenId]);

        res.json({
            profile: userRows[0],
            applications: appRows
        });
    } catch (err) {
        console.error("❌ Profile Fetch Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 3. Application Form Route
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
            data.applicant_disability_status ? 1 : 0  //applicant_disability_status is a check box
        ];

        const [result] = await db.query(query, values);
        
        res.status(201).json({ 
            message: "✅ Application submitted successfully!", 
            applicationId: result.insertId 
        });
    } catch (err) {
        console.error("❌ Database Error:", err.message);
        console.log("Full Data Received:", req.body); // Check if data is missing
        console.error("SQL ERROR DETAILS:", err.message);
        res.status(500).json({ error: "Failed to save application. Details: " + err.message });
    }
});

// Citizen Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { citizen_name, citizen_email, citizen_password, citizen_phone_number } = req.body;
        
        // Fix: Use the actual column names from your database screenshot
        const query = `INSERT INTO Citizen (citizen_name, citizen_email, citizen_password, citizen_phone_number) VALUES (?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [citizen_name, citizen_email, citizen_password, citizen_phone_number]);
        
        console.log("✅ Rows inserted:", result.affectedRows);

        res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
    } catch (err) {
        // Log the error so you can see it in the terminal!
        console.error("❌ Signup Error:", err.message); 
        
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: "Email already exists!" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// Citizen Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { citizen_email, citizen_password } = req.body;

        // 1. Search for the user by email
        const query = `SELECT * FROM Citizen WHERE citizen_email = ?`;
        const [rows] = await db.query(query, [citizen_email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "User not found!" });
        }

        const user = rows[0];

        // 2. Check password (Direct comparison for now)
        if (user.citizen_password === citizen_password) {
            console.log(`✅ Login successful for: ${user.citizen_name}`);
            
            // Send back the user details so Angular can save them
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.citizen_id,
                    name: user.citizen_name,
                    email: user.citizen_email
                }
            });
        } else {
            res.status(401).json({ error: "Invalid password!" });
        }
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Admin Signup Route
app.post('/api/admin/signup', async (req, res) => {
    try {
        const { admin_name, admin_email, admin_phone_number, admin_password } = req.body;

        const query = `INSERT INTO administration (admin_name, admin_email, admin_phone_number, admin_password) VALUES (?, ?, ?, ?)`;
        
        await db.query(query, [admin_name, admin_email, admin_phone_number, admin_password]);
        
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: "Email already registered" });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

//Admin Login Route
app.post('/api/admin/login', async (req, res) => {
    try {
        const { admin_email, admin_password } = req.body;
        const query = `SELECT * FROM administration WHERE admin_email = ? AND admin_password = ?`;
        const [rows] = await db.query(query, [admin_email, admin_password]);

        if (rows.length > 0) {
            const admin = rows[0];
            res.status(200).json({
                message: "Login successful",
                admin_id: admin.admin_id,
                admin_name: admin.admin_name
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Admin Dashboard Route (grants)
app.get('/api/admin/grants', async (req, res) => {
   
    try {
        const [rows] = await db.query('SELECT * FROM grants'); 
    
        res.json(rows);
    } catch (err) {
        console.error("❌ SQL Error in Grants:", err.message);
        res.status(500).json({ error: err.message });
    }
});

//Admin Dashboard Route (application)
app.get('/api/admin/applications', async (req, res) => {
    try {
        // This query joins the form data with the status table
        // so we can actually see if it was 'approved' or 'rejected'
        const query = `
            SELECT 
                a.*, 
                COALESCE(s.app_status, 'pending') AS application_status 
            FROM application_form_data a
            LEFT JOIN Application_status s ON a.application_id = s.application_id`; 
        
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error("❌ Stats Fetch Error:", err.message);
        res.status(500).json({ 
            error: "Database failure", 
            details: err.message 
        });
    }
});

//Add grant 
app.post('/api/admin/grants', async (req, res) => {
    const { 
        grant_title, grant_desc, grant_amount, 
        max_income_limit, department, created_at, 
        application_deadline, created_by 
    } = req.body;

    try {
        const query = `
            INSERT INTO grants 
            (grant_title, grant_desc, grant_amount, max_income_limit, department, created_at, application_deadline, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.query(query, [
            grant_title, grant_desc, grant_amount, 
            max_income_limit, department, created_at, 
            application_deadline, created_by
        ]);
        
        res.status(201).json({ message: "Success", id: result.insertId });
    } catch (err) {
        console.error("❌ SQL Error details:", err.message);
        res.status(500).json({ error: err.message });
    }
});

//Review Application Route
app.post('/api/admin/review-application', async (req, res) => {
    // Destructure the data coming from Angular
    // IMPORTANT: Make sure 'status' matches exactly what's in your Angular payload
    const { application_id, status, admin_id } = req.body;
    
    console.log("DEBUG: Received Payload:", req.body); // Check your terminal to see if status is 'Approved' or undefined

    try {
        const query = `
            INSERT INTO Application_status (application_id, app_status, reviewed_by, reviewed_at)
            VALUES (?, ?, ?, CURDATE())
            ON DUPLICATE KEY UPDATE 
                app_status = VALUES(app_status),
                reviewed_by = VALUES(reviewed_by),
                reviewed_at = CURDATE()`;

        // If 'status' is undefined here, MySQL inserts NULL. 
        // We force it to lowercase to match your profile filter.
        await db.query(query, [application_id, status ? status.toLowerCase() : 'pending', admin_id]);

        res.json({ message: `Success! Status set to ${status}` });
    } catch (err) {
        console.error("POST ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/review-application', async (req, res) => {
    const { application_id, status, admin_id } = req.body;
    
    console.log(`DEBUG: Updating ID ${application_id} to ${status}`);

    try {
        // We use ON DUPLICATE KEY UPDATE because application_id is the Primary Key
        // in your Application_status table.
        const query = `
            INSERT INTO Application_status (application_id, app_status, reviewed_by, reviewed_at)
            VALUES (?, ?, ?, CURDATE())
            ON DUPLICATE KEY UPDATE 
                app_status = VALUES(app_status),
                reviewed_by = VALUES(reviewed_by),
                reviewed_at = CURDATE()`;

        await db.query(query, [application_id, status, admin_id || 1]);

        res.json({ message: `Application ${status} successfully!` });
    } catch (err) {
        console.error("POST ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Admin Profile Route
app.get('/api/administration/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        console.log("Backend received request for Admin ID:", adminId);

        // Using [rows] because your db configuration uses Promises
        const [rows] = await db.query("SELECT * FROM administration WHERE admin_id = ?", [adminId]);

        if (rows.length > 0) {
            console.log("Data found, sending to frontend:", rows[0]);
            res.json(rows[0]);
        } else {
            console.log("No admin found for ID:", adminId);
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Database failure", details: err.message });
    }
});

// Get count of grants published by a specific admin
app.get('/api/admin/grants/count/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const [rows] = await db.query(
            "SELECT COUNT(*) as total FROM grants WHERE created_by = ?", 
            [adminId]
        );
        res.json({ count: rows[0].total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Backend Server running on http://localhost:${PORT}`);
});