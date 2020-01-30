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
connection.connect(function (err) { });


/////////Prompt question to ask what the user would like to do////////////////////
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
    /////////////////////Switch statement with cases depending on your choice///////////////////////////
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
            return deleteDepartment();
        case "Delete role":
            return deleteRole();
        case "Delete employee":
            return deleteEmployee();
    }
})

var roles = ["FOH Manager", "BOH Manager", "GM", "Server", "Host", "Bus Boy", "Cook"]

/////Function that selects all the columns from the employee table/////
function viewEmployees() {
    console.log("Bringing up employee...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};

/////Function that selects all the columns from the department table/////
function viewDepartment() {
    console.log("Bringing up department...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};

/////Function that selects all the columns from the role table/////
function viewRoles() {

    console.log("Bringing up role...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};

/////Function to add employee to
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
            type: "rawlist",
            message: "What is their title?",
            name: "role",
            choices: ["FOH Manager", "BOH Manager", "GM", "Server", "Host", "Bus Boy", "Cook"]
        },
    ]).then(function (data) {
        console.log("Creating a new employee...\n");
        for (let i = 0; i < roles.length; i++) {
            if (data.role = roles[i]) {
                var roley = (i + 1);
            };
        };
        console.log("before the query");
        connection.query("INSERT INTO employee SET ?",
            {
                firstName: data.firstName,
                lastName: data.lastName,
                roleID: roley
            }, function (err) {
                if (err) throw err;
                connection.end()
            });

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
        }, {
            type: "input",
            message: "What is the annual salary of this role?",
            name: "salary"
        }, {
            type: "input",
            message: "Which department ID does the role belong in? (1, 2, or 3)",
            name: "departmentID"
        }
    ]).then(function (data) {
        console.log("Inserting a new role.../n");
        connection.query("INSERT INTO role SET ?", data);
        console.log(data);
        connection.end()
    })
}
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

function deleteDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to delete?",
            name: "name",
        },
    ]).then(function (data) {
        console.log("Deleting department\n" + data.name);
        connection.query("DELETE FROM department WHERE ?", data);
        connection.end()
    })
};

function deleteRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to delete?",
            name: "title",
        },
    ]).then(function (data) {
        console.log("Deleting role\n" + data.title);
        connection.query("DELETE FROM role WHERE ?", data);
        connection.end()
    })
};

function deleteEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What employee would you like to delete?",
            name: "firstName",
        },
    ]).then(function (data) {
        console.log("Deleting department\n" + data.firstName);
        connection.query("DELETE FROM employee WHERE ?", data);
        connection.end()
    })
};



function addemployees() {
    for (i = 0; i < roles.length; i++) {
        if (data.role = role[i + 1]) {
            var roleID = (i + 1)
        }
    }
};