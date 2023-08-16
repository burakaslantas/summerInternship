var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET companies listing. */
router.get('/', async function(req, res) {
  try {
    const companies = await prisma.companyModel.findMany();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/', async function(req, res) {
  const { companyName, hrMail, hrMailPassword, aLiveToMail, aLiveCcMail, aLiveBccMail } = req.body;

  try {
    const createdCompany = await prisma.companyModel.create({
      data: {
        companyName,
        hrMail,
        hrMailPassword,
        aLiveToMail,
        aLiveCcMail,
        aLiveBccMail,
      },
    });
    res.status(201).json(createdCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.put('/:id', async function(req, res) {
  const companyId = parseInt(req.params.id);
  const { companyName, hrMail, hrMailPassword, aLiveToMail, aLiveCcMail, aLiveBccMail } = req.body;

  try {
    const updatedCompany = await prisma.companyModel.update({
      where: { id: companyId },
      data: {
        companyName,
        hrMail,
        hrMailPassword,
        aLiveToMail,
        aLiveCcMail,
        aLiveBccMail,
      },
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async function(req, res) {
  const companyId = parseInt(req.params.id);

  try {
    const deletedCompany = await prisma.companyModel.delete({
      where: { id: companyId },
    });
    res.status(200).json(deletedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
