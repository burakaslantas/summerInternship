const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors'); // Assuming you have this library

class authService {
  static async register(data) {
    console.log(data);
    const { adminName, email, emailPassword, companyId } = data;

    try {
        // Şirket ismini kullanarak ilgili companyModel'i bul
        const companyObj = await prisma.companyModel.findUnique({
          where: { id: companyId }
        });
    
        if (!companyObj) {
          return res.status(404).json({ error: 'Company not found' });
        }

        data.emailPassword = bcrypt.hashSync(data.emailPassword, 8);
        console.log("data.emailPassword before createdAdmin:", data.emailPassword)
        const createdAdmin = await prisma.adminModel.create({
          data: {
            adminName,
            email,
            emailPassword: data.emailPassword,
            company: { connect: { id: companyObj.id } }
          },
        });

        createdAdmin.emailPassword = bcrypt.hashSync(data.emailPassword, 8);
        
        console.log(data.emailPassword);
        //console.log("before responsePayload", responsePayload);
        const responsePayload = {
          adminName: createdAdmin.adminName,
          company: companyObj.companyName,
          email: createdAdmin.email,
          emailPassword: bcrypt.hashSync(data.emailPassword, 8),
          id: createdAdmin.id
        };
        console.log("after responsePayload", responsePayload);
        responsePayload.accessToken = await jwt.signAccessToken(createdAdmin);
        return responsePayload;
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
  }

  static async login(data) {
    const { email, emailPassword } = data;
    const admin = await prisma.adminModel.findUnique({
      where: {
        email,
      }
    });

    if (!admin) {
      throw createError.NotFound('Admin not registered');
    }

     // Debugging logs
  console.log("this is emailPassword: #", emailPassword, "#");
  console.log("this is admin.emailPassword: #", admin.emailPassword, "#");

  ;
  const checkPassword = bcrypt.compareSync(emailPassword, admin.emailPassword);
  console.log("this is checkPassword: ", checkPassword);

  if (!checkPassword) {
    console.log("Password comparison failed."); // Add a debug log
    throw createError.Unauthorized('Email address or password not valid');
  }

    delete admin.emailPassword;

    const accessToken = await jwt.signAccessToken(admin);

    return { ...admin, accessToken };
  }

  static async all() {
    const allAdmins = await prisma.adminModel.findMany({
      include: {
        company: true, // Include the associated company
      },
    });

    return allAdmins;
  }
}

module.exports = authService;
