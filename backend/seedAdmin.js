const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'etrack@admin.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('etrack@access.com', 10);
    const admin = new Admin({
      email: 'etrack@admin.com',
      password: hashedPassword,
      recoveryQuestion: 'Default Secret Question',
      recoveryAnswer: 'Admin'
    });

    await admin.save();
    console.log('Default Admin created successfully!');
    console.log('Email: etrack@admin.com');
    console.log('Password: etrack@access.com');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
