// load dependencies
require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');

// Create connection to SQL database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connects to sql server and sql database
connection.connect(function(err){

    // throw error if there is issue connecting 
    if (err) throw err;

    // prompt user with inquirer
    setup();

});


// array of actions to prompt user
const mainPrompt = [
 
    
    {

        name: "action",
        type: "list",
        message: "Select an action",
        choices: [
            
            "View employee",
            "View role",
            "View department",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role/manager",
            "Remove employee",
            "Delete a department",
            "View employees by department",
            "View Department Budget",
            "EXIT"
            
        ]
        
    }

];

// prompt user with inquirer and execute function corresponding to user selection
function setup() {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")   
    // prompt user actions using inquirer 
    inquirer.prompt(mainPrompt)
    
    // await user responce from inquirer
    .then(function(answer) {

        // execute functionviewEmploy if user selection is "View employee"
        if(answer.action == "View employee") {
            
           viewEmploy();
        
        // execute function viewDept if user selection is "View department"
        }else if(answer.action == "View department") {

            viewDept();

        // execute function viewrole if user selection is "View role"
        }else if(answer.action == "View role") {

            viewRole();

        // execute function addNewEmploy if user selection is "Add employee"
        }else if(answer.action == "Add employee") {

            addNewEmploy();
            
        // execute function addDept if user selection is "Add department"
        }else if(answer.action == "Add department") {

            addDept();
       
        // execute function addRole if user selection is "Add roles"
        }else if(answer.action == "Add role") {

            addRole();


        // execute function addRole if user selection is "Add roles"
        }else if(answer.action == "Update employee role/manager") {

            updateEmployee();


        // execute function addRole if user selection is "Add roles"
        }else if(answer.action == "Remove employee") {

            deleteEmployee();


        // execute function EXIT if user selection is "EXIT"
        }else if(answer.action == "Delete a department") {
            
            deleteDepartment() 
        }else if(answer.action == "View employees by department") {
            
            viewEmployeesByDepartment()
        }else if(answer.action == "View Department Budget"){
            viewBudgetByDepartment();
        }else if(answer.action == "EXIT") {

            exit();

        };
        

    });    

};

// view all employee in employee_db
function viewEmploy() {

    // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employee, role, and department tables
    let query =

        "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name AS department, employee.manager_id " +
        "FROM employee " +
        "JOIN role ON role.id = employee.role_id " +
        "JOIN department ON role.department_id = department.id " +
        "ORDER BY employee.id;"

    ;

    // connect to mySQL useing query instruction to access employee table
    connection.query(query, function(err, res) {
        
        // throw error if there is issue accessing data
        if (err) throw err;

        // add manager names to the manager_id col to be displayed in terminal
        for(i = 0; i < res.length; i++) {

            // if manager_Id contains a "0" then lable it as "None"
            if(res[i].manager_id == 0) {
                
                res[i].manager = "None" 
            
            }else{

                // create new row called manager, containing each employee's manager name
                res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

            };

            // remove manager id from res so as to not display it
            delete res[i].manager_id;

        };
        // print data retrieved to terminal in table format 
        console.table(res); 
        
        // prompt user for next action
        setup();

    });

};

// view all department in employee_db
function viewDept() {

    // SQL command to get data from department table
    let query = "SELECT department.dept_name AS department FROM department;";

    // connect to mySQL useing query instruction to access department table
    connection.query(query, function(err, res) {
        
        // throw error if the is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res); 
        
        // prompt user for next action
        setup();

    });

};

// view all role in employee_db
function viewRole() {

    // SQL command to get data from role table
    let query = "SELECT role.title, role.salary, department.dept_name AS department FROM role INNER JOIN department ON department.id = role.department_id;";

    // connect to mySQL useing query instruction to access role table
    connection.query(query, function(err, res) {
        
        // throw error if the is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res); 
        
        // prompt user for next action
        setup();

    });

};

// add new employee to employee_db
function addNewEmploy() {

    // SQL command to get data from role table
    let query = "SELECT title FROM role";
    
    // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employee, role, and department tables
    let query2 =

        "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
        "FROM employee " +
        "JOIN role ON role.id = employee.role_id " +
        "JOIN department ON role.department_id = department.id " +
        "ORDER BY employee.id;"

    ;

    // connect to mySQL using query instruction 1 to access data from role table
    connection.query(query, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // assign data from role table (res) to roleList 
        let roleList = res;

        // connect to mySQL using query instruction 2 to access dept_name from department table
        connection.query(query2, function(err,res) {
            
            // throw error if there is issue accessing data
            if (err) throw err;

            // add manager names to the manager_id col to be displayed in terminal
            for(i = 0; i < res.length; i++) {

                // if manager_Id contains a "0" then lable it as "None"
                if(res[i].manager_id == 0) {
                    
                    res[i].manager = "None" 
                
                }else{

                    // create new row called manager, containing each employee's manager name
                    res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

                };

                // remove manager id from res so as to not display it
                delete res[i].manager_id;

            };

            // print data retrieved to terminal in table format 
            console.table(res);

            // assign data from employee table (res) to managerList
            let managerList = res;

            // array of actions to prompt user
            let addEmpPrompt = [

                {
            
                    name: "first_name",
                    type: "input",
                    message: "Enter new employee's first name."
                    
                },
            
                {
            
                    name: "last_name",
                    type: "input",
                    message: "Enter new employee's last name."
                    
                },
            
                {
            
                    name: "select_role",
                    type: "list",
                    message: "Select new employee's role.",

                    // dynamic choises using roleList (title col of role table)
                    choices: function() {
                        
                        // init role array - used to return existing role titles as choises array prompted to user
                        role = [];
                        
                        // loop through roleList to extract the role titles from roleList which is an object array containing data from role table in the form of rowPackets
                        for(i = 0; i < roleList.length; i++) {
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                            const roleId = i + 1;

                            // concat roleId and title strings and push the resulting string into our role (choises) array 
                            role.push(roleId + ": " + roleList[i].title);

                        };
                        
                        // add string "0: Exit" to the beginning of role (choises)
                        role.unshift("0: Exit");

                        // return role (choises) array to be rendered by inquirer to the user 
                        return role;
            
                    }
                    
                },

                {
            
                    name: "select_manager",
                    type: "list",
                    message: "Select new employee's manager",
                    
                    // dynamic choises using managerList (first_name and last_name cols of employee table)
                    choices: function() {
                        
                        // init managers array - used to return existing employee names as choises array prompted to user
                        managers = [];
            
                        // loop through managerList to extract the employee names from managerList which is an object array containing data from employee table in the form of rowPackets
                        for(i = 0; i < managerList.length; i++) {
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                            const mId = i + 1;

                            // concat mId, first_name, and last_name strings and push the resulting string into our managers (choises) array
                            managers.push(mId + ": " + managerList[i].first_name + " " + managerList[i].last_name);
                            
                        };
                        
                        // add string "0: None" to the beginning of managers (choises)
                        managers.unshift("0: None");

                        // add string "E: Exit" to the beginning of managers (choises)
                        managers.unshift("E: Exit");

                        // return managers (choises) array to be rendered by inquirer to the user 
                        return managers;
            
                    },

                    // dont use this prompt if user selected Exit in previous prompt
                    when: function( answers ) {
                                
                        return answers.select_role !== "0: Exit";
                    
                    }
                    
                }
            
            ];
            
            // prompt user actions using inquirer 
            inquirer.prompt(addEmpPrompt)

            // await user responce from inquirer
            .then(function(answer) {

                // if user selects Exit return to main menu
                if(answer.select_role == "0: Exit" || answer.select_manager == "E: Exit") {

                    // prompt user for next action
                    setup();

                }else{

                    console.log(answer);

                    // SQL command to insert new data in employee table
                    let query = "INSERT INTO employee SET ?";

                    // connect to mySQL using query instruction to insert new employee in employee table
                    connection.query(query,
                    {

                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        
                        // new emplyees table role_id col value is extracted by parsing roleId from the selected role array string and converting it to int
                        role_id: parseInt(answer.select_role.split(":")[0]),

                        // new emplyees table manager_id col value is extracted by parsing mId from the selected managers array string and converting it to int
                        manager_id: parseInt(answer.select_manager.split(":")[0])

                    },
                    function(err, res){

                        // throw error if there is issue writing data
                        if (err) throw err;
                    
                    })

                    // array of actions to prompt user
                    let addagainPrompt = [

                        {
                    
                            name: "again",
                            type: "list",
                            message: "Would you like to add another employee?",
                            choices: ["Yes","Exit"]
                        
                        }

                    ];

                    // prompt user actions using inquirer 
                    inquirer.prompt(addagainPrompt)

                    // await user responce from inquirer
                    .then(function(answer) {

                        // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employee, role, and department tables
                        let query =

                            "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
                            "FROM employee " +
                            "JOIN role ON role.id = employee.role_id " +
                            "JOIN department ON role.department_id = department.id " +
                            "ORDER BY employee.id;"

                        ;

                        // connect to mySQL using query instruction to access first_name, last_name from employee table
                        connection.query(query, function(err,res) {
                
                            // throw error if there is issue accessing data
                            if (err) throw err;

                            // execute function addNewEmploy again if user selection is "Yes"
                            if(answer.again == "Yes") {

                                // prompt add new employee to employee_db
                                addNewEmploy();
                            
                            // update employee first/ last_name table in terminal, and execute function setup if user selection is "Exit"
                            }else if(answer.again == "Exit") {

                                // add manager names to the manager_id col to be displayed in terminal
                                for(i = 0; i < res.length; i++) {

                                    // if manager_Id contains a "0" then label it as "None"
                                    if(res[i].manager_id == 0) {
                                        
                                        res[i].manager = "None" 
                                    
                                    }else{

                                        // create new row called manager, containing each employee's manager name
                                        res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

                                    };

                                    // remove manager id from res so as to not display it
                                    delete res[i].manager_id;

                                };

                                // print data retrieved to terminal in table format 
                                console.table(res);

                                // prompt user for next action
                                setup(); 

                            };  

                        });

                    });  
                
                };

            });

        })

    })
    
};

// add new department to employee_db
function addDept() {

    // SQL command to get data from department table
    let query = "SELECT department.dept_name FROM department;";

    // connect to mySQL using query instruction to access data from department tables
    connection.query(query, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res);
        
        // array of actions to prompt user
        let addDeptPrompt = [

            {
        
                name: "new_department",
                type: "input",
                message: "Enter a new company department."
                
            },
        
        ];
        
        // prompt user actions using inquirer 
        inquirer.prompt(addDeptPrompt)

        // await user responce from inquirer
        .then(function(answer) {

            console.log(answer);

            // SQL command to insert new data in department table
            let query = "INSERT INTO department SET ?";
            
            // connect to mySQL using query instruction to insert new company department in department table
            connection.query(query,
            {
                // write new department srting from user answers to dept_name col in department table, which has auto generated id so only one item import is needed
                dept_name: answer.new_department

            }, function(err, res){

                // throw error if there is issue writing data
                if (err) throw err;
                
            });
            
            // array of actions to prompt user
            let addagainPrompt = [

                {
        
                    name: "again",
                    type: "list",
                    message: "Would you like to add another department?",
                    choices: ["Yes","Exit"]
    
                },

            ];

            // prompt user actions using inquirer 
            inquirer.prompt(addagainPrompt)

            // await user responce from inquirer
            .then(function(answer) {

                // SQL command to get data from department table
                let query = "SELECT department.dept_name FROM department" ;

                // connect to mySQL using query instruction to access data from department tables
                connection.query(query, function(err, res){

                    // throw error if there is issue accessing data
                    if (err) throw err;

                    // execute function addDept again if user selection is "Yes"
                    if(answer.again == "Yes") {

                        // prompt add new department to employee_db
                        addDept();
                    
                    // update department name table displayed in terminal, and execute function setup if user selection is "Exit"
                    }else if(answer.again == "Exit") {

                        // print data retrieved to terminal in table format 
                        console.table(res);

                        // prompt user for next action
                        setup(); 

                    };  

                });

            });

        });

    });

};

// add new role to employee_db
function addRole() {

    // SQL command to get data from role table and data from department.dept_name where department.id = role.department_id
    let query1 = "SELECT role.title AS role, role.salary, department.dept_name FROM role INNER JOIN department ON department.id = role.department_id;";

    // SQL command to get dept_name data from department table - used for prompting list of availible department to pick from
    let query2 = "SELECT department.dept_name FROM department" ;

    // connect to mySQL using query instruction 1 to access data from role & department tables
    connection.query(query1, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // print data retrieved to terminal in table format 
        console.table(res);

        // connect to mySQL using query instruction 2 to access dept_name from department table
        connection.query(query2, function(err,res) {
            
            // throw error if there is issue accessing data
            if (err) throw err;

            // assign data from dept_name (res) to departmentList 
            let departmentList = res;

            // array of actions to prompt user
            let addRolePrompt = [

                {
            
                    name: "add_role",
                    type: "input",
                    message: "Enter a new company role."
                    
                },

                {
            
                    name: "add_salary",
                    type: "input",
                    message: "Enter a salary for this role."
                    
                },

                {
            
                    name: "select_department",
                    type: "list",
                    message: "Select a department.",

                    // dynamic choises using departmentList (dept_name col of department table)
                    choices: function() {
                        
                        // init department array - used to return existing department names as choises array prompted to user 
                        department = [];
                        
                        // loop through departmentList to extract the department names from depatmentList which is an object array containing data from department table in the form of rowPackets
                        for(i = 0; i < departmentList.length; i++) { 
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's 
                            const roleId = i + 1;

                            // concat roleId and dept_name strings and push the resulting string into our department (choises) array 
                            department.push(roleId + ": " + departmentList[i].dept_name);

                        };
                        
                        // add string "0: Exit" to the beginning of department (choises)
                        department.unshift("0: Exit");

                        // return department (choises) array to be rendered by inquirer to the user 
                        return department;

                    }

                }
            
            ];
            
            // prompt user actions using inquirer 
            inquirer.prompt(addRolePrompt)

            // await user responce from inquirer
            .then(function(answer) {

                // if user selects Exit return to main menu
                if(answer.select_department == "0: Exit") {

                    // prompt user for next action
                    setup();

                }else{

                    console.log(answer);

                    // SQL command to insert new data in role table
                    let query = "INSERT INTO role SET ?";

                    // connect to mySQL using query instruction to insert new company role in role table
                    connection.query(query,
                    {
                        title: answer.add_role,
                        salary: answer.add_salary,
                        
                        // department_id is extracted by parsing roleId from the selected department array string and converting it to int
                        department_id: parseInt(answer.select_department.split(":")[0])

                    }, function(err, res){

                        // throw error if there is issue writing data
                        if (err) throw err;
                        
                    });

                    // array of actions to prompt user
                    let addagainPrompt = [

                        {
                
                            name: "again",
                            type: "list",
                            message: "Would you like to add another role?",
                            choices: ["Yes","Exit"]

                        },

                    ];

                    // prompt user actions using inquirer 
                    inquirer.prompt(addagainPrompt)

                    // await user responce from inquirer
                    .then(function(answer) {

                        // SQL command to get data from role table and data from department.dept_name where department.id = role.department_id
                        let query = "SELECT role.id, role.title AS role, role.salary, department.dept_name FROM role INNER JOIN department ON department.id = role.department_id;";

                        // connect to mySQL using query instruction to access first_name, last_name from employee table
                        connection.query(query, function(err,res) {
                
                            // throw error if there is issue accessing data
                            if (err) throw err;

                            // execute function addRole again if user selection is "Yes"
                            if(answer.again == "Yes") {

                                // prompt add new role to employee_db
                                addRole();
                            
                            // update role table displayed in terminal, and execute function setup if user selection is "Exit"
                            }else if(answer.again == "Exit") {

                                // print data retrieved to terminal in table format 
                                console.table(res);

                                // prompt user for next action
                                setup(); 

                            };  

                        });

                    });
                
                };

            });

        });

    });
    
};

// edit existing employee in employee_db
function updateEmployee() {

    // SQL command to get data from role table
    let query = "SELECT title FROM role";
    
    // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employee, role, and department tables
    let query2 =

        "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
        "FROM employee " +
        "JOIN role ON role.id = employee.role_id " +
        "JOIN department ON role.department_id = department.id " +
        "ORDER BY employee.id;"

    ;

    // connect to mySQL using query instruction 1 to access data from role table
    connection.query(query, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // assign data from role table (res) to roleList 
        let roleList = res;

        // connect to mySQL using query instruction 2 to access dept_name from department table
        connection.query(query2, function(err,res) {
            
            // throw error if there is issue accessing data
            if (err) throw err;

            // add manager names to the manager_id col to be displayed in terminal
            for(i = 0; i < res.length; i++) {

                // if manager_Id contains a "0" then lable it as "None"
                if(res[i].manager_id == 0) {
                    
                    res[i].manager = "None" 
                
                }else{

                    // create new row called manager, containing each employee's manager name
                    res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

                };

                // remove manager id from res so as to not display it
                delete res[i].manager_id;

            };

            // print data retrieved to terminal in table format 
            console.table(res);

            // assign data from employee table (res) to managerList
            let employeeList = res;

            // array of actions to prompt user
            let addEmpPrompt = [

                {
            
                    name: "select_employee",
                    type: "list",
                    message: "Select employee to edit",
                    
                    // dynamic choises using managerList (first_name and last_name cols of employee table)
                    choices: function() {
                        
                        // init managers array - used to return existing employee names as choises array prompted to user
                        employee = [];
            
                        // loop through managerList to extract the employee names from managerList which is an object array containing data from employee table in the form of rowPackets
                        for(i = 0; i < employeeList.length; i++) {
                            
                            // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                            const mId = i + 1;

                            // concat mId, first_name, and last_name strings and push the resulting string into our managers (choises) array
                            employee.push(mId + ": " + employeeList[i].first_name + " " + employeeList[i].last_name);
                            
                        };
                        
                        // add string "0: None" to the beginning of managers (choises)
                        employee.unshift("0: Exit");

                        // return managers (choises) array to be rendered by inquirer to the user 
                        return employee;
            
                    }
                    
                }

            ];
            
            // prompt user actions using inquirer 
            inquirer.prompt(addEmpPrompt)

            // await user responce from inquirer
            .then(function(answer) {

                // if user selects "0: Exit" return to main menu
                if(answer.select_employee == "0: Exit") {

                    // prompt user for next action
                    setup();

                }else{

                    let empSelect = answer.select_employee.split(":")[0]

                    let empPropPrompt = [
                
                        {
                    
                            name: "select_role",
                            type: "list",
                            message: "Edit employee role.",
        
                            // dynamic choises using roleList (title col of role table)
                            choices: function() {
                                
                                // init role array - used to return existing role titles as choises array prompted to user
                                role = [];
                                
                                // loop through roleList to extract the role titles from roleList which is an object array containing data from role table in the form of rowPackets
                                for(i = 0; i < roleList.length; i++) {
                                    
                                    // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                                    const roleId = i + 1;
        
                                    // concat roleId and title strings and push the resulting string into our role (choises) array 
                                    role.push(roleId + ": " + roleList[i].title);
        
                                };

                                // add string "0: Exit" to the beginning of role (choises)
                                role.unshift("0: Exit");
                                
                                // return role (choises) array to be rendered by inquirer to the user 
                                return role;
                    
                            }
                            
                        },
        
                        {
                    
                            name: "select_manager",
                            type: "list",
                            message: "Edit employee manager",

                            // dynamic choises using managerList (first_name and last_name cols of employee table)
                            choices: function() {
                                
                                // init managers array - used to return existing employee names as choises array prompted to user
                                managers = [];
                    
                                // loop through managerList to extract the employee names from managerList which is an object array containing data from employee table in the form of rowPackets
                                for(i = 0; i < employeeList.length; i++) {
                                    
                                    // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                                    const mId = i + 1;

                                    // filter out emplyee from managers (choises) array that matches user selection of employee to edit
                                    if(answer.select_employee.split(": ")[1] !== employeeList[i].first_name + " " + employeeList[i].last_name) {
            
                                        // concat mId, first_name, and last_name strings and push the resulting string into our managers (choises) array
                                        managers.push(mId + ": " + employeeList[i].first_name + " " + employeeList[i].last_name);

                                    };
                                    
                                };
                                
                                // add string "0: None" to the beginning of managers (choises)
                                managers.unshift("0: None");

                                // add string "E: Exit" to the beginning of managers (choises)
                                managers.unshift("E: Exit");

                                // return managers (choises) array to be rendered by inquirer to the user 
                                return managers;
                    
                            },

                            // dont use this prompt if user selected Exit in previous prompt
                            when: function( answers ) {
                                
                                return answers.select_role !== "0: Exit";
                            
                            }
                            
                        }
                    
                    ];

                    // prompt user actions using inquirer 
                    inquirer.prompt(empPropPrompt)

                    // await user responce from inquirer
                    .then(function(answer) {

                        // if user selects "0: Exit" return to main menu
                        if(answer.select_role == "0: Exit" || answer.select_manager == "E: Exit") {

                            // prompt user for next action
                            setup();

                        }else{

                            console.log(answer);

                            // SQL command to insert new data in employee table
                            let query = "UPDATE employee SET ? WHERE employee.id = " + empSelect;
            
                            // connect to mySQL using query instruction to insert new employee in employee table
                            connection.query(query,
                            {
                                
                                // new emplyees table role_id col value is extracted by parsing roleId from the selected role array string and converting it to int
                                role_id: parseInt(answer.select_role.split(":")[0]),
            
                                // new emplyees table manager_id col value is extracted by parsing mId from the selected managers array string and converting it to int
                                manager_id: parseInt(answer.select_manager.split(":")[0])
            
                            },
                            function(err, res){
            
                                // throw error if there is issue writing data
                                if (err) throw err;
                            
                            });
            
                            // array of actions to prompt user
                            let addagainPrompt = [
            
                                {
                            
                                    name: "again",
                                    type: "list",
                                    message: "Would you like to add another employee?",
                                    choices: ["Yes","Exit"]
                                
                                }
            
                            ];
            
                            // prompt user actions using inquirer 
                            inquirer.prompt(addagainPrompt)
            
                            // await user responce from inquirer
                            .then(function(answer) {
            
                                // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employee, role, and department tables
                                let query =

                                    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.manager_id " +
                                    "FROM employee " +
                                    "JOIN role ON role.id = employee.role_id " +
                                    "JOIN department ON role.department_id = department.id " +
                                    "ORDER BY employee.id;"

                                ;

                                // connect to mySQL using query instruction to access first_name, last_name from employee table
                                connection.query(query, function(err,res) {
                        
                                    // throw error if there is issue accessing data
                                    if (err) throw err;
            
                                    // execute function updateEmployee again if user selection is "Yes"
                                    if(answer.again == "Yes") {
            
                                        // prompt add new employee to employee_db
                                        updateEmployee();
                                    
                                    // update employee first/ last_name table in terminal, and execute function setup if user selection is "Exit"
                                    }else if(answer.again == "Exit") {
                                        
                                        // add manager names to the manager_id col to be displayed in terminal
                                        for(i = 0; i < res.length; i++) {

                                            // if manager_Id contains a "0" then lable it as "None"
                                            if(res[i].manager_id == 0) {
                                                
                                                res[i].manager = "None" 
                                            
                                            }else{

                                                // create new row called manager, containing each employee's manager name
                                                res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

                                            };

                                            // remove manager id from res so as to not display it
                                            delete res[i].manager_id;

                                        };

                                        // print data retrieved to terminal in table format 
                                        console.table(res);
            
                                        // prompt user for next action
                                        setup(); 
            
                                    };  
            
                                });
            
                            }); 
                            
                        };

                    });    

                };

            });

        })

    })
    
};

// delete existing employee in employee_db
function deleteEmployee() {

    // SQL command to get data from role table
    let query = "SELECT employee.id, employee.first_name, employee.last_name FROM employee;";

    // connect to mySQL using query instruction 1 to access data from role table
    connection.query(query, function(err, res){

        // throw error if there is issue accessing data
        if (err) throw err;

        // combine names from first_name/ last_name cols to be displayed in terminal
        for(i = 0; i < res.length; i++) {

            // create new row called manager, containing each employee's manager name
            res[i].employee = res[i].first_name + " " + res[i].last_name;
            // empDisplay = res[i].first_name + " " + res[i].last_name;

            // remove first_name from res so as to not display it
            delete res[i].first_name;

            // remove last_name from res so as to not display it
            delete res[i].last_name;

        };

        // print data retrieved to terminal in table format 
        console.table(res);

        // assign data from employee table (res) to employeeList
        let employeeList = res;

        // array of actions to prompt user
        let addEmpPrompt = [

            {
        
                name: "select_employee",
                type: "list",
                message: "Terminate employee",
                
                // dynamic choises using employeeList (first_name and last_name cols of employee table)
                choices: function() {
                    
                    // init employee array - used to return existing employee names as choises array prompted to user
                    employee = [];
        
                    // loop through employeeList to extract the employee names from employeeList which is an object array containing data from employee table in the form of rowPackets
                    for(i = 0; i < employeeList.length; i++) {

                        // concat mId, first_name, and last_name strings and push the resulting string into our employee (choises) array
                        employee.push(employeeList[i].id + ": " + employeeList[i].employee);
                        
                    };
                    
                    // add string "0: None" to the beginning of employee (choises)
                    employee.unshift("0: Exit");

                    // return employee (choises) array to be rendered by inquirer to the user 
                    return employee;
        
                }
                
            },

            {
                
                name: "confirm",
                type: "list",

                // dynamic message using user selected employee name
                message: function(answers) {
                        
                    return "Are you sure you want to TERMINATE " + answers.select_employee.split(": ")[1];
                
                },
                
                // prompt user to pick between Yes and No
                choices: ["Yes","No"],

                // dont use this prompt if user selected Exit in previous prompt
                when: function( answers ) {
                    
                    return answers.select_employee !== "0: Exit";
                
                }
                
            }

        ];

        // prompt user actions using inquirer 
        inquirer.prompt(addEmpPrompt)

        // await user responce from inquirer
        .then(function(answer) {

            // if user selects "0: Exit" return to main menu
            if(answer.select_employee == "0: Exit") {

                // prompt user for next action
                setup();
            
            // if user selects "No" restart deleteEmployee
            }else if(answer.confirm == "No") {

                // prompt user for next action
                deleteEmployee();

            }else{

                // SQL command to insert new data in employee table
                let query = "DELETE FROM employee WHERE employee.id =" + answer.select_employee.split(": ")[0];

                // connect to mySQL using query instruction to insert new employee in employee table
                connection.query(query, function(err, res) {

                    // throw error if there is issue writing data
                    if (err) throw err;
                
                });

                // array of actions to prompt user
                let addagainPrompt = [

                    {
                
                        name: "again",
                        type: "list",
                        message: "Would you like to remove another employee?",
                        choices: ["Yes","Exit"]
                    
                    }

                ];

                // prompt user actions using inquirer 
                inquirer.prompt(addagainPrompt)

                // await user responce from inquirer
                .then(function(answer) {

                    // SQL command to get data from employee table
                    let query = "SELECT employee.id, employee.first_name, employee.last_name FROM employee;";

                    // connect to mySQL using query instruction to access data from role table
                    connection.query(query, function(err, res){

                        // throw error if there is issue accessing data
                        if (err) throw err;

                        // combine names from first_name/ last_name cols to be displayed in terminal
                        for(i = 0; i < res.length; i++) {

                            // create new row called manager, containing each employee's manager name
                            res[i].employee = res[i].first_name + " " + res[i].last_name;

                            // remove first_name from res so as to not display it
                            delete res[i].first_name;

                            // remove last_name from res so as to not display it
                            delete res[i].last_name;

                        };

                        // execute function updateEmployee again if user selection is "Yes"
                        if(answer.again == "Yes") {

                            // prompt add new employee to employee_db
                            deleteEmployee();
                        
                        // update employee first/ last_name table in terminal, and execute function setup if user selection is "Exit"
                        }else if(answer.again == "Exit") {
                            
                            
                            // print data retrieved to terminal in table format 
                            console.table(res);

                            // prompt user for next action
                            setup(); 

                        };

                    });

                });

            };

        });

    });
    
};

function deleteDepartment() {
    // Retrieve all departments from the database
    let query = "SELECT * FROM department";

    connection.query(query, function(err, departments) {
        if (err) throw err;

        // Prompt the user to select a department to delete
        inquirer.prompt({
            name: "departmentToDelete",
            type: "list",
            message: "Select a department to delete:",
            choices: departments.map(department => department.dept_name)
        }).then(function(answer) {
            // Confirm deletion
            inquirer.prompt({
                name: "confirmation",
                type: "confirm",
                message: `Are you sure you want to delete the department "${answer.departmentToDelete}"?`
            }).then(function(confirmAnswer) {
                if (confirmAnswer.confirmation) {
                    // Perform deletion if confirmed
                    let deleteQuery = "DELETE FROM department WHERE dept_name = ?";
                    connection.query(deleteQuery, [answer.departmentToDelete], function(err, res) {
                        if (err) throw err;
                        console.log(`Department "${answer.departmentToDelete}" has been deleted.`);
                        // Prompt user for next action
                        setup();
                    });
                } else {
                    console.log("Deletion canceled.");
                    // Prompt user for next action
                    setup();
                }
            });
        });
    });
}

function viewEmployeesByDepartment() {
    // Retrieve all departments from the database
    let query = "SELECT * FROM department";

    connection.query(query, function(err, departments) {
        if (err) throw err;

        // Prompt the user to select a department to view employees
        inquirer.prompt({
            name: "departmentToView",
            type: "list",
            message: "Select a department to view employees:",
            choices: departments.map(department => department.dept_name)
        }).then(function(answer) {
            // Retrieve employees in the selected department
            let employeeQuery = "SELECT employee.*, role.title AS role_title " +
                                "FROM employee " +
                                "INNER JOIN role ON employee.role_id = role.id " +
                                "WHERE role.department_id = (SELECT id FROM department WHERE dept_name = ? LIMIT 1)";
            connection.query(employeeQuery, [answer.departmentToView], function(err, employees) {
                if (err) throw err;

                // Display the list of employees
                console.table(employees);

                // Prompt user for next action
                setup();
            });
        });
    });
}



function viewBudgetByDepartment() {

    // Prompt user to enter department name
    inquirer.prompt({
        name: "department_name",
        type: "input",
        message: "Enter the department name to view salaries:"
    }).then(function(answer) {

        // SQL command to get total salaries in the specified department
        let query = "SELECT SUM(salary) AS total_salary FROM role " +
                    "WHERE department_id IN (SELECT id FROM department WHERE dept_name = ?)";

        // connect to mySQL using query instruction to access data from role table
        connection.query(query, [answer.department_name], function(err, res){

            // throw error if there is issue accessing data
            if (err) throw err;

            // print data retrieved to terminal in table format 
            console.table(res);

            // Prompt user for next action
            setup();

        });

    });

}
// exit employee-traker 
function exit() {

    // terminate mySQL connection
    connection.end();

    // say good bye
    console.log("Thank you bye!");

};