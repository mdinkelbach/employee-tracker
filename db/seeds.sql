INSERT INTO department (name)
VALUES ("Accounting"),
       ("Help Desk"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 40000, 1),
       ("Manager", 40000, 2),
       ("Manager", 40000, 3),
       ("Payroll", 30000, 1),
       ("Financial reporting", 37000, 1),
       ("Level 1 Support", 35000, 2),
       ("Level 2 Support", 45000, 2),
       ("Writer", 30000, 3),
       ("Marketing Analyst", 42000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wolfe", 1, NULL),
       ("Gary", "Bunn", 2, NULL),
       ("Lloyd", "Sinow", 3, NULL),
       ("Hana", "Himura", 4, 1),
       ("River", "Colquhoun", 5, 1),
       ("Allyson", "Beach", 6, 2),
       ("Jack", "Everly", 6, 2),
       ("Claire", "Burnett", 7, 2),
       ("Jamie", "Redford", 8, 3),
       ("Sadiya", "Karim", 9, 3);