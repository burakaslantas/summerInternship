const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async function(req, res) {
  try {
    const events = await prisma.eventModel.findMany({
      where: { isDeleted: 0 }, // Only fetch non-deleted events
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/:id', async function(req, res) {
  const eventId = parseInt(req.params.id);
  
  try {
    const event = await prisma.eventModel.findUnique({
      where: { id: eventId },
    });

    if (event && event.isDeleted === 0) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/', async function(req, res) {
  const { eventName, company, type, to, bcc, hour, minute, date, imageFile, textTemplate } = req.body;
  
  try {
    const createdEvent = await prisma.eventModel.create({
      data: {
        eventName,
        company,
        type,
        to,
        bcc,
        hour,
        minute,
        date,
        imageFile,
        textTemplate,
      },
    });
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.put('/:id', async function(req, res) {
  const eventId = parseInt(req.params.id);
  const { eventName, company, type, to, bcc, hour, minute, date, imageFile, textTemplate } = req.body;

  try {
    const updatedEvent = await prisma.eventModel.update({
      where: { id: eventId },
      data: {
        eventName,
        company,
        type,
        to,
        bcc,
        hour,
        minute,
        date,
        imageFile,
        textTemplate,
      },
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async function(req, res) {
  const eventId = parseInt(req.params.id);

  try {
    const updatedEvent = await prisma.eventModel.update({
      where: { id: eventId },
      data: {
        isDeleted: 1,
      },
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
