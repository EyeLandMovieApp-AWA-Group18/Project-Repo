import express from 'express';
import { auth } from '../helper/auth.js'; 
import { groupOwnerMiddleware } from '../helper/groupOwnerMiddleware.js';
import { 
    createGroup, 
    getAllGroups, 
    getGroupDetails, 
    deleteGroup 
} from '../controllers/groupController.js';

const router = express.Router();

// Create a new group
router.post('/', auth, createGroup);

// Get all groups
router.get('/', auth, getAllGroups);

// Get group details
router.get('/:id', auth, getGroupDetails);

// Delete a group (only owner)
router.delete('/:id', auth, groupOwnerMiddleware, deleteGroup);

export default router;
