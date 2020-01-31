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
        choices: ["Add", "View", "Update role", "Delete department", "Delete role", "Delete employee"
        ]
    }
]).then(function (data) {
    console.log(data)
    var path = data.firstQuestion
    /////////////////////Switch statement with cases depending on your choice///////////////////////////
    switch (path) {
        case "Add":
            return addList();
        case "View":
            return viewList();
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
    connection.query("SELECT title, salary, name FROM role INNER JOIN department ON role.departmentID = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end()
    });
};
//////////array to hold all titles so it can be used to convert titles to roleID/////////
var roles = ["FOH Manager", "BOH Manager", "GM", "Server", "Host", "Bus Boy", "Cook"]
/////Function to add employees/////
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
            if (data.role === roles[i]) {
                var roley = (i + 1);
                console.log(roley);
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
/////function to add a department to department table/////
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

/////function to add role to role table///////////
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
        roles.push(data.title);
        console.log(roles);
        connection.end()
    })
}

/////////function to update roleId in employee table//////////
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

/////////function to delete department row from department table/////////
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

//////////function to delete role row from row table/////////
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
        roles.pop(data.title);
        console.log(roles);
        connection.end()
    })
};

/////////function to delete employee row from employee table//////////
function deleteEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What employee would you like to delete?",
            name: "firstName",
        },
    ]).then(function (data) {
        console.log("Deleting employee\n" + data.firstName);
        connection.query("DELETE FROM employee WHERE ?", data);
        connection.end()
    })
};

function viewEmployeeByRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What employees would you like to view?",
            name: "title"
        }
    ]).then(function (data) {
        connection.query(`SELECT firstName, lastName, title FROM employee INNER JOIN role ON employee.roleID = role.id WHERE role.title = "${data.title}"`, function (err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        })
    })
}

function addList() {
    inquirer.prompt([
        {
            type: "list",
            name: "addQuestion",
            choices: ["Add department", "Add role", "Add employee"]
        }
    ]).then(function (data) {
        console.log(data)
        /////////////////////Switch statement with cases depending on your choice///////////////////////////
        switch (data.addQuestion) {
            case "Add department":
                return addDepartment();
            case "Add role":
                return addRole();
            case "Add employee":
                return addEmployee();
        }
    })
};

function viewList() {

    inquirer.prompt([
        {
            type: "list",
            name: "viewQuestion",
            choices: ["View department", "View employees", "View roles", "View employees by role"]
        }
    ]).then(function (data) {
        switch (data.viewQuestion) {
            case "View department":
                return viewDepartment();
            case "View roles":
                return viewRoles();
            case "View employees":
                console.log("HEllo");
                return viewEmployees();
            case "View employee by role":
                return viewEmployeeByRole();
            default:
                console.log("oops, shouldn't be here");
                break;
        }
    })
}

function deleteList() {
    inquirer.prompt([
        {
            type: "list",
            name: "deleteQuestion",
            choices: ["Delete department", "Delete role", "Delete employee"
            ]
        }
    ]).then(function (data) {
        console.log(data)
        var path = data.deleteQuestion
        /////////////////////Switch statement with cases depending on your choice///////////////////////////
        switch (path) {
            case "Delete department":
                return deleteDepartment();
            case "Delete role":
                return deleteRole();
            case "Delete employee":
                return deleteEmployee();
    
        }
    })
}