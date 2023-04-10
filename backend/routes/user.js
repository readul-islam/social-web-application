import { addRemoveFriend, getUser, getUserFriends } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';
import express, { Router } from 'express';
const router= express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friend', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);








export default router;
