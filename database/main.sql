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

/* -------------------------------------------------
   0️⃣  Drop everything (clean start)
------------------------------------------------- */
DROP TABLE IF EXISTS Application_status;
DROP TABLE IF EXISTS Application_form_data;
DROP TABLE IF EXISTS Grants;
DROP TABLE IF EXISTS Administration;
DROP TABLE IF EXISTS Citizen;

/* -------------------------------------------------
   1️⃣  Citizen (parents for Application_form_data)
------------------------------------------------- */
CREATE TABLE Citizen (
    citizen_id               INT AUTO_INCREMENT PRIMARY KEY,
    citizen_name             VARCHAR(100) NOT NULL,
    citizen_email            VARCHAR(100) UNIQUE NOT NULL,
    citizen_password         VARCHAR(255) NOT NULL,
    citizen_phone_number     VARCHAR(15) UNIQUE,
    citizen_annual_income    INT
);

INSERT INTO Citizen (citizen_id, citizen_name, citizen_email, citizen_password,
                    citizen_phone_number, citizen_annual_income) VALUES
(1,'Citizen 1','citizen1@example.com','pwd1','9000000001',25500),
(2,'Citizen 2','citizen2@example.com','pwd2','9000000002',26000),
(3,'Citizen 3','citizen3@example.com','pwd3','9000000003',26500),
(4,'Citizen 4','citizen4@example.com','pwd4','9000000004',27000),
(5,'Citizen 5','citizen5@example.com','pwd5','9000000005',27500),
(6,'Citizen 6','citizen6@example.com','pwd6','9000000006',28000),
(7,'Citizen 7','citizen7@example.com','pwd7','9000000007',28500),
(8,'Citizen 8','citizen8@example.com','pwd8','9000000008',29000),
(9,'Citizen 9','citizen9@example.com','pwd9','9000000009',29500),
(10,'Citizen 10','citizen10@example.com','pwd10','9000000010',30000),
(11,'Citizen 11','citizen11@example.com','pwd11','9000000011',30500),
(12,'Citizen 12','citizen12@example.com','pwd12','9000000012',31000),
(13,'Citizen 13','citizen13@example.com','pwd13','9000000013',31500),
(14,'Citizen 14','citizen14@example.com','pwd14','9000000014',32000),
(15,'Citizen 15','citizen15@example.com','pwd15','9000000015',32500),
(16,'Citizen 16','citizen16@example.com','pwd16','9000000016',33000),
(17,'Citizen 17','citizen17@example.com','pwd17','9000000017',33500),
(18,'Citizen 18','citizen18@example.com','pwd18','9000000018',34000),
(19,'Citizen 19','citizen19@example.com','pwd19','9000000019',34500),
(20,'Citizen 20','citizen20@example.com','pwd20','9000000020',35000),
(21,'Citizen 21','citizen21@example.com','pwd21','9000000021',35500),
(22,'Citizen 22','citizen22@example.com','pwd22','9000000022',36000),
(23,'Citizen 23','citizen23@example.com','pwd23','9000000023',36500),
(24,'Citizen 24','citizen24@example.com','pwd24','9000000024',37000),
(25,'Citizen 25','citizen25@example.com','pwd25','9000000025',37500),
(26,'Citizen 26','citizen26@example.com','pwd26','9000000026',38000),
(27,'Citizen 27','citizen27@example.com','pwd27','9000000027',38500),
(28,'Citizen 28','citizen28@example.com','pwd28','9000000028',39000),
(29,'Citizen 29','citizen29@example.com','pwd29','9000000029',39500),
(30,'Citizen 30','citizen30@example.com','pwd30','9000000030',40000),
(31,'Citizen 31','citizen31@example.com','pwd31','9000000031',40500),
(32,'Citizen 32','citizen32@example.com','pwd32','9000000032',41000),
(33,'Citizen 33','citizen33@example.com','pwd33','9000000033',41500),
(34,'Citizen 34','citizen34@example.com','pwd34','9000000034',42000),
(35,'Citizen 35','citizen35@example.com','pwd35','9000000035',42500),
(36,'Citizen 36','citizen36@example.com','pwd36','9000000036',43000),
(37,'Citizen 37','citizen37@example.com','pwd37','9000000037',43500),
(38,'Citizen 38','citizen38@example.com','pwd38','9000000038',44000),
(39,'Citizen 39','citizen39@example.com','pwd39','9000000039',44500),
(40,'Citizen 40','citizen40@example.com','pwd40','9000000040',45000),
(41,'Citizen 41','citizen41@example.com','pwd41','9000000041',45500),
(42,'Citizen 42','citizen42@example.com','pwd42','9000000042',46000),
(43,'Citizen 43','citizen43@example.com','pwd43','9000000043',46500),
(44,'Citizen 44','citizen44@example.com','pwd44','9000000044',47000),
(45,'Citizen 45','citizen45@example.com','pwd45','9000000045',47500),
(46,'Citizen 46','citizen46@example.com','pwd46','9000000046',48000),
(47,'Citizen 47','citizen47@example.com','pwd47','9000000047',48500),
(48,'Citizen 48','citizen48@example.com','pwd48','9000000048',49000),
(49,'Citizen 49','citizen49@example.com','pwd49','9000000049',49500),
(50,'Citizen 50','citizen50@example.com','pwd50','9000000050',50000);

/* -------------------------------------------------
   2️⃣  Administration (parents for Grants.created_by)
------------------------------------------------- */
CREATE TABLE Administration (
    admin_id               INT AUTO_INCREMENT PRIMARY KEY,
    admin_name             VARCHAR(100) NOT NULL,
    admin_email            VARCHAR(100) UNIQUE NOT NULL,
    admin_password         VARCHAR(255) NOT NULL,
    admin_phone_number     VARCHAR(15) UNIQUE
);

INSERT INTO Administration (admin_id, admin_name, admin_email, admin_password, admin_phone_number) VALUES
(1,'Admin 1','admin1@example.com','adminpwd1','9100000001'),
(2,'Admin 2','admin2@example.com','adminpwd2','9100000002'),
(3,'Admin 3','admin3@example.com','adminpwd3','9100000003'),
(4,'Admin 4','admin4@example.com','adminpwd4','9100000004'),
(5,'Admin 5','admin5@example.com','adminpwd5','9100000005'),
(6,'Admin 6','admin6@example.com','adminpwd6','9100000006'),
(7,'Admin 7','admin7@example.com','adminpwd7','9100000007'),
(8,'Admin 8','admin8@example.com','adminpwd8','9100000008'),
(9,'Admin 9','admin9@example.com','adminpwd9','9100000009'),
(10,'Admin 10','admin10@example.com','adminpwd10','9100000010'),
(11,'Admin 11','admin11@example.com','adminpwd11','9100000011'),
(12,'Admin 12','admin12@example.com','adminpwd12','9100000012'),
(13,'Admin 13','admin13@example.com','adminpwd13','9100000013'),
(14,'Admin 14','admin14@example.com','adminpwd14','9100000014'),
(15,'Admin 15','admin15@example.com','adminpwd15','9100000015');

/* -------------------------------------------------
   3️⃣  Grants (needs a valid created_by admin)
------------------------------------------------- */
CREATE TABLE Grants (
    grant_id               INT AUTO_INCREMENT PRIMARY KEY,
    grant_title            VARCHAR(500) NOT NULL,
    grant_desc             TEXT,
    grant_amount           INT NOT NULL,
    max_income_limit       INT NOT NULL,
    department             VARCHAR(100),
    created_at             DATE NOT NULL,
    application_deadline   DATE NOT NULL,
    created_by             INT,
    FOREIGN KEY (created_by) REFERENCES Administration(admin_id) ON DELETE SET NULL
);

INSERT INTO Grants (grant_id, grant_title, grant_desc, grant_amount, max_income_limit,
                   department, created_at, application_deadline, created_by) VALUES
(1,'Grant Title 1','Description 1',55000,62000,'Education','2024-01-01','2024-04-01',1),
(2,'Grant Title 2','Description 2',60000,64000,'Health','2024-01-02','2024-04-02',2),
(3,'Grant Title 3','Description 3',65000,66000,'Finance','2024-01-03','2024-04-03',3),
(4,'Grant Title 4','Description 4',70000,68000,'Agriculture','2024-01-04','2024-04-04',4),
(5,'Grant Title 5','Description 5',75000,70000,'Technology','2024-01-05','2024-04-05',5),
(6,'Grant Title 6','Description 6',80000,72000,'Social Welfare','2024-01-06','2024-04-06',6),
(7,'Grant Title 7','Description 7',85000,74000,'Infrastructure','2024-01-07','2024-04-07',7),
(8,'Grant Title 8','Description 8',90000,76000,'Environment','2024-01-08','2024-04-08',8),
(9,'Grant Title 9','Description 9',95000,78000,'Culture','2024-01-09','2024-04-09',9),
(10,'Grant Title 10','Description 10',100000,80000,'Transport','2024-01-10','2024-04-10',10),
(11,'Grant Title 11','Description 11',105000,82000,'Education','2024-01-11','2024-04-11',11),
(12,'Grant Title 12','Description 12',110000,84000,'Health','2024-01-12','2024-04-12',12),
(13,'Grant Title 13','Description 13',115000,86000,'Finance','2024-01-13','2024-04-13',13),
(14,'Grant Title 14','Description 14',120000,88000,'Agriculture','2024-01-14','2024-04-14',14),
(15,'Grant Title 15','Description 15',125000,90000,'Technology','2024-01-15','2024-04-15',15),
(16,'Grant Title 16','Description 16',130000,92000,'Social Welfare','2024-01-16','2024-04-16',1),
(17,'Grant Title 17','Description 17',135000,94000,'Infrastructure','2024-01-17','2024-04-17',2),
(18,'Grant Title 18','Description 18',140000,96000,'Environment','2024-01-18','2024-04-18',3),
(19,'Grant Title 19','Description 19',145000,98000,'Culture','2024-01-19','2024-04-19',4),
(20,'Grant Title 20','Description 20',150000,100000,'Transport','2024-01-20','2024-04-20',5);

/* -------------------------------------------------
   4️⃣  Application_form_data (needs citizen_id **and** grant_id)
------------------------------------------------- */
CREATE TABLE Application_form_data (
    application_id               INT AUTO_INCREMENT PRIMARY KEY,
    citizen_id                  INT NOT NULL,
    grant_id                    INT NOT NULL,
    applicant_name              VARCHAR(100) NOT NULL,
    applicant_email             VARCHAR(100) NOT NULL,
    applicant_phone_number       VARCHAR(15),
    applicant_gender            ENUM('male','female','other') NOT NULL,
    applicant_age               INT,
    applicant_address           TEXT NOT NULL,
    applicant_income            INT,
    applicant_profession        VARCHAR(100),
    applicant_verification_type ENUM('aadhar','pan','passport','driving license'),
    applicant_verification_number VARCHAR(50) UNIQUE,
    applied_at                  DATE NOT NULL,
    applicant_disability_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (citizen_id) REFERENCES Citizen(citizen_id) ON DELETE CASCADE,
    FOREIGN KEY (grant_id)   REFERENCES Grants(grant_id)   ON DELETE CASCADE
);

INSERT INTO Application_form_data (
    application_id, citizen_id, grant_id,
    applicant_name, applicant_email, applicant_phone_number,
    applicant_gender, applicant_age, applicant_address,
    applicant_income, applicant_profession,
    applicant_verification_type, applicant_verification_number,
    applied_at, applicant_disability_status
) VALUES
(1,1,1,'Citizen 1','citizen1@example.com','9000000001','male',25,'100 Street 1, City1',25500,'Engineer','aadhar','VERIF00001','2024-03-01',FALSE),
(2,2,2,'Citizen 2','citizen2@example.com','9000000002','female',26,'100 Street 2, City2',26000,'Teacher','pan','VERIF00002','2024-03-02',FALSE),
(3,3,3,'Citizen 3','citizen3@example.com','9000000003','other',27,'100 Street 3, City3',26500,'Doctor','passport','VERIF00003','2024-03-03',FALSE),
(4,4,4,'Citizen 4','citizen4@example.com','9000000004','male',28,'100 Street 4, City4',27000,'Farmer','driving license','VERIF00004','2024-03-04',FALSE),
(5,5,5,'Citizen 5','citizen5@example.com','9000000005','female',29,'100 Street 5, City5',27500,'Entrepreneur','aadhar','VERIF00005','2024-03-05',FALSE),
(6,6,6,'Citizen 6','citizen6@example.com','9000000006','other',30,'100 Street 6, City6',28000,'Student','pan','VERIF00006','2024-03-06',FALSE),
(7,7,7,'Citizen 7','citizen7@example.com','9000000007','male',31,'100 Street 7, City7',28500,'Retired','passport','VERIF00007','2024-03-07',FALSE),
(8,8,8,'Citizen 8','citizen8@example.com','9000000008','female',32,'100 Street 8, City8',29000,'Artist','driving license','VERIF00008','2024-03-08',FALSE),
(9,9,9,'Citizen 9','citizen9@example.com','9000000009','other',33,'100 Street 9, City9',29500,'Lawyer','aadhar','VERIF00009','2024-03-09',FALSE),
(10,10,10,'Citizen 10','citizen10@example.com','9000000010','male',34,'100 Street 10, City10',30000,'Unemployed','pan','VERIF00010','2024-03-10',TRUE),
-- continue the pattern up to (50,50,10,…)
(11,11,11,'Citizen 11','citizen11@example.com','9000000011','female',35,'100 Street 11, City1',30500,'Engineer','passport','VERIF00011','2024-03-11',FALSE),
(12,12,12,'Citizen 12','citizen12@example.com','9000000012','other',36,'100 Street 12, City2',31000,'Teacher','driving license','VERIF00012','2024-03-12',FALSE),
(13,13,13,'Citizen 13','citizen13@example.com','9000000013','male',37,'100 Street 13, City3',31500,'Doctor','aadhar','VERIF00013','2024-03-13',FALSE),
(14,14,14,'Citizen 14','citizen14@example.com','9000000014','female',38,'100 Street 14, City4',32000,'Farmer','pan','VERIF00014','2024-03-14',FALSE),
(15,15,15,'Citizen 15','citizen15@example.com','9000000015','other',39,'100 Street 15, City5',32500,'Entrepreneur','passport','VERIF00015','2024-03-15',FALSE),
(16,16,16,'Citizen 16','citizen16@example.com','9000000016','male',40,'100 Street 16, City6',33000,'Student','driving license','VERIF00016','2024-03-16',FALSE),
(17,17,17,'Citizen 17','citizen17@example.com','9000000017','female',41,'100 Street 17, City7',33500,'Retired','aadhar','VERIF00017','2024-03-17',FALSE),
(18,18,18,'Citizen 18','citizen18@example.com','9000000018','other',42,'100 Street 18, City8',34000,'Artist','pan','VERIF00018','2024-03-18',FALSE),
(19,19,19,'Citizen 19','citizen19@example.com','9000000019','male',43,'100 Street 19, City9',34500,'Lawyer','passport','VERIF00019','2024-03-19',FALSE),
(20,20,20,'Citizen 20','citizen20@example.com','9000000020','female',44,'100 Street 20, City10',35000,'Unemployed','driving license','VERIF00020','2024-03-20',TRUE),
(21,21,1,'Citizen 21','citizen21@example.com','9000000021','other',45,'100 Street 21, City1',35500,'Engineer','aadhar','VERIF00021','2024-03-21',FALSE),
(22,22,2,'Citizen 22','citizen22@example.com','9000000022','male',46,'100 Street 22, City2',36000,'Teacher','pan','VERIF00022','2024-03-22',FALSE),
(23,23,3,'Citizen 23','citizen23@example.com','9000000023','female',47,'100 Street 23, City3',36500,'Doctor','passport','VERIF00023','2024-03-23',FALSE),
(24,24,4,'Citizen 24','citizen24@example.com','9000000024','other',48,'100 Street 24, City4',37000,'Farmer','driving license','VERIF00024','2024-03-24',FALSE),
(25,25,5,'Citizen 25','citizen25@example.com','9000000025','male',49,'100 Street 25, City5',37500,'Entrepreneur','aadhar','VERIF00025','2024-03-25',FALSE),
(26,26,6,'Citizen 26','citizen26@example.com','9000000026','female',50,'100 Street 26, City6',38000,'Student','pan','VERIF00026','2024-03-26',FALSE),
(27,27,7,'Citizen 27','citizen27@example.com','9000000027','other',51,'100 Street 27, City7',38500,'Retired','passport','VERIF00027','2024-03-27',FALSE),
(28,28,8,'Citizen 28','citizen28@example.com','9000000028','male',52,'100 Street 28, City8',39000,'Artist','driving license','VERIF00028','2024-03-28',FALSE),
(29,29,9,'Citizen 29','citizen29@example.com','9000000029','female',53,'100 Street 29, City9',39500,'Lawyer','aadhar','VERIF00029','2024-03-29',FALSE),
(30,30,10,'Citizen 30','citizen30@example.com','9000000030','other',54,'100 Street 30, City10',40000,'Unemployed','pan','VERIF00030','2024-03-30',TRUE),
(31,31,11,'Citizen 31','citizen31@example.com','9000000031','male',55,'100 Street 31, City1',40500,'Engineer','passport','VERIF00031','2024-04-01',FALSE),
(32,32,12,'Citizen 32','citizen32@example.com','9000000032','female',56,'100 Street 32, City2',41000,'Teacher','driving license','VERIF00032','2024-04-02',FALSE),
(33,33,13,'Citizen 33','citizen33@example.com','9000000033','other',57,'100 Street 33, City3',41500,'Doctor','aadhar','VERIF00033','2024-04-03',FALSE),
(34,34,14,'Citizen 34','citizen34@example.com','9000000034','male',58,'100 Street 34, City4',42000,'Farmer','pan','VERIF00034','2024-04-04',FALSE),
(35,35,15,'Citizen 35','citizen35@example.com','9000000035','female',59,'100 Street 35, City5',42500,'Entrepreneur','passport','VERIF00035','2024-04-05',FALSE),
(36,36,16,'Citizen 36','citizen36@example.com','9000000036','other',25,'100 Street 36, City6',43000,'Student','driving license','VERIF00036','2024-04-06',FALSE),
(37,37,17,'Citizen 37','citizen37@example.com','9000000037','male',26,'100 Street 37, City7',43500,'Retired','aadhar','VERIF00037','2024-04-07',FALSE),
(38,38,18,'Citizen 38','citizen38@example.com','9000000038','female',27,'100 Street 38, City8',44000,'Artist','pan','VERIF00038','2024-04-08',FALSE),
(39,39,19,'Citizen 39','citizen39@example.com','9000000039','other',28,'100 Street 39, City9',44500,'Lawyer','passport','VERIF00039','2024-04-09',FALSE),
(40,40,20,'Citizen 40','citizen40@example.com','9000000040','male',29,'100 Street 40, City10',45000,'Unemployed','driving license','VERIF00040','2024-04-10',TRUE),
(41,41,1,'Citizen 41','citizen41@example.com','9000000041','female',30,'100 Street 41, City1',45500,'Engineer','aadhar','VERIF00041','2024-04-11',FALSE),
(42,42,2,'Citizen 42','citizen42@example.com','9000000042','other',31,'100 Street 42, City2',46000,'Teacher','pan','VERIF00042','2024-04-12',FALSE),
(43,43,3,'Citizen 43','citizen43@example.com','9000000043','male',32,'100 Street 43, City3',46500,'Doctor','passport','VERIF00043','2024-04-13',FALSE),
(44,44,4,'Citizen 44','citizen44@example.com','9000000044','female',33,'100 Street 44, City4',47000,'Farmer','driving license','VERIF00044','2024-04-14',FALSE),
(45,45,5,'Citizen 45','citizen45@example.com','9000000045','other',34,'100 Street 45, City5',47500,'Entrepreneur','aadhar','VERIF00045','2024-04-15',FALSE),
(46,46,6,'Citizen 46','citizen46@example.com','9000000046','male',35,'100 Street 46, City6',48000,'Student','pan','VERIF00046','2024-04-16',FALSE),
(47,47,7,'Citizen 47','citizen47@example.com','9000000047','female',36,'100 Street 47, City7',48500,'Retired','passport','VERIF00047','2024-04-17',FALSE),
(48,48,8,'Citizen 48','citizen48@example.com','9000000048','other',37,'100 Street 48, City8',49000,'Artist','driving license','VERIF00048','2024-04-18',FALSE),
(49,49,9,'Citizen 49','citizen49@example.com','9000000049','male',38,'100 Street 49, City9',49500,'Lawyer','aadhar','VERIF00049','2024-04-19',FALSE),
(50,50,10,'Citizen 50','citizen50@example.com','9000000050','female',39,'100 Street 50, City10',50000,'Unemployed','pan','VERIF00050','2024-04-20',TRUE);

/* -------------------------------------------------
   5️⃣  Application_status (needs the application_id from step 4)
------------------------------------------------- */
CREATE TABLE Application_status (
    application_id INT PRIMARY KEY,               -- also FK
    app_status     ENUM('pending','approved','rejected') DEFAULT 'pending',
    reviewed_by    INT,                          -- FK to Administration
    reviewed_at    DATE NOT NULL,
    FOREIGN KEY (application_id) REFERENCES Application_form_data(application_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by)    REFERENCES Administration(admin_id) ON DELETE SET NULL
);

INSERT INTO Application_status (application_id, app_status, reviewed_by, reviewed_at) VALUES
(1,'pending',NULL,'2024-05-01'),
(2,'approved',2,'2024-05-01'),
(3,'rejected',3,'2024-05-01'),
(4,'pending',NULL,'2024-05-01'),
(5,'approved',5,'2024-05-01'),
(6,'rejected',6,'2024-05-01'),
(7,'pending',NULL,'2024-05-01'),
(8,'approved',8,'2024-05-01'),
(9,'rejected',9,'2024-05-01'),
(10,'pending',NULL,'2024-05-01'),
(11,'approved',11,'2024-05-01'),
(12,'rejected',12,'2024-05-01'),
(13,'pending',NULL,'2024-05-01'),
(14,'approved',14,'2024-05-01'),
(15,'rejected',15,'2024-05-01'),
(16,'pending',NULL,'2024-05-01'),
(17,'approved',2,'2024-05-01'),
(18,'rejected',3,'2024-05-01'),
(19,'pending',NULL,'2024-05-01'),
(20,'approved',5,'2024-05-01'),
(21,'rejected',6,'2024-05-01'),
(22,'pending',NULL,'2024-05-01'),
(23,'approved',8,'2024-05-01'),
(24,'rejected',9,'2024-05-01'),
(25,'pending',NULL,'2024-05-01'),
(26,'approved',11,'2024-05-01'),
(27,'rejected',12,'2024-05-01'),
(28,'pending',NULL,'2024-05-01'),
(29,'approved',14,'2024-05-01'),
(30,'rejected',15,'2024-05-01'),
(31,'pending',NULL,'2024-05-01'),
(32,'approved',1,'2024-05-01'),
(33,'rejected',2,'2024-05-01'),
(34,'pending',NULL,'2024-05-01'),
(35,'approved',4,'2024-05-01'),
(36,'rejected',5,'2024-05-01'),
(37,'pending',NULL,'2024-05-01'),
(38,'approved',7,'2024-05-01'),
(39,'rejected',8,'2024-05-01'),
(40,'pending',NULL,'2024-05-01'),
(41,'approved',10,'2024-05-01'),
(42,'rejected',11,'2024-05-01'),
(43,'pending',NULL,'2024-05-01'),
(44,'approved',13,'2024-05-01'),
(45,'rejected',14,'2024-05-01'),
(46,'pending',NULL,'2024-05-01'),
(47,'approved',15,'2024-05-01'),
(48,'rejected',1,'2024-05-01'),
(49,'pending',NULL,'2024-05-01'),
(50,'approved',3,'2024-05-01');

-- This removes the UNIQUE restriction from the verification number
ALTER TABLE Application_form_data DROP INDEX applicant_verification_number;

SELECT admin_id, admin_name FROM administration;
SELECT count(*) as total FROM grants WHERE created_by = (SELECT admin_id FROM administration LIMIT 1);
-- Replace 16 with your actual ID if it changes, 
-- but this tests for YOU specifically:
SELECT COUNT(*) as total FROM grants WHERE created_by = 16;

-- Check if the IDs actually exist in both tables
SELECT 
    a.application_id AS form_id, 
    s.application_id AS status_id, 
    a.citizen_id, 
    s.app_status 
FROM application_form_data a
LEFT JOIN Application_status s ON a.application_id = s.application_id
WHERE a.citizen_id = 51;

-- First, delete the 'wrong' entry where the ID was 8
DELETE FROM Application_status WHERE application_id = 8;
DELETE FROM Application_status WHERE application_id = 16;
-- Second, insert the 'correct' entry where the ID is 51
INSERT INTO Application_status (application_id, app_status, reviewed_by, reviewed_at)
VALUES (51, 'approved', 16, CURDATE());