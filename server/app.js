const express = require('express');
const app = express();
const port = process.env.PORT || "1337";
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path: '.env'})

// ROUTERS
const CityRouter = require('./routes/City');

// MIDDLEWARE
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({name:'vteam6', success:'true'})
})

app.use('/city', CityRouter);

// LISTENING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});