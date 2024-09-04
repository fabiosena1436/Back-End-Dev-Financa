// import mongoose from 'mongoose';

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

import mongoose from 'mongoose';

export async function setupMongo(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Database already connected')
      return;
    }
    console.log('Connecting to DB...');
    console.log('MONGO_URL:', process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('DB Connected!');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    throw new Error('DB not connected');
  }
}
