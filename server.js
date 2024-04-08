const inquirer = require('inquirer');
const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'hr_table'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
  main();
});

function main() {
  setup();
}

function setup() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: [
        'View all Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Delete employee',
        'Delete role',
        'Delete Department',
        'View Budget',
        'Update employee Manager',
        'View Employee Manager',
        'View employee Department',
        'Quit'
      ]
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
      case 'delete department':
        deleteDepartment();
        break;
      case 'delete role':
        deleteRole();
        break;
      case 'delete employee':
        deleteEmployee();
        break;
      case 'view budget':
        viewBudget();
        break;
      case 'update employee manager':
        updateEmployeeManager();
        break;
      case 'view employee manager':
        viewEmployeeManager();
        break;
      case 'view employee department':
        viewEmployeeDepartment();
        break;
      case 'quit':
        quit();
        break;
      default:
        console.log('Invalid choice');
    }
  });
}

async function viewEmployees() {
  try {
    const [rows, fields] = await connection.query("SELECT * FROM employee");
    console.table(rows);
    setup();
  } catch (error) {
    console.error('Error fetching employee', error);
    setup();
  }
}

function addEmployee() {
  let table = "SELECT title FROM roles";
  let table2 = 
  "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id" +
  "FROM employee" +
  "JOIN role ON role.is = employee.role.id" +
  "JOIN deaprtment ON role.department_id = deaprtment.id" +
  "ORDER BY employee.id;"
  ;

  connection.query(table, function (err, res) {
    if (err) throw err;
if (answer.again =="Yes") {
  addEmployee();
}else if(answer.again =="Exit") {
  for (let i = 0; i < res.length; i++) {
    const element = array[i];
    
  }
  if(res[i].manager_id == 0){
    res[i].manager ="None"
    } else {
      res[i].manager = res[res[i].manager_id -1].first_name + " " + res[res[i].manager_id -1].last_name;
    };
    delete res[i].manager_id;

  };
console.table(res);
setup();
  };
}


      let managerList = res;
      let addEmpPrompt =[
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?"
        },
        {
         name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: function(){
            role[];
            for (let i = 0; i < roleList.length; i++) {
              const roleId = i+1;
              role.push(roleId +": " +roleList[i].title);
            };

            role.unshift("0: Exit");
            return role;
          }

          name: "select_manager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: function(){
            managers = [];

            for (let index = 0; index < managerList.length; index++) {
              const mId = i + 1;
              managers.push(mId + ": " + managerList[index].first_name + " " + managerList[index].last_name);
            };
            managers.unshift("0: None");
            managers.unshift("E: Exit");
            return managers;
          },

          when: function(answers) {
            return answers.select_role !== "0: Exit";
          }
        }
      };

      inquirer.prompt(addEmpPrompt)
      .then(function(answer){
         if (answer.select_role == "0: Exit" || answer.select_manager == "E: Exit") {
          cli_prompt();
         } else{
          console.log(answer);

          let query = "INSERT INTO employee SET ?";

          connection.query(query,
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: parseInt(answer.select_role.split(":")[0]),
              manager_id: parseInt(answer.select_manager.split(":")[0])
            },
            function (err, res) {
              if (err) throw err;
              
            })

            let addagainPrompt = [
              {
                name: "add_again",
                type: "list",
                message: "Would you like to add another employee?",
                choices: [
                  "Yes",
                  "No"
                ]
              }
            ];
            inquirer.prompt(addagainPrompt)
            .then(function(answer){
              let query =
              "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id" +
              "FROM employee" +
              "JOIN role ON role.is = employee.role.id" +
              "JOIN deaprtment ON role.department_id = deaprtment.id" +
              "ORDER BY employee.id;"
              ;
              
              
         }
           setup();
         } else {
           const params = [answer.first_name, answer.last_name, answer.role];
           const managerSql = `SELECT id, first_name, last_name FROM employee`;
           connection.query(managerSql, (err, managersData) => {
             if (err) {
               console.error('Error fetching managers:', err);
               setup();
               return;
             }
      })
              const element = array[index];
              
            }
              const element = array[index];
              
            }
          } 
        }
      ]
    }
  });
  // Prompt for first name and last name
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the new employee?',
      validate: addFirstName => {
        return addFirstName ? true : 'Please enter a first name for the new employee.';
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the new employee?',
      validate: addLastName => {
        return addLastName ? true : 'Please enter a last name for the new employee.';
      }
    }
  ]).then(answer => {
    // Prepare parameters for the query
    const params = [answer.firstName, answer.lastName];
    
    // Query to fetch roles from the database
    const roleSql = `SELECT id, title FROM role`;
    connection.query(roleSql, (err, rolesData) => {
      if (err) {
        console.error('Error fetching roles:', err);
        setup();
        return;
      }

      // Extract role choices
      const roleChoices = rolesData.map(role => ({ name: role.title, value: role.id }));

      // Prompt for role selection
      inquirer.prompt([
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the role of the new employee:',
          choices: roleChoices
        }
      ]).then(roleAnswer => {
        // Add selected role to parameters
        params.push(roleAnswer.roleId);

        // Query to fetch managers from the database
        const managerSql = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`;
        connection.query(managerSql, (err, managersData) => {
          if (err) {
            console.error('Error fetching managers:', err);
            setup();
            return;
          }

          // Extract manager choices
          const managerChoices = managersData.map(manager => ({ name: manager.name, value: manager.id }));

          // Prompt for manager selection
          inquirer.prompt([
            {
              type: 'list',
              name: 'managerId',
              message: 'Select the manager of the new employee:',
              choices: managerChoices
            }
          ]).then(managerAnswer => {
            // Add selected manager to parameters
            params.push(managerAnswer.managerId);

            // Insert new employee into the database
            const insertSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            connection.query(insertSql, params, (err, result) => {
              if (err) {
                console.error('Error adding employee:', err);
              } else {
                console.log("Employee has been added");
              }
              setup();
            });
          });
        });
      });
    });
  });
}



function updateEmployeeRole() {
  const employeeSql = `SELECT * FROM employee`;
  connection.query(employeeSql, (err, data) => {
    if (err) {
      console.error('Error fetching employees:', err);
      setup();
      return;
    }
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
        connection.query(roleSql, (err, data) => {
          if (err) {
            console.error('Error fetching roles:', err);
            setup();
            return;
          }
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

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              connection.query(sql, params, (err, result) => {
                if (err) {
                  console.error('Error updating employee role:', err);
                } else {
                  console.log("Employee has been updated.");
                }
                setup();
              });
            });
        });
      });
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, data) {
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
        return addRole ? true : 'Please enter a name for the new role.';
      }
    },
    {
      type: 'input',
      name: 'addSalary',
      message: 'What is the salary for the new role?',
      validate: addSalary => {
        return isNaN(addSalary) ? 'Please enter a valid number for the salary.' : true;
      }
    }
  ]).then(answer => {
    const params = [answer.addRole, parseFloat(answer.addSalary)]; // Parse salary as float
    const departmentSql = 'SELECT name, id FROM department';
    connection.query(departmentSql, (err, data) => {
      if (err) {
        console.error('Error fetching departments:', err);
        setup();
        return;
      }
      const departments = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'addDep',
          message: 'What is the department for the new role?',
          choices: departments
        }
      ]).then(deptChoice => {
        const department = deptChoice.addDep;
        params.push(department);
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
        connection.query(sql, params, function (err, data) {
          if (err) {
            console.error('Error adding role:', err);
          } else {
            console.table(data);
          }
          setup();
        });
      });
    });
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
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

    connection.query(sql, answers.addDep, function (err, data) {
      if (err) {
        console.error('Error adding department:', err);
      } else {
        console.log(`Added ${answers.addDep} to Departments.`);
      }
      setup();
    });
  });
}

function deleteRole() {
  const roleSql = `SELECT * FROM role`;
  connection.query(roleSql, (err, data) => {
    if (err) {
      console.error('Error fetching roles:', err);
      setup();
      return;
    }
    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to delete?',
        choices: roles
      }
    ])
      .then(roleChoice => {
        const role = roleChoice.role;
        const params = [role];
        const sql = `DELETE FROM role WHERE id = ?`;
        connection.query(sql, params, function (err, data) {
          if (err) {
            console.error('Error deleting role:', err);
          } else {
            console.log('Role deleted successfully.');
          }
          setup();
        });
      });
  });
}

function deleteEmployee() {
  const employeeSql = `SELECT * FROM employee`;
  connection.query(employeeSql, (err, data) => {
    if (err) {
      console.error('Error fetching employees:', err);
      setup();
      return;
    }
    const employees = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to delete?',
        choices: employees
      }
    ])
      .then(empChoice => {
        const employeeId = empChoice.employee;
        const sql = `DELETE FROM employee WHERE id = ?`;
        connection.query(sql, [employeeId], function (err, data) {
          if (err) {
            console.error('Error deleting employee:', err);
          } else {
            console.log('Employee deleted successfully.');
          }
          setup();
        });
      });
  });
}

function deleteDepartment() {
  const departmentSql = `SELECT * FROM department`;
  connection.query(departmentSql, (err, data) => {
    if (err) {
      console.error('Error fetching departments:', err);
      setup();
      return;
    }
    const departments = data.map(({ id, name }) => ({ name: name, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Which department would you like to delete?',
        choices: departments
      }
    ])
      .then(deptChoice => {
        const departmentId = deptChoice.department;
        const sql = `DELETE FROM department WHERE id = ?`;
        connection.query(sql, [departmentId], function (err, data) {
          if (err) {
            console.error('Error deleting department:', err);
          } else {
            console.log('Department deleted successfully.');
          }
          setup();
        });
      });
  });
}

function viewBudget() {
  console.log('Showing budget by department... \n');

  const sql = `SELECT department_id AS id,
  department.name AS department,
  SUM(salary) AS budget
  FROM role
  JOIN department ON role.department_id = department.id GROUP BY department_id`;

  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching budget:', err);
    } else {
      console.table(rows);
    }
    setup();
  });
};

function quit() {
  connection.end();
  console.log('Disconnected from database.');
  process.exit(0);
}
