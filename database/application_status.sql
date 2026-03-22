/* -------------------------------------------------
   5.  Application_status (50 rows)
   – reviewed_at is fixed to a constant date for simplicity.
------------------------------------------------- */
INSERT INTO Application_status (
    application_id, 
    app_status, 
    reviewed_by, 
    reviewed_at
) VALUES 
(1,  'pending',  NULL, '2026-03-22'),
(2,  'approved', 1,    '2026-03-22'),
(3,  'rejected', 1,    '2026-03-22'),
(4,  'pending',  NULL, '2026-03-22'),
(5,  'approved', 1,    '2026-03-22'),
(6,  'rejected', 1,    '2026-03-22'),
(7,  'pending',  NULL, '2026-03-22'),
(8,  'approved', 1,    '2026-03-22'),
(9,  'rejected', 1,    '2026-03-22'),
(10, 'pending',  NULL, '2026-03-22'),
(11, 'approved', 1,    '2026-03-22'),
(12, 'rejected', 1,    '2026-03-22'),
(13, 'pending',  NULL, '2026-03-22'),
(14, 'approved', 1,    '2026-03-22'),
(15, 'rejected', 1,    '2026-03-22'),
(16, 'pending',  NULL, '2026-03-22'),
(17, 'approved', 1,    '2026-03-22'),
(18, 'rejected', 1,    '2026-03-22'),
(19, 'pending',  NULL, '2026-03-22'),
(20, 'approved', 1,    '2026-03-22'),
(21, 'rejected', 1,    '2026-03-22'),
(22, 'pending',  NULL, '2026-03-22');