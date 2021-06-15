import express from 'express';
// import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Middlewares
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// if(process.env.NODE_ENV === "production") {
//   const __dirname = path.dirname('client');
//   app.use(express.static(path.join(__dirname, '/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('Api running');
//   });
// }

const PORT = process.env.PORT || 5000;

// Connected to mongodb
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
