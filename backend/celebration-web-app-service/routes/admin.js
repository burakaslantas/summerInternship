var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('GET respond with a resource BURAK');
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

router.put('/', function(req, res) {
  res.send('PUT respond with a resource BURAK');
});

router.delete('/', function(req, res) {
  res.send('DELETE respond with a resource BURAK');
});

module.exports = router;
