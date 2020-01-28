const inquirer = require("inquirer");
const mysql = require("mysql");

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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection() {
    connection.query("SELECT * FROM songs", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

function createDepartment(data) {
    console.log("Creating a new department...\n");
    connection.query("INSERT INTO department SET ?", data);
};

function createRole(data) {
    console.log("Creating a new role...\n");
    connection.query("INSERT INTO role SET ?", data);
};

--show ALL books with authors
--INNER JOIN will only return all matching values from both tables
SELECT title, firstName, lastName
FROM books
INNER JOIN authors ON books.authorId = authors.id;

function createEmployee() {
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
    })
};

function seeDepartment(data) {
    console.log("Bringing up department...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(res)
    });
};

function seeRole(data) {
    console.log("Bringing up role...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log(res)
    });
};

function viewEmployee(data) {
    console.log("Bringing up employee...\n");
    connection.query("SELECT * FROM employee;", function (err, res) {
        if (err) throw err;
        console.log(res)
    });
};

function viewEmployeeByDep() {
    console.log("Bringing up employees by department...\n");
    connection.query("SELECT firstName, lastName FROM employee WHERE employee.departmentID = department.ID AND department.name =" + data.name, function (err, res) {
        if (err) throw err;
        console.log(res)
    });
};



function updateEmployee() {

    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to assign?",
            name: "roleID"
        },{
            type: "input",
            message: "Which employee would you like to change that role to?",
            name: "firstName"
        }

    ]).then(function(data) {
    console.log("Updating role of the empolyee...\n");
    connection.query("UPDATE employee SET ? WHERE ?", data);
})
};

// What would you like to do?
//     View Employees
//     View Employees by Department
//       Which department of employees would you like to view?
//         BOH
//         FOH
//         Management
//     View Employees by Manager
//       Which managers employees would you like to view?
//         Manager 1
//         Manager 2
//     Add Employee
//     Remove Employee
//     Update Employee Manager
//      Which Employee would you like to assign to a manager?
//     update employee role
//       Which employee's role would you like to update?
//     view departments
//     view roles
// Build a command-line application that at a minimum allows the user to:

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles