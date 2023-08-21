const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors'); // Assuming you have this library

class authService {

    static async register(data) {

        const { email } = data;

        data.emailPassword = bcrypt.hashSync(data.emailPassword, 8);
        let admin = await prisma.adminModel.create({
            data
        });

        data.accessToken = await jwt.signAccessToken(admin);
        console.log(data);
        return data;
    }

    static async login(data) {

        const { email, emailPassword } = data;
        const admin = await prisma.adminModel.findUnique({
            where: {
                email
            }
        });

        if (!admin) {
            throw createError.NotFound('Admin not registered');
        }

        const checkPassword = bcrypt.compareSync(emailPassword, admin.emailPassword);
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');

        const accessToken = await jwt.signAccessToken(admin);

        return { ...admin, accessToken };
    }

    static async all() {

        const allAdmins = await prisma.adminModel.findMany();

        return allAdmins;
    }
}

module.exports = authService;
