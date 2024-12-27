const mongoose = require("mongoose");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/bcrypt");

const adminSeeder = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" })
        if (!adminExists) {
            console.log("running admin seeders to make an admin")
            const defaultAdmin = new User({
                name: "admin",
                email: "admin@admin.com",
                password: await hashPassword("adminSecure101"),
                role: "admin"
            })
            await defaultAdmin.save();
            console.log("default admin created successfully")
        } else {
            console.log("admin user already exist. use these credentials")
        }
    } catch (error) {
        console.error("Error while setting up admin user", error.message)
    }
}

module.exports = adminSeeder