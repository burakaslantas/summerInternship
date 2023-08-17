var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async function(req, res) {
  try {
    const admins = await prisma.adminModel.findMany({
      where: { isDeleted: 0 } // Sadece silinmemiş adminleri getir
    });
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/:id', async function(req, res) {
  const adminId = parseInt(req.params.id);
  
  try {
    const admin = await prisma.adminModel.findUnique({
      where: { id: adminId },
    });

    if (admin && !admin.isDeleted) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/', async function(req, res) {
  const { adminName, company, email, emailPassword } = req.body;
  
  try {
    const createdAdmin = await prisma.adminModel.create({
      data: {
        adminName,
        company,
        email,
        emailPassword,
      },
    });
    res.status(201).json(createdAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.put('/:id', async function(req, res) {
  const adminId = parseInt(req.params.id);
  const { adminName, company, email, emailPassword } = req.body;

  try {
    const updatedAdmin = await prisma.adminModel.update({
      where: { id: adminId },
      data: {
        adminName,
        company,
        email,
        emailPassword,
      },
    });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async function(req, res) {
  const adminId = parseInt(req.params.id);

  try {
    const updatedAdmin = await prisma.adminModel.update({
      where: { id: adminId },
      data: {
        isDeleted: 1
      },
    });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
