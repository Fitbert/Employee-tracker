USE hr_table;

-- Insert the following items to table department
INSERT INTO department(name)
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
INSERT INTO role(title, salary, department_id)
VALUES
('Web Development Manager', 90000, 2),
('Web Dev Frontend', 90000, 2),
('Web Dev Backend', 90000, 2),

('Database Admin Manager', 90000, 2),
('Database Administrator', 90000, 2),
('Database Architect Lead', 90000, 2),
('Database Frontend Dev', 90000, 2),
('Database Backend', 90000, 2),

('Software Engineeing Manager', 90000, 3),
('Sr. Software Developer', 90000, 3),
('Jr. Software Developer', 90000, 3),

('Computer Engineeing Manager', 90000, 3),
('Computer Hardware Developer', 90000, 3),
('Computer Middleware Developer', 90000, 3),

-- Other roles ...

-- Insert the following items to table employee
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Sebatian', 'Arrazola', 4, 0),
('Jimena', 'Alvarez', 1, 0),
('Maria', 'Pulido', 57, 0),
('Guillermo', 'Arrazola', 35, 0),
('Gaby', 'Arrazola', 58, 3),
('David', 'Arrazola', 54, 0),
('Nock', 'Arrazola', 12, 0);
