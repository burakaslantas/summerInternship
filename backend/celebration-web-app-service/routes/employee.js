const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async function(req, res) {
  try {
    const employees = await prisma.employeeModel.findMany({
      where: { isDeleted: 0 }, // Only fetch non-deleted employees
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/:id', async function(req, res) {
  const employeeId = parseInt(req.params.id);
  
  try {
    const employee = await prisma.employeeModel.findUnique({
      where: { id: employeeId },
    });

    if (employee && employee.isDeleted === 0) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/', async function(req, res) {
  const { employeeName, employeeSurname, employeeEmail, employeeRegNo, employeeStartDate, employeeBirthDay, managerName, managerSurname, managerRegNo, companyRegNo } = req.body;
  
  try {
    const createdEmployee = await prisma.employeeModel.create({
      data: {
        employeeName,
        employeeSurname,
        employeeEmail,
        employeeRegNo,
        employeeStartDate,
        employeeBirthDay,
        managerName,
        managerSurname,
        managerRegNo,
        companyRegNo,
      },
    });
    res.status(201).json(createdEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.put('/:id', async function(req, res) {
  const employeeId = parseInt(req.params.id);
  const { employeeName, employeeSurname, employeeEmail, employeeRegNo, employeeStartDate, employeeBirthDay, managerName, managerSurname, managerRegNo, companyRegNo } = req.body;

  try {
    const updatedEmployee = await prisma.employeeModel.update({
      where: { id: employeeId },
      data: {
        employeeName,
        employeeSurname,
        employeeEmail,
        employeeRegNo,
        employeeStartDate,
        employeeBirthDay,
        managerName,
        managerSurname,
        managerRegNo,
        companyRegNo,
      },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async function(req, res) {
  const employeeId = parseInt(req.params.id);

  try {
    const updatedEmployee = await prisma.employeeModel.update({
      where: { id: employeeId },
      data: {
        isDeleted: 1,
      },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
