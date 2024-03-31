const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { domain, gender, available, search, page = 1} = req.query;
        const filters = {};
        if (domain) filters.domain = domain;
        if (gender) filters.gender = gender;
        if (available) filters.available = available;
        if (search) filters.$or = [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } }
        ];
        const limit = 20;

        const users = await User.find(filters)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const domains = await User.distinct('domain');
        const genders = await User.distinct('gender');

        const totalCount = await User.countDocuments(filters);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({ users, totalPages, domains, genders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        else {
            const highestIdUser = await User.findOne({}, {}, { sort: { 'id': -1 } });
            const newId = highestIdUser ? highestIdUser.id + 1 : 1;

            const newUser = new User({ id: newId, first_name, last_name, email, gender, avatar, domain, available });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { id: req.params.id },
            { first_name, last_name, email, gender, avatar, domain, available },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: req.params.id });
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;