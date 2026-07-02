const { Employee } = require("../models");

// View all employees
exports.getEmployees = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }
    const employees = await Employee.findAll({ where });
    const message = req.session.message;
    req.session.message = null;
    res.render("employees", {
      employees,
      message,
      selectedStatus: req.query.status || "",
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Show Add Employee page
exports.addEmployeePage = (req, res) => {
  res.render("addEmployee");
};

// Save Employee
exports.createEmployee = async (req, res) => {
  try {
    await Employee.create({
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      status: req.body.status,
    });
    res.redirect("/employees");
  } catch (error) {
    res.send(error.message);
  }
};

// Show Edit Page
exports.editEmployeePage = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    console.log("EDIT EMPLOYEE:", employee);
    if (!employee) {
      return res.send("Employee not found");
    }
    res.render("editEmployee", {
      employee,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  await Employee.update(
    {
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      status: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  req.session.message = "Employee updated successfully";
  res.redirect("/employees");
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  await Employee.destroy({
    where: {
      id: req.params.id,
    },
  });
  req.session.message = "Employee deleted successfully";
  res.redirect("/employees");
};
