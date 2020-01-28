var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "companyDB"
  });
  connection.connect(function(err) {});
  inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "firstQuestion",
        choices: ["Add department", "Add role", "Add employee", "View department", "View roles", "View employees", "Update role", "Delete department", "Delete role", "Delete employee"
        ]
    }
]).then(function (data) {
    console.log(data)
    var path = data.firstQuestion
    switch (path) {
        case "Add department":
            return addDepartment();
        case "Add role":
            return addRole();
        case "Add employee":
            return addEmployee();
        case "View department":
            return viewDepartment();
        case "View roles":
            return viewRoles();
        case "View employees":
            return viewEmployees();
        case "Update role":
            return updateEmployee();
        case "Delete department":
            return deleteDepartment;
        case "Delete roll":
            return deleteRoll;
        case "Delete employee":
            return deleteEmployee;
    }
})
function viewEmployees() {
    console.log("Bringing up employee...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};
function viewDepartment() {
    console.log("Bringing up department...\n");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};
function viewRoles() {
    console.log("Bringing up employee...\n");
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
        }, {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
        }, {
            type: "input",
            message: "What is the employee's role ID'?",
            name: "roleID",
        },
    ]).then(function (data) {
        console.log("Creating a new employee...\n");
        connection.query("INSERT INTO employee SET ?", data);
        console.log(data);
        connection.end()
    })
};
// console.table
// add department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "name",
        }, 
        ]).then(function (data) {
        console.log("Creating a new department...\n");
        connection.query("INSERT INTO department SET ?", data);
        console.log(data);
        connection.end()
    })
};
// add roles
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "title"
        },{
            type: "input",
            message: "What is the annual salary of this role?",
            name: "salary"
        },{
            type: "input",
            message: "Which department ID does the role belong in? (1, 2, or 3)",
            name: "departmentID"
        }
    ]).then(function (data) {
    console.log("Inserting a new role.../n");
    connection.query("INSERT INTO role SET ?", data);
    console.log(data);
    connection.end()
})}
// add employees
// view (SELECT * FROM) departments
// view roles
// view employees
// update roles 
function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to assign?",
            name: "roleID"
        }, {
            type: "input",
            message: "Which employee would you like to change that role to? (First name only)",
            name: "firstName"
        }
    ]).then(function (data) {
        console.log("Updating role of the empolyee...\n");
        connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                roleID: data.roleID
            },
            {
                firstName: data.firstName
            }
        ]);
        console.log(data);
        connection.end()
    })
};