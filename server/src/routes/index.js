import express from 'express';

import authRoutes from './auth/routes';
import rolesRoutes from './roles/routes';

import { authMiddleware } from './auth/controllers';

const router = express.Router();

router.get('/ping', (req, res) => res.send('I\'m alive! :D'));

router.use('/auth', authRoutes);
router.use('/roles', authMiddleware, rolesRoutes);

module.exports = router;
