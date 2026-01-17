-- Drop tables in dependency order
DROP TABLE IF EXISTS Application_status;
DROP TABLE IF EXISTS Grants;
DROP TABLE IF EXISTS Administration;
DROP TABLE IF EXISTS Citizen;


-- Citizen Table

CREATE TABLE Citizen (
    citizen_id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_name VARCHAR(100) NOT NULL,
    citizen_email VARCHAR(100) UNIQUE NOT NULL,
    citizen_password VARCHAR(255) NOT NULL,
    age INT,
    phone_number VARCHAR(15) UNIQUE
);


-- Administration Table

CREATE TABLE Administration (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(100) NOT NULL,
    admin_email VARCHAR(100) UNIQUE NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) UNIQUE
);


-- Grants Table

CREATE TABLE Grants (
    grant_id INT AUTO_INCREMENT PRIMARY KEY,
    grant_title VARCHAR(500) NOT NULL,
    grant_desc TEXT,
    grant_amount INT NOT NULL,
    student_only BOOLEAN NOT NULL,
    max_income_limit INT NOT NULL,
    department VARCHAR(100),
    created_at DATE NOT NULL,
    application_deadline DATE NOT NULL,
    created_by INT,

    FOREIGN KEY (created_by)
        REFERENCES Administration(admin_id)
        ON DELETE SET NULL
);


-- Application Status Table

CREATE TABLE Application_status (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_id INT NOT NULL,
    grant_id INT NOT NULL,
    app_status ENUM('pending', 'approved', 'rejected') NOT NULL,
    applied_at DATE NOT NULL,
    reviewed_by INT,

    FOREIGN KEY (citizen_id)
        REFERENCES Citizen(citizen_id)
        ON DELETE CASCADE,

    FOREIGN KEY (grant_id)
        REFERENCES Grants(grant_id)
        ON DELETE CASCADE,

    FOREIGN KEY (reviewed_by)
        REFERENCES Administration(admin_id)
        ON DELETE SET NULL
);
