const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get: list
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

// Get: get by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findOne({ _id: id });
        res.status(200).json(customer);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

// POST: create
router.post('/', async (req, res) => {
   try {
        const customer = new Customer(req.body);
        const saveCustomer = customer.save();
        res.status(200).json(saveCustomer);
    } 
   catch (error) {
       res.status(500).json({ message: "An error occurred", error: error });
    }
});

// PUT: update
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = req.body;
        const updateCustomer = await Customer.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: customer
            },
            {
                new: true
            }
        );
        res.status(200).json(updateCustomer);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

// DELETE: delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let deleteCustomer = await Customer.deleteOne({ _id: id });
        res.status(200).json(deleteCustomer);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

module.exports = router;