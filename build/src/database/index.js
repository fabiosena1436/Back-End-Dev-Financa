"use strict";
// import mongoose from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMongo = setupMongo;
// export async function setupMongo(): Promise<void> {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       return;
//     }
//     console.log('Connecting to DB...');
//     await mongoose.connect(process.env.MONGO_URL as string);
//     console.log('DB Connected!');
//   } catch {
//     throw new Error('DB not connected');
//   }
// }
const mongoose_1 = __importDefault(require("mongoose"));
async function setupMongo() {
    try {
        if (mongoose_1.default.connection.readyState === 1) {
            console.log('Database already connected');
            return;
        }
        console.log('Connecting to DB...');
        console.log('MONGO_URL:', process.env.MONGO_URL);
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log('DB Connected!');
    }
    catch (error) {
        console.error('Error connecting to DB:', error);
        throw new Error('DB not connected');
    }
}
