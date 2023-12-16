const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || "1337";
const cors = require('cors');
const dotenv = require('dotenv');
// const apiVersion = "v1"

dotenv.config({path: '.env'})

// ROUTERS - VERSION 01
const ActivityTypeV1 = require('./v1/routes/ActivityType');
const PermittedZoneV1 = require('./v1/routes/PermittedZone');
const CityRouterV1 = require('./v1/routes/City');
const CostStructureV1 = require('./v1/routes/CostStructure');
const PaymentTypeV1 = require('./v1/routes/PaymentType');
const RentalLogV1 = require('./v1/routes/RentalLog');
const ScooterV1 = require('./v1/routes/Scooter');
const ScooterLogV1 = require('./v1/routes/ScooterLog');
const StationV1 = require('./v1/routes/Station');
const StationTypeV1 = require('./v1/routes/StationType');
const UserV1 = require('./v1/routes/User');

// MIDDLEWARE
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({name:'vteam6', success:'true'})
})

// VERSION 01
// app.get(`/v1`, (req, res) => {
//   const indexPath = __dirname ? path.join(__dirname, 'index.html') : 'index.html';
//   res.sendFile(indexPath);
// });

app.get('/v1',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/v1/activity-type', ActivityTypeV1);
app.use('/v1/permitted-zone', PermittedZoneV1);
app.use('/v1/city', CityRouterV1);
app.use('/v1/cost-structure', CostStructureV1);
app.use('/v1/payment-type', PaymentTypeV1);
app.use('/v1/rental-log', RentalLogV1);
app.use('/v1/scooter', ScooterV1);
app.use('/v1/scooter-log', ScooterLogV1);
app.use('/v1/Station', StationV1);
app.use('/v1/station-type', StationTypeV1);
app.use('/v1/user', UserV1);

// LISTENING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});