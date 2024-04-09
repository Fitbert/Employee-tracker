USE hr_table;

-- Insert the following items to table department
INSERT INTO department (dept_name)
VALUES 
('Competitor Benchmarking'),
('Information Technology'),
('Computer Engineering'),
('Electrical Engineering'),
('Chemical Engineering'),
('Mechanical Engineering'),
('User Interface Design'),
('Supply Chain Mgmt Logistics'),
('Credit & Finance'),
('Marketing & Sales'),
('Warranty Legal'),
('Intellectual Property'),
('Human Resources');

-- Insert the following items to table role
INSERT INTO role (title, salary, department_id)
VALUES
('Web Development Manager', 90000, 2),
('Web Dev Frontend', 90000, 2),
('Web Dev Backend', 90000, 2),

('Database Admin Manager', 90000, 2),
('Database Administrator', 90000, 2),
('Database Architect Lead', 90000, 2),
('Database Frontend Dev', 90000, 2),
('Database Backend', 90000, 2),

('Software Engineering Manager', 90000, 3),
('Sr. Software Developer', 90000, 3),
('Jr. Software Developer', 90000, 3),

('Computer Engineering Manager', 90000, 3),
('Computer Hardware Developer', 90000, 3),
('Computer Middleware Developer', 90000, 3);

-- Other roles ...

-- Insert the following items to table employee
