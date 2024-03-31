const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, memberIds } = req.body;
        const uniqueMemberIds = [...new Set(memberIds)];
        const members = await User.find({ _id: { $in: uniqueMemberIds } });
        const domainSet = new Set();
        const availabilitySet = new Set();
        for (const member of members) {
            if (!member.available || domainSet.has(member.domain)) {
                return res.status(400).json({ error: 'Members should have unique domains and availability set to true' });
            }
            domainSet.add(member.domain);
            availabilitySet.add(member.available);
        }
        const newTeam = new Team({ name, members });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});


router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});

module.exports = router;
