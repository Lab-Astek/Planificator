import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => res.send('I\'m alive! :D'));

module.exports = router;
