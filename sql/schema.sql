DROP DATABASE IF EXISTS hr_table;
CREATE DATABASE hr_table;

USE hr_table;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);
