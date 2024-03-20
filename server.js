const inquirer = require('inquirer');

const setup =() {
inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all Employees', 
                'Add Emloyee',
                'Update Employee Role',
                ' View All Roles', 
                'Add Role', 
                'View All Departments',
                'Add Department',
                'Quit'],

    name: 'start'
    }0. then {answers => {
      console.log(answers.start);
      switch (answers.start) {
        case 'view all employees'
        viewEmployees()
        break;

        case 'add employee'
        addEmployee()
        break;
        
        case 'update employee role'
        updateEmployeeRole()
        break;

        case 'view all roles'
        viewRoles()
        break;

        case 'add role'
        addRole()
        break;

        case 'view all departments'
        viewDepartments()
        break;

        case 'add department'
        addDepartment()
        break;

        default:
          createConnection.end()
        break;
    }
  })
}

function viewEmployees(){
    RTCPeerConnection.query("SELECT * FROM employee", function(err,data){
      console.table(data);
      start();
    })

}