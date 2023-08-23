const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async function(req, res) {
  try {
    const admins = await prisma.adminModel.findMany({
      where: { isDeleted: 0 } // Sadece silinmemiş adminleri getir
    });

    const responsePayload = await Promise.all(admins.map(async admin => {
      const company = await prisma.companyModel.findUnique({
        where: { id: admin.companyId }
      });

      return {
        adminName: admin.adminName,
        company: company ? company.companyName : '',
        email: admin.email,
        emailPassword: admin.emailPassword,
        id: admin.id
      };
    }));

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// GET a specific admin by ID
router.get('/:id', async function(req, res) {
  const adminId = parseInt(req.params.id);
  
  try {
    const admin = await prisma.adminModel.findUnique({
      where: { id: adminId },
    });

    if (admin && admin.isDeleted === 0) {
      const company = await prisma.companyModel.findUnique({
        where: { id: admin.companyId }
      });

      const responsePayload = {
        adminName: admin.adminName,
        company: company ? company.companyName : '',
        email: admin.email,
        emailPassword: admin.emailPassword,
        id: admin.id
      };

      res.status(200).json(responsePayload);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/', async function(req, res) {
  console.log(req.body)
  const { adminName, email, emailPassword, company } = req.body;
  
  try {
    // Şirket ismini kullanarak ilgili companyModel'i bul
    const companyObj = await prisma.companyModel.findUnique({
      where: { companyName: company }
    });

    if (!companyObj) {
      console.log("COMPANY NOT FOUND")
      return res.status(404).json({ error: 'Company not found' });
    }

    const createdAdmin = await prisma.adminModel.create({
      data: {
        adminName,
        email,
        emailPassword,
        company: { connect: { id: companyObj.id } }
      },
    });

    const responsePayload = {
      adminName: createdAdmin.adminName,
      company: companyObj.companyName,
      email: createdAdmin.email,
      emailPassword: createdAdmin.emailPassword,
      id: createdAdmin.id
    };

    res.status(201).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// PUT (update) an existing admin by ID
router.put('/:id', async function(req, res) {
  const adminId = parseInt(req.params.id);
  const { adminName, email, emailPassword, companyId } = req.body;

  try {
    const updatedAdmin = await prisma.adminModel.update({
      where: { id: adminId },
      data: {
        adminName,
        email,
        emailPassword,
        company: {
          connect: { id: companyId } // companyId ile company tablosuna bağlantı yapılıyor
        }
      },
    });

    const updatedAdminWithCompany = await prisma.adminModel.findUnique({
      where: { id: adminId },
    });

    const company = await prisma.companyModel.findUnique({
      where: { id: updatedAdminWithCompany.companyId }
    });

    const responsePayload = {
      adminName: updatedAdminWithCompany.adminName,
      company: company ? company.companyName : '',
      email: updatedAdminWithCompany.email,
      emailPassword: updatedAdminWithCompany.emailPassword,
      id: updatedAdminWithCompany.id
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// DELETE an admin by ID
router.delete('/:id', async function(req, res) {
  const adminId = parseInt(req.params.id);

  try {
    const deletedAdmin = await prisma.adminModel.findUnique({
      where: { id: adminId },
    });

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const updatedAdmin = await prisma.adminModel.update({
      where: { id: adminId },
      data: {
        isDeleted: 1
      },
    });

    const company = await prisma.companyModel.findUnique({
      where: { id: deletedAdmin.companyId }
    });

    const responsePayload = {
      adminName: deletedAdmin.adminName,
      company: company ? company.companyName : '',
      email: deletedAdmin.email,
      emailPassword: deletedAdmin.emailPassword,
      id: deletedAdmin.id
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;
