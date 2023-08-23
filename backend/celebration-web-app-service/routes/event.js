const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all events
router.get('/', async function(req, res) {
  try {
    const events = await prisma.eventModel.findMany({
      where: { isDeleted: 0 } // Sadece silinmemiş eventleri getir
    });

    const responsePayload = await Promise.all(events.map(async event => {
      const company = await prisma.companyModel.findUnique({
        where: { id: event.companyId }
      });

      return { 
        eventName: event.eventName,
        company: company ? company.companyName : '',
        type: event.type,
        to: event.to,
        bcc: event.bcc,
        hour: event.hour,
        minute: event.minute,
        date: event.date,
        imageFile: event.imageFile ? event.imageFile.filePath : null,
        textTemplate: event.textTemplate,
        id: event.id
      };
    }));

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// GET a specific event by ID
router.get('/:id', async function(req, res) {
  const eventId = parseInt(req.params.id);
  
  try {
    const event = await prisma.eventModel.findUnique({
      where: { id: eventId },
      include: {
        company: true
      }
    });

    if (event && event.isDeleted === 0) {
      const responsePayload = {
        eventName: event.eventName,
        company: event.company ? event.company.companyName : '',
        type: event.type,
        to: event.to,
        bcc: event.bcc,
        hour: event.hour,
        minute: event.minute,
        date: event.date,
        imageFile: event.imageFile ? event.imageFile.filePath : null,
        textTemplate: event.textTemplate,
        id: event.id
      };
      res.status(200).json(responsePayload);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// POST a new event
router.post('/', async function(req, res) {
  const { eventName, type, to, bcc, hour, minute, date, imageFile, textTemplate, company } = req.body;
  console.log(imageFile)
  try {
    const companyObj = await prisma.companyModel.findUnique({
      where: { companyName: company }
    });

    if (!companyObj) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const createdEvent = await prisma.eventModel.create({
      data: {
        eventName,
        type,
        to,
        bcc,
        hour,
        minute,
        date,
        imageFile: imageFile ? { connect: { id: imageFile.id } } : undefined,
        textTemplate,
        company: { connect: { id: companyObj.id } }
      },
    });

    const responsePayload = {
      eventName: createdEvent.eventName,
      company: companyObj.companyName,
      type: createdEvent.type,
      to: createdEvent.to,
      bcc: createdEvent.bcc,
      hour: createdEvent.hour,
      minute: createdEvent.minute,
      date: createdEvent.date,
      imageFile: createdEvent.imageFile ? createdEvent.imageFile.filePath : null,
      textTemplate: createdEvent.textTemplate,
      id: createdEvent.id
    };

    res.status(201).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// PUT (update) an existing event by ID
router.put('/:id', async function(req, res) {
  const eventId = parseInt(req.params.id);
  const { eventName, type, to, bcc, hour, minute, date, imageFile, textTemplate, companyId } = req.body;

  try {
    const updatedEvent = await prisma.eventModel.update({
      where: { id: eventId },
      data: {
        eventName,
        type,
        to,
        bcc,
        hour,
        minute,
        date,
        imageFile: imageFile ? { create: { filePath: imageFile } } : undefined,
        textTemplate,
        company: {
          connect: { id: companyId }
        }
      },
      include: {
        company: true
      }
    });

    const responsePayload = {
      eventName: updatedEvent.eventName,
      company: updatedEvent.company ? updatedEvent.company.companyName : '',
      type: updatedEvent.type,
      to: updatedEvent.to,
      bcc: updatedEvent.bcc,
      hour: updatedEvent.hour,
      minute: updatedEvent.minute,
      date: updatedEvent.date,
      imageFile: updatedEvent.imageFile ? updatedEvent.imageFile.filePath : null,
      textTemplate: updatedEvent.textTemplate,
      id: updatedEvent.id
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// DELETE an event by ID
router.delete('/:id', async function(req, res) {
  const eventId = parseInt(req.params.id);

  try {
    const deletedEvent = await prisma.eventModel.update({
      where: { id: eventId },
      data: {
        isDeleted: 1
      },
      include: {
        company: true
      }
    });

    const responsePayload = {
      eventName: deletedEvent.eventName,
      company: deletedEvent.company ? deletedEvent.company.companyName : '',
      type: deletedEvent.type,
      to: deletedEvent.to,
      bcc: deletedEvent.bcc,
      hour: deletedEvent.hour,
      minute: deletedEvent.minute,
      date: deletedEvent.date,
      imageFile: deletedEvent.imageFile ? deletedEvent.imageFile.filePath : null,
      textTemplate: deletedEvent.textTemplate,
      id: deletedEvent.id
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
