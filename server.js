const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ufrK$ys-Je4~~:~,Ns0N6HEkB',
      database: 'employee_db'
    },
  );

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
      db.query('SELECT name, id FROM department', function (err, results) {
          console.log(results);
        });
  } else if (data.option === 'View all Roles') {
      db.query('SELECT role.title, role.id AS role_id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
          console.log(results);
        });
  } else if (data.option === 'View all Employees') {
      db.query('SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', function (err, results) {
          console.log(results);
        });
  } else if (data.option === 'Add a Department') {
      console.log('add department')
  } else if (data.option === 'Add a Role') {
      console.log('add role')
  } else if (data.option === 'Add a Employee') {
      console.log('add employee')
  } else if (data.option === 'Update an Employee') {
      console.log('update employee')
  } else {
      console.log('leave')
  }
});