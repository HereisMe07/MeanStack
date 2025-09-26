const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = 3000;

// enable cors
app.use(cors());
// enable json parser
app.use(express.json());

// route the customer api
const customerRoutes = require('./routes/customers');
// use the route
app.use('/api/customers', customerRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Customers API !")
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully listening on port:", PORT);
    else
        console.log("Error occurred:", error);
});

main().catch((error) => console.error(error));

async function main() {
    // connect to mongodb
    const connectionString = "mongodb://localhost:27017/mean01";
    await mongoose.connect(connectionString);
    mongoose.set('strictQuery', true);
    console.log("Connected to MongoDB");
}