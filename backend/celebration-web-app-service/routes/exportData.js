const express = require('express');
const router = express.Router();
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
      const companies = await prisma.companyModel.findMany({
        include: {
          admins: true, // Include the admins relation
          events: {
            include: {
                    imageFile: true
                },
            }, // Include the events relation
        },
      });


    const exportedData = [];

    for (const company of companies) {
        for (const event of company.events) {
            const eventData = {
            companyName: company.companyName,
            host: 'smtp.office365.com',
            port: 587,
            user: company.hrMail,
            pass: company.hrMailPassword,
            birthdayAttachment:
                event.type === 'Birthday' ? event.imageFile?.originalName || '' : '',
            hireDateAttachment:
                event.type === 'Hire Date' ? event.imageFile?.originalName || '' : '',
            companyHR: company.hrMail,
            companyDevs: company.admins.map((admin) => admin.email).join(', '),
            aliveTo: company.aLiveToMail,
            aliveBCC: company.aLiveBccMail,
            };

            exportedData.push(eventData);
        }
    }

        // Now, exportedData contains an array of JSON objects, with each object representing a different event within each company.

            
  
      const jsContent = `module.exports = ${JSON.stringify(
        exportedData,
        null,
        2
      )};`;
  
      fs.writeFile('exportedData.js', jsContent, (err) => {
        if (err) {
          console.error('Error exporting data:', err);
          res.status(500).json({ error: 'Error exporting data' });
        } else {
          console.log('Data exported successfully');
          res.status(200).json({ message: 'Data exported successfully' });
        }
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      res.status(500).json({ error: 'Error exporting data' });
    }
  });
  
  module.exports = router;
  