const express = require('express');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes.js');
const mongoose = require('mongoose');
const { configDotenv } = require('dotenv');
configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Db connected');
})

app.use('/api/users', userRoutes);


app.listen(5000, ()=>{
    console.log("Server started");
})

// const jsonData = fs.readFileSync('./data/heliverse_mock_data.json', 'utf8');
// const usersData = JSON.parse(jsonData);

// User.insertMany(usersData)
//   .then((result) => {
//     console.log(`${result.length} documents inserted.`);
//     mongoose.disconnect(); 
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//     mongoose.disconnect();
//   });