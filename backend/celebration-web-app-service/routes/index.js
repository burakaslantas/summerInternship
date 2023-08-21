const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const createError = require('http-errors')

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/auth', auth);

router.use( async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})


module.exports = router;