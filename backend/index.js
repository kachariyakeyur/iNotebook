const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
require('dotenv').config();


const app = express()

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

// Available Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

const startServer = async () => {
  try {
    await connectToMongo(); // wait for DB first

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect MongoDB:", error);
  }
};

startServer();