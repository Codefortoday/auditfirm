const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");

mongoDB(); // Connect to MongoDB
const cors = require('cors');  // Import CORS package
app.use(cors());  // Enable CORS for all routes
//app.use(cors({ origin: "*" }));  // Allows requests from any origin

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Header",
    "Origin,X-Requested-With, Content-Type,Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!123');
});
app.use(express.json())
app.use('/api', require("./Routes/Createuser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/Adminlogin"));

app.use('/api', require("./Routes/Testimonal"));
app.use('/api', require("./Routes/Newsletter"));
app.use('/api', require("./Routes/Appointment"));
app.use('/api', require("./Routes/Contact"));
app.use('/api', require("./Routes/Reset_pass"));
app.use('/uploads', express.static('uploads'));
app.use('/Chatbot', express.static('Chatbot'));
app.use('/api',require("./Routes/Chatbot"))
app.use('/api',require("./Routes/Service"))
app.use(bodyParser.json()); // Enable JSON parsing


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
