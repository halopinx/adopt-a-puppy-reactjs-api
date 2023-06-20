import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import puppiesRoute from './routes/puppies.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/puppies', puppiesRoute);

mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Connected to MongoDB...')
    app.listen(process.env.PORT_API, () => {
        console.log('Start running at port 5000')
    })
    
  })
  .catch((error) => console.log(error));

export default app;