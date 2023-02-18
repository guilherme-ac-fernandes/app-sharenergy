import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://localhost:27017/sharenergy_crud';

// Utilização do strinctQuery para correção do warning
// proveniente do Stack OverFlow
// source: https://stackoverflow.com/questions/7474747
// 6/deprecationwarning-mongoose-the-strictquery-optio
// n-will-be-switched-back-to
mongoose.set('strictQuery', false);

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
