USE hr_table;

-- Insert the following items to table department
INSERT INTO department (dept_name)
VALUES 
('Sales'),
('Information Technology'),
('Computer Engineering'),
('Electrical '),
('Mechanical '),
('User Interface Design'),
('Logistics'),
('Finance'),
('Marketing & Sales'),
('Legal'),
('Human Resources');

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

('Software Engineeing Manager', 90000, 3),
('Sr. Software Developer', 90000, 3),
('Jr. Software Developer', 90000, 3),

('Computer Engineeing Manager', 90000, 3),
('Computer Hardware Developer', 90000, 3),
('Computer Middleware Developer', 90000, 3),

('Chief Electrical Engineer', 150000, 4),
('Electrical Engineer Manager', 150000, 4),
('Electrical Engineer', 90000, 4),

('Chief Chemical Engineer', 150000, 5),
('Chemical Engineer Manager', 150000, 5),
('Chemical Engineer', 90000, 5),

('Chief Industrial Engineer', 150000, 8),
('Industrial Engineer Manager', 150000, 8),
('Industrial Engineer', 90000, 8),

('Chief Accountant', 170000, 9),
('Accounting Manager', 70000, 9),
('Sr. Accountant', 70000, 9),
('Jr. Accountant', 70000, 9),

('Chief Financial Analyst', 170000, 9),
('Financial Analyst Manager', 170000, 9),
('Sr. Financial Analyst', 70000, 9),
('Jr. Financial Analyst', 70000, 9),

('Chief Budget Analyst', 170000, 9),
('Budget Analyst Manager', 70000, 9),
('Sr. Budget Analyst', 70000, 9), 
('Jr. Budget Analyst', 70000, 9),

('Chief of Marketing', 70000, 10),
('Marketing Manager', 70000, 10),
('Sr. Market Specialist', 70000, 10), 
('Jr. Market Specialist', 70000, 10),
('Sr. Marketing Strategist', 70000, 10), 
('Jr. Marketing Strategist', 70000, 10),

('IR Chief Council', 50000, 9),
('IR Council', 50000, 9),
('IR Paralegal', 50000, 9),

('IP Chief Council', 50000, 12),
('IP Council', 50000, 12),
('IP Paralegal', 50000, 12),
('Salesman', 100000, 1),
('HR Chief Council', 50000, 13),
('HR Council', 50000, 13),
('HR Paralegal', 50000, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mark', 'Miller', 2, null),
('Devin', 'Anderson', 1, 1),
('Mary', 'Brown', 4, null),
('Ashley', 'Jones', 3, 3),
('Tyler', 'Moore', 6, null),
('Ana', 'Sanchez', 5, 5),
('Lewis', 'Allen', 7, null),
('Katherine', 'Green', 8, 7),
('Adam', 'Tatar', 1, 3),
('Ryan', 'Doob', 2, 1),
('Mikey', 'Likey', 5, null),