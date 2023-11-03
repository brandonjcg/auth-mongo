import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  await mongoose.connect(uri)
    .then(() => {
      console.log('🟢 Database connected');
    })
    .catch((err) => {
      console.log(`🔴 Error: ${err.message}`);
    });
};

export default connectDB;
