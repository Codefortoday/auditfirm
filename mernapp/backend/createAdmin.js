const Admin = require("./models/Admin");  // Import Admin model
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb://anshujain:anshujain1008@cluster0-shard-00-00.tnqd7.mongodb.net:27017,cluster0-shard-00-01.tnqd7.mongodb.net:27017,cluster0-shard-00-02.tnqd7.mongodb.net:27017/auditfirm?ssl=true&replicaSet=atlas-ivp5cx-shard-0&authSource=admin&retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("superadmin123", 10);  // Secure password
    const newAdmin = new Admin({
      name: "Super Admin",
      email: "Superadmin@gmail.com",
      password: hashedPassword, // Use the hashed password
      role:"Superadmin"
    });

    await newAdmin.save();
    console.log("Admin created successfully!");

    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();
