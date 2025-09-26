// Model → actual object you use in code to read/write documents.

// import mongoose library (used to interact with MongoDB)
const mongoose = require('mongoose');

// define a schema (blueprint) for a Customer document
// Schema → defines the shape of your data in MongoDB.
const CustomerSchema = mongoose.Schema(
    {
        // field: "date" → stores a Date value
        date: {
            type: Date, // type is Date
        },
         // field: "name" → required string
        name: {
            type: String, // type is String
            required: true,  // must always be provided
        },
        // field: "email" → required string
        email: {
            type: String,
            required: true,
        },
         // field: "phone" → required string
        phone: {
            type: String,
            required: true,
        },
    }
);

// create a Mongoose model called "Customer"
// "customers" is the name of the MongoDB collection (table) it maps to
const Customer = mongoose.model('customers', CustomerSchema);

// export the Customer model so other files can use it (like routes)
module.exports = Customer;