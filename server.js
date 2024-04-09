const inquirer = require('inquirer');
const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "123456",
  database: 'hr_table'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
  setup();
});



function setup() {
  inquirer
    .prompt([
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
    ])
    .then((answers) => { // Corrected the parameter name here
      const { start } = answers; // Destructuring answers to get start directly
      if (start === "View all Employees") {
        viewEmployees();
      } else if (start === "Add Employee") {
        addEmployee();
      } else if (start === "Update Employee Role") {
        updateEmployeeRole();
      } else if (start === "View All Roles") {
        viewRole();
      } else if (start === "Add Role") {
        addRole();
      } else if (start === "View All Departments") {
        viewDepartments();
      } else if (start === "Add Department") {
        addDepartment();
      } else if (start === "Delete employee") {
        deleteEmployee();
      } else if (start === "Delete role") {
        deleteRole();
      } else if (start === "Delete Department") {
        deleteDepartment();
      } else if (start === "View Budget") {
        viewBudget();
      } else if (start === "Update employee Manager") {
        updateEmployeeManager();
      } else if (start === "View Employee Manager") {
        viewEmployeeManager();
      } else if (start === "View employee Department") {
        viewEmployeeDepartment();
      } else if (start === "Quit") {
        quit();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function viewEmployees() {
  let q1 = 
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name AS department, employee.manager_id " +
    "FROM employee " +
    "JOIN role ON role.id = employee.role_id " + // corrected "employee.role.id" to "employee.role_id"
    "JOIN department ON role.department_id = department.id " + // corrected "role.department.id" to "role.department_id"
    "ORDER BY employee.id;";
  
  connection.query(q1, function (err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
      if(res[i].manager_id == 0) {
        res[i].manager = "None";
      } else {
        res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
      }
      delete res[i].manager_id;
    }
    console.table(res);
    setup();
  });
}

function addEmployee() {
  let table = "SELECT title FROM role";
  let table2 = 
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
    "FROM employee " +
    "JOIN role ON role.id = employee.role.id " +
    "JOIN department ON role.department_id = department.id " +
    "ORDER BY employee.id;";

  connection.query(table, function (err, res) {
    if (err) throw err;
    if (answers.again == "Yes") {
      addEmployee();
    } else if (answers.again == "Exit") {
      for (let i = 0; i < res.length; i++) {
        const element = array[i];
      }
      if (res[i].manager_id == 0) {
        res[i].manager = "None";
      } else {
        res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
      }
      delete res[i].manager_id;
    }
    console.table(res);

    let managerList = res;
    let addEmpPrompt = [
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
        choices: function () {
          role = [];
          for (let i = 0; i < roleList.length; i++) {
            const roleId = i + 1;
            role.push(roleId + ": " + roleList[i].title);
          }

          role.unshift("0: Exit");
          return role;
        }
      },
      {
        name: "select_manager",
        type: "list",
        message: "Who is the employee's manager?",
        choices: function () {
          managers = [];

          for (let i = 0; i < managerList.length; i++) {
            const mId = i + 1;
            managers.push(mId + ": " + managerList[i].first_name + " " + managerList[i].last_name);
          }
          managers.unshift("0: None");
          managers.unshift("E: Exit");
          return managers;
        },

        when: function (answers) {
          return answers.select_role !== "0: Exit";
        }
      }
    ];

    inquirer.prompt(addEmpPrompt)
      .then(function (answers) {
        if (answers.select_role == "0: Exit" || answers.select_manager == "E: Exit") {
          start();
        } else {
          console.log(answers);

          let query = "INSERT INTO employee SET ?";

          connection.query(query,
            {
              first_name: answers.first_name,
              last_name: answers.last_name,
              role_id: parseInt(answers.select_role.split(":")[0]),
              manager_id: parseInt(answers.select_manager.split(":")[0])
            },
            function (err, res) {
              if (err) throw err;

            });

          let addAgainPrompt = [
            {
              name: "add_again",
              type: "list",
              message: "Would you like to add another employee?",
              choices: [
                "Yes",
                "Exit"
              ]
            }
          ];
          inquirer.prompt(addAgainPrompt)
            .then(function (answers) {
              let query =
                "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
                "FROM employee " +
                "JOIN role ON role.is = employee.role.id " +
                "JOIN department ON role.department_id = department.id " +
                "ORDER BY employee.id;";

              connection.query(query, function (err, res) {
                if (err) throw err;
                if (answers.again == "Yes") {
                  addEmployee();
                } else if (answers.again == "Exit") {
                  for (i = 0; i < res.length; i++) {
                    if (res[i].manager_id == 0) {
                      res[i].manager = "None";
                    } else res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
                  }
                }
                delete res[i].manager_id;
                console.table(res);
                setup();
              });
            });
        }
      });
  });
}

function updateEmployeeRole() {
  let query = "SELECT title FROM role";
  let q2 =
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
    "FROM employee " + 
    "JOIN role ON role.id = employee.role_id " + 
    "JOIN department ON role.id = department.id " +
    "ORDER BY employee.id;";
    
  connection.query(query, function(err, res){
    if (err) throw err;
    let roleList = res;
    connection.query(q2, function(err, res){
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        if (res[i].manager_id == 0) {
          res[i].manager = "None";
        } else {
          res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
        }
        delete res[i].manager_id;
      }

      console.table(res);
      let employeeList = res;
      let addEmpPrompt = {
        name: "select_employee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: function(){
          let employee = [];
          for(let i = 0; i < employeeList.length; i++){
            const mId = i + 1;
            employee.push(mId + ": " + employeeList[i].first_name + " " + employeeList[i].last_name);
          }
          employee.unshift("0: Exit");
          return employee;
        }
      };

      inquirer.prompt(addEmpPrompt)
      .then(function(answers){
        if(answers.select_employee == "0: Exit") {
          start();
        } else {
          let empSelect = answers.select_employee.split(":")[0];
          let empPrPrompt = [
            {
              name: "select_role",
              type: "list",
              message: "What is the employee's new role?",
              choices: function(){
                let role = [];
                for (let i = 0; i < roleList.length; i++) {
                  const roleId = i + 1;
                  role.push(roleId + ": " + roleList[i].title);
                }
                role.unshift("0: Exit");
                return role;
              }
            },
            {
              name: "select_manager",
              type: "list",
              message: "Who is the employee's new manager?",
              choices: function(){
                let managers = [];
                for (let i = 0; i < managerList.length; i++) {
                  const mId = i + 1;
                  if(answers.select_employee.split(":")[1] !== employeeList[i].first_name + " " + employeeList[i].last_name) {
                    managers.push(mId + ": " + managerList[i].first_name + " " + managerList[i].last_name);
                  }
                }
                managers.unshift("0: None");
                managers.unshift("E: Exit");
                return managers;
              },
              when: function(answers) {
                return answers.select_role !== "0: Exit";
              }
            }
          ];

          inquirer.prompt(empPrPrompt)
          .then(function(answers){
            if (answers.select_role == "0: Exit" || answer.select_manager == "E: Exit") {
              start();
            } else {
              console.log(answer);
              connection.query(query, {
                role_id: parseInt(answers.select_role.split(":")[0]),
                manager_id: parseInt(answers.select_manager.split(":")[0])
              },
              function(err, res){
                if (err) throw err;
              });

              let addAgainPrompt = [
                {
                  name: "add_again",
                  type: "list",
                  message: "Would you like to add another employee?",
                  choices: [
                    "Yes",
                    "Exit"
                  ]
                }
              ];

              inquirer.prompt(addAgainPrompt)
              .then(function(answers){
                let query =
                  "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
                  "FROM employee " +
                  "JOIN role ON role.is = employee.role.id " +
                  "JOIN department ON role.department_id = department.id " +
                  "ORDER BY employee.id;";

                connection.query(query, function(err, res){
                  if (err) throw err;
                  if (answers.again == "Yes") {
                    updateEmployeeRole();
                  } else if (answers.again == "Exit") {
                    for (let i = 0; i < res.length; i++) {
                      if (res[i].manager_id == 0) {
                        res[i].manager = "None";
                      } else res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
                    }
                  }
                  delete res[i].manager_id;
                  console.table(res);
                  setup();
                });
              });
            }
          });
        }
      });
    });
  });
}

function viewRole() {
  let q1 = "SELECT role.title, role.salary, department.dept_name AS department FROM role INNER JOIN department ON department.id = role.department_id;";
  connection.query(query,function(err, res) {
    if (err) throw err;
    console.table(res);
    setup();
  });
};

function addRole() {
  let q1 ="SELECT role.title AS role, role.salary, department.dept_name FROM role INNER JOIN department ON department.id = role.department_id;";
  let q2 ="SELECT department.dept_name FROM department" ;

  connection.query(q1, function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.query(q2, function(err, res) {
      if (err) throw err;
      let departmentList = res;
      let addRolePr = [
        {
          name:"add_role",
          type: "input",
          message: "What is the name of the new role?",  
        },
        {
          name:"add_salary",
          type: "input",
          message: "What is the salary of the new role?",
        },
        {
          name:"select_department",
          type: "list",
          message: "Which department does the new role belong to?",
          choices: function(){
            let departments = [];
            for (let i = 0; i < departmentList.length; i++) {
              const roleId = i + 1;
              departments.push(roleId + ": " + departmentList[i].dept_name);
            }
            departments.unshift("0: Exit");
            return departments;
          }
        }
      ];
      inquirer.prompt(addRolePr)
      .then(function(answers){
        if (answers.select_department == "0: Exit"){
          start();
        } else {
          console.log(answers);
          let query = "INSERT INTO role SET ?";
          connection.query(query,
            {
              title: answers.add_role,
              salary: answers.add_salary,
              department_id: parseInt(answers.select_department.split(":")[0])
            }, function(err,res){
              if (err) throw err;
            });
          let addAgainPrompt = [
            {
              name: "add_again",
              type: "list",
              message: "Would you like to add another role?",
              choices: [
                "Yes",
                "Exit"
              ]
            }
          ];
          inquirer.prompt(addAgainPrompt)
          .then(function(answers){
            let query = "SELECT role.id, role.title AS role, role.salary, department.dept_name FROM role INNER JOIN department ON department.id = role.department_id;";
            connection.query(query, function(err,res){
              if (err) throw err;
              if(answers.again == "Yes") {
                addRole();
              } else if (answers.again == "Exit") {
                console.table(res);
                setup();
              }
            });
          });
        }
      });
    });
  });
}


function viewDepartments() {
  let q1 = "SELECT department.dept_name AS department FROM department;";
  connection.query(query, function(err,res){
    if (err) throw err;
    console.table(res);
    setup();
  });
}

function addDepartment() {
  let q1 = "SELECT department.dept_name FROM department;";
  connection.query(query, function(err,res){
    if (err) throw err;
    console.table(res);
    let addDepartmentPrompt = [
      {
        name: "add_department",
        type: "input",
        message: "What is the name of the new department?"
      }
    ];
    inquirer.prompt(addDepartmentPrompt)
   .then(function(answers){
    console.log(answers)
    {
      let q1 = "INSERT INTO department SET ?";
      connection.query(q1,
        {
          dept_name: answers.new_department
    }, function(err,res){
      if (err) throw err;
    });
    let addAgainPrompt = [
      {
        name:"add_again",
        type: "list",
        message: "Would you like to add another department?",
        choices: [
          "Yes",
          "Exit"]
        },
      ];
      inquirer.prompt(addAgainPrompt)
      .then(function(answers){
        let query = "SELECT department.dept_name FROM department;";
        connection.query(query, function(err,res){
          if (err) throw err;
          if(answers.again =="Yes") {
            addDepartment();
            } else if (answers.again =="Exit") {
              console.table(res);
              setup();
            };
          });
        });
      };
    });
  })
}

function deleteRole() {
  const roleSql = `SELECT * FROM role`;
  connection.query(roleSql, (err, data) => {
    if (err) {
      console.error('Error fetching roles:', err);
      setup();
      return;
    }
    const role = data.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to delete?',
        choices: role
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
  let query ="SELECT employee.id, employee.first_name, employee.last_name FROM employee;";
  connection.query(query, function(err,res){
    if (err) throw err;
    for (i=0; i<res.length; i++) {
      res[i].employee = res[i].first_name + " " + res[i].last_name;
      delete res[i].first_name;
      delete res[i].last_name;
    }
    console.table(res);
    let employeeList = res;
    let addEmployeePrompt = [
      {
        name:"select_employee",
        type: "list",
        message: "Which employee would you like to delete?",
        choices: function() {
          let employee =[];
          for (i=0; i<employeeList.length; i++) {
            employee.push(employeeList[i].id + " " + employeeList[i].employee);
          }
          employee.unshift("0= Exit");
          return employee;
        }
      },
      {
        name: "confirm",
        type: "list",
        message: function(answers){
          return "Are you sure you want to delete this employee?" + answers.select_employee.split(": ")[1];
          },
        choices: ["Yes", "No"],
        when: function(answers){
          return answers.select_employee !== "0: Exit";
        }
      }
    ];
    inquirer.prompt(addEmployeePrompt)
     .then(function(answers){
      if (answers.select_employee === "0: Exit"){
        setup();
      } else if(answers.confirm == "No") {
        deleteEmployee();
      } else {
        let query = "DELETE FROM employee WHERE employee.id =" + answers.select_employee.split(": ")[0];
        connection.query(query, function (err, data) {
          if (err) throw err;
        });
        let addAgainPrompt = [
          {
            name: "again",
            type: "list",
            message: "Would you like to delete another employee?",
            choices: ["Yes", "No"],
          }
        ];
        inquirer.prompt(addAgainPrompt)
        .then(function(answers){
          let query = "SELECT employee.id, employee.first_name, employee.last_name FROM employee;";
          connection.query(query, function(err,res){
            if (err) throw err;
            for (i=0; i<res.length; i++) {
              res[i].employee = res[i].first_name + " " + res[i].last_name;
              delete res[i].first_name;
              delete res[i].last_name;
            }
            if(answers.again == "Yes"){
              deleteEmployee();
            } else if(answers.again =="Exit"){
              console.table(res);
              setup();
            }
          });
        });
      }
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
