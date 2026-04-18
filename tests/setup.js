import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { MongoMemoryServer } from 'mongodb-memory-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.test') });

let mongoServer;

beforeAll(async () => {
    try {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        console.log('Attempting to connect to Memory MongoDB at:', mongoUri);
        await mongoose.connect(mongoUri);
        console.log('Connected to Memory MongoDB successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('Closed MongoDB connection');
    }
    if (mongoServer) {
        await mongoServer.stop();
        console.log('Stopped Memory MongoDB server');
    }
});

beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany();
        }
    }
});