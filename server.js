const inquirer = require('inquirer');
const mysql = require('mysql');

require('dotenv').config();

const createConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'hr_table'
});

createConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
  setup();
});

function setup() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: ['View all Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
  ]).then(answers => {
    switch (answers.start.toLowerCase()) {
      case 'view all employees':
        viewEmployees();
        break;
      case 'add employee':
        addEmployee();
        break;
      case 'update employee role':
        updateEmployeeRole();
        break;
      case 'view all roles':
        viewRoles();
        break;
      case 'add role':
        addRole();
        break;
      case 'view all departments':
        viewDepartments();
        break;
      case 'add department':
        addDepartment();
        break;
      case 'quit':
        quit();
        break;
      default:
        console.log('Invalid choice');
    }
  });
}

function viewEmployees() {
  createConnection.query("SELECT * FROM employee", function(err, data) {
    if (err) {
      console.error('Error fetching employees:', err);
    } else {
      console.table(data);
    }
    setup();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the new employee?',
      validate: addFirstName => {
        if (addFirstName) {
          return true;
        } else {
          console.log('Please enter a first name for the new employee.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the new employee?',
      validate: addLastName => {
        if (addLastName) {
          return true;
        } else {
          console.log('Please enter a last name for the new employee.');
          return false;
        }
      }
    }
  ]).then(answer => {
    const params = [answer.firstName, answer.lastName]
    const roleSql = `SELECT role.id, role.title FROM role`;
    createConnection.promise().query(roleSql, (err, data) => {
      if (err) throw err;
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: 'What is the role of the new employee?',
          choices: roles
        },
      ]).then(roleChoice => {
        const role = roleChoice.role;
        params.push(role);
        const managerSql = `SELECT * FROM employee`;

        createConnection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", params, function (err, data) {
          if (err) {
            console.error('Error adding employee:', err);
          } else {
            console.table(data);
          }
          setup();
        });
      })

    });
  });
}

function updateEmployeeRole() {
  const employeeSql = `SELECT * FROM employee`;
  createConnection.promise().query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Which employee would you like to update?',
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const roleSql = `SELECT * FROM role`;
        createConnection.promise().query(roleSql, (err, data) => {
          if (err) throw err;
          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: 'What is the new role for the employee?',
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0]
              params[0] = role
              params[1] = employee

              const sql = `UPDATE employee SET role_id = ? WHERE role`;

              createConnection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated.");
                showEmployee();
              });
            });
        });
      });
  });
}

function viewRoles() {
  createConnection.query("SELECT * FROM role", function (err, data) {
    if (err) {
      console.error('Error fetching roles:', err);
    } else {
      console.table(data);
    }
    setup();
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addRole',
      message: 'What is the name of the new role?',
      validate: addRole => {
        if (addRole) {
          return true;
        } else {
          console.log('Please enter a name for the new role.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'addSalary',
      message: 'What is the salary for the new role?',
      validate: addSalary => {
        if (isNaN(addSalary)) {
          return true;
        } else {
          console.log('Please enter a salary for the new role.');
          return false;
        }
      }
    }
  ]).then(answer => {
    const params = [answer.role, answer.salary];
    const roleSql = 'SELECT name, id FROM department';
    createConnection.promise().query(roleSQL, (err, data) => {
      if (err) throw err;
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'addDep',
          message: 'What is the department for the new role?',
          choices: dept
        }
      ]).then(deptChoice => {
        const dept = deptChoice.dept;
        params.push(dept);
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
        createConnection.query(sql, params, function (err, data) {
          if (err) throw err;
          console.table(data);
          showRoles();
        });
      });
    });
  });
}

function viewDepartments() {
  createConnection.query("SELECT * FROM department", function (err, data) {
    if (err) {
      console.error('Error fetching departments:', err);
    } else {
      console.table(data);
    }
    setup();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDep',
      message: 'What is the name of the new department?',
      validate: addDep => {
        if (addDep) {
          return true;
        } else {
          console.log('Please enter a name for the new department.');
          return false;
        }
      }
    }
  ]).then(answers => {
    const sql = 'INSERT INTO department(name) VALUES (?)';

    createConnection.query(sql, answer.addDep, function (err, data) {
      if (err) {
        console.error('Error adding department:', err);
      } else {
        console.table("Added " + answer.addDep + "to Departments.");
        viewDepartments();
      }
    });
  });
}

updateManager = () => {
  const employeeSql = `SELECT * FROM employee`;
  createConnection.promise().query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Which employee would you like to update?',
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const managerSql = `SELECT * FROM employee`;
        createConnection.promise().query(managerSql, (err, data) => {
          if (err) throw err;
          const managers = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
          inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: 'Who is the new manager for the employee?',
              choices: managers
            }
          ])
            .then(managerChoice => {
              const manager = managerChoice.manager;
              params.push(manager);
              let employee = params[0]
              params[0] = manager
              params[1] = employee
              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              createConnection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated.");
                showEmployees();
              });
            });
        });
      });
  });
}

function viewManagers() {
  createConnection.query("SELECT * FROM employee", function (err, data) {
    if (err) {
      console.error('Error fetching managers:', err);
    } else {
      console.table(data);
    }
    setup();
  });
}

function addManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addManager',
      message: 'What is the name of the new manager?',
      validate: addManager => {
        if (addManager) {
          return true;
        } else {
          console.log('Please enter a name for the new manager.');
          return false;
        }
      }
    }
  ]).then(answers => {
    const sql = 'INSERT INTO employee(first_name, last_name, manager_id) VALUES (?,?,?)';
    createConnection.query(sql, answer.addManager, function (err, data) {
      if (err) {
        console.error('Error adding manager:', err);
      } else {
        console.table("Added " + answer.addManager + "to Managers.");
        viewManagers();
      }
    });
  });
};

deleteRole = () => {
  const roleSql = `SELECT * FROM role`;
  createConnection.promise().query(roleSql, (err, data) => {
    if (err) throw err;
    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Which role would you like to delete?',
        choices: roles
      }
    ])
      .then(roleChoice => {
        const role = roleChoice.role;
        const params = [];
        params.push(role);
        const sql = `DELETE FROM role WHERE id =?`;
        createConnection.query(sql, params, function (err, data) {
          if (err) throw err;
          console.table(data);
          showRoles();
        });
      });
  });
};

function deleteEmployee() {
  const employeeSql = `SELECT * FROM employee`;
  createConnection.promise().query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Which employee would you like to delete?',
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.employee;
        const params = [];
        params.push(employee);
        const sql = `DELETE FROM employee WHERE id =?`;
        createConnection.query(sql, params, function (err, data) {
          if (err) throw err;
          console.table(data);
          showEmployees();
        });
      });
  });
}

function deleteDepartment() {
  const departmentSql = `SELECT * FROM department`;
  createConnection.promise().query(departmentSql, (err, data) => {
    if (err) throw err;
    const departments = data.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Which department would you like to delete?',
        choices: departments
      }
    ])
      .then(deptChoice => {
        const department = deptChoice.department;
        const params = [];
        params.push(department);
        const sql = `DELETE FROM department WHERE id =?`;
        createConnection.query(sql, params, function (err, data) {
          if (err) throw err;
          console.table(data);
          showDepartments();
        });
      });
  });
};

function viewBudget() {
  console.log('Showing budget by department... \n');

  const sql = `SELECT department_id AS id,
  department.name AS department,
  SUM(salary) AS budget
  FROM role
  JOIN department ON role.department_id = department.id GROUP BY department_id`;

  createConnection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    setup();
  });
};
