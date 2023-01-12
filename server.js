const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// SQL connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ufrK$ys-Je4~~:~,Ns0N6HEkB',
      database: 'employee_db'
    },
  );

// List of options for application, directing to each function based on answer
function start() {
inquirer
.prompt([
   {
     type: 'list',
     name: 'option',
     message: 'What would you like to do?',
     choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Exit'],
   },
])
 .then((data) => {
  if (data.option === 'View all Departments') {
    viewDepartments()
  } else if (data.option === 'View all Roles') {
    viewRoles()
  } else if (data.option === 'View all Employees') {
    viewEmployees()
  } else if (data.option === 'Add a Department') {
    addDept()
  } else if (data.option === 'Add a Role') {
    addRole()
  } else if (data.option === 'Add an Employee') {
    addEmp()
  } else if (data.option === 'Update an Employee') {
    updateEmp()
  } else {
    console.log('Exiting, goodbye.');
    process.exit(0);
  }
});
}

// Displays a list of all departments
function viewDepartments() {
  db.query('SELECT name, id FROM department', function (err, results) {
      console.log('\n');
      console.table("Departments", results);
      console.log('\n');
        });
        setTimeout(() => {
            start();
        }, 500);
}

// Displays a list of all roles
function viewRoles() {
  db.query('SELECT role.title, role.id AS role_id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
      console.log('\n');
      console.table("Roles", results);
      console.log('\n');
        });
        setTimeout(() => {
            start();
        }, 500);
}

// Displays a list of all employees, creating a seperate query to pull up all employees to find manager names
function viewEmployees() {
        let empList = [];
        let employees = [];
        db.query('SELECT first_name, last_name FROM employee ORDER BY id', function (err, empResults) {
        employees = empResults;
        let firstAndLast = [];
        employees.forEach(element => {
            firstAndLast.push(`${element.first_name} ${element.last_name}`);
        });
        db.query('SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee_id;', function (err, results) {
            empList = results;
            empList.forEach(element =>{
                element.manager = firstAndLast[element.manager-1];
            })
            console.log('\n');
            console.table("Employees", results);
            console.log('\n');
          })
        setTimeout(() => {
            start();
        }, 500);
      })
    }

// Allows a new department to be added
function addDept() {
  inquirer
.prompt([
  {
    type: 'input',
    name: 'department',
    message: `What is the department's name?`,
  },
])
 .then((data) => {
  db.query(`INSERT INTO department (name) VALUES ("${data.department}") `, function (err, results) {
    console.log(`${data.department} added to list of departments.`);
    if (data) {
      setTimeout(() => {
            start();
        }, 500);
    }
  });
 });
}

// Allows a new role to be added
function addRole() {
  inquirer
.prompt([
  {
    type: 'input',
    name: 'role',
    message: `What is the role's name?`,
  },
  {
    type: 'input',
    name: 'salary',
    message: `What is the role's salary?`,
  },
  {
    type: 'input',
    name: 'deptid',
    message: 'What is the id of the department the role belongs to?',
  },
])
 .then((data) => {
  db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.role}", ${data.salary}, ${data.deptid})`, function (err, results) {
    console.log(`${data.role} added to list of roles.`);
    if (data) {
      setTimeout(() => {
            start();
        }, 500);
    }
  });
 });
}

// Allows a new employee to be added
function addEmp() {
inquirer
.prompt([
  {
    type: 'input',
    name: 'first',
    message: `What is the employee's first name?`,
  },
  {
    type: 'input',
    name: 'last',
    message: `What is the employee's last name?`,
  },
  {
    type: 'input',
    name: 'roleid',
    message: 'What is the id of the role the employee belongs to?',
  },
  {
    type: 'input',
    name: 'manaid',
    message: 'What is the employee id of the manager who oversees this employee?',
  },
])
 .then((data) => {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first}", "${data.last}", ${data.roleid}, ${data.manaid})`, function (err, results) {
    console.log(`${data.first} ${data.last} has been added as an employee.`);
    if (data) {
      setTimeout(() => {
            start();
        }, 500);
    }
  });
 });
}

// Allows an existing employee's role to be changed
function updateEmp() {
  inquirer
.prompt([
  {
    type: 'input',
    name: 'empid',
    message: `What is the employee's id?`,
  },
  {
    type: 'input',
    name: 'roleid',
    message: `What is the id of employee's new role?`,
  },
])
 .then((data) => {
  db.query(`UPDATE employee SET role_id = ${data.roleid} WHERE id = ${data.empid}`, function (err, results) {
    console.log(`Updated role for Employee ID:${data.empid}.`);
    if (data) {
      setTimeout(() => {
            start();
        }, 500);
    }
  });
 });
}

start();