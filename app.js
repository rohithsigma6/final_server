
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(cors())
mongoose.connect('mongodb+srv://rbjuly31:rbjuly31@cluster0.cguxc9s.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

const mobileProductRoutes = require('./productModel/mobileProductRoutes');
const userRoutes = require('./userModel/userRoutes')
app.use('/v1', mobileProductRoutes);
app.use("/v1",userRoutes)

const port = 8289;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
