const mongoose = require('mongoose');
const adminSeeder = require('../seeders/admin.seeder');

const mongoURI = process.env.DATABASE_URI;

(async () => {
    try {
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
        console.log(`Database Connection: ${connection.connection.host}`);
        await adminSeeder();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
})();
