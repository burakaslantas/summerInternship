var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const admins = await prisma.adminModel.findMany();
    res.status(200).json(admins);
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
    const deletedAdmin = await prisma.adminModel.delete({
      where: { id: adminId },
    });
    res.status(200).json(deletedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});

module.exports = router;
