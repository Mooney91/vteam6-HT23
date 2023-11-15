const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || "1337";

dotenv.config({path: '.env'})

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({name:'vteam6', success:'true'})
})

const CityRouter = require('./routes/City');
app.use('/city', CityRouter);

// LISTENING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});