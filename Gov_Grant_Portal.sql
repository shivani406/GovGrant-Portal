-- Drop tables in reverse order of dependency
DROP TABLE IF EXISTS Application_status;
DROP TABLE IF EXISTS Application_form_data;
DROP TABLE IF EXISTS Grants;
DROP TABLE IF EXISTS Administration;
DROP TABLE IF EXISTS Citizen;

-- 1. Citizen Table
CREATE TABLE Citizen (
    citizen_id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_name VARCHAR(100) NOT NULL,
    citizen_email VARCHAR(100) UNIQUE NOT NULL,
    citizen_password VARCHAR(255) NOT NULL,
    citizen_phone_number VARCHAR(15) UNIQUE,
    citizen_annual_income INT
);

-- 2. Administration Table
CREATE TABLE Administration (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(100) NOT NULL,
    admin_email VARCHAR(100) UNIQUE NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    admin_phone_number VARCHAR(15) UNIQUE
);

-- 3. Grants Table
CREATE TABLE Grants (
    grant_id INT AUTO_INCREMENT PRIMARY KEY,
    grant_title VARCHAR(500) NOT NULL,
    grant_desc TEXT,
    grant_amount INT NOT NULL,
    max_income_limit INT NOT NULL,
    department VARCHAR(100),
    created_at DATE NOT NULL,
    application_deadline DATE NOT NULL,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES Administration(admin_id) ON DELETE SET NULL
);

-- 4. APPLICATION FORM DATA 

CREATE TABLE Application_form_data (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_id INT NOT NULL,
    grant_id INT NOT NULL,   
    applicant_name VARCHAR(100) NOT NULL,
    applicant_email VARCHAR(100) NOT NULL,
    applicant_phone_number   VARCHAR(15),
    applicant_gender ENUM('male', 'female', 'other') NOT NULL,
    applicant_age INT,
    applicant_address TEXT NOT NULL,
    applicant_income INT,
    applicant_profession VARCHAR(100),
    applicant_verification_type ENUM('aadhar', 'pan', 'passport', 'driving license'),
    applicant_verification_number VARCHAR(50) UNIQUE,
    applied_at DATE NOT NULL,
    applicant_disability_status BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (citizen_id) REFERENCES Citizen(citizen_id) ON DELETE CASCADE,
    FOREIGN KEY (grant_id) REFERENCES Grants(grant_id) ON DELETE CASCADE

);

-- 5. Application Status Table 

CREATE TABLE Application_status (
    application_id INT PRIMARY KEY, 
    app_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    reviewed_by INT, 
    reviewed_at DATE NOT NULL,

    FOREIGN KEY (application_id) REFERENCES Application_form_data(application_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES Administration(admin_id) ON DELETE SET NULL
);