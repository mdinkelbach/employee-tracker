const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ufrK$ys-Je4~~:~,Ns0N6HEkB',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
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
        console.log('departments')
    } else if (data.option === 'View all Roles') {
        console.log('roles')
    } else if (data.option === 'View all Employees') {
        console.log('employees')
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