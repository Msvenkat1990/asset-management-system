const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getEmployees);

router.get("/employees/add", employeeController.addEmployeePage);

router.post("/employees/add", employeeController.createEmployee);

router.get("/employees/edit/:id", employeeController.editEmployeePage);

router.post("/employees/update/:id", employeeController.updateEmployee);

router.get("/employees/delete/:id", employeeController.deleteEmployee);

module.exports = router;
