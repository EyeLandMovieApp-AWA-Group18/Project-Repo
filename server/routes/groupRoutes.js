import express from 'express';
import { auth } from '../helper/auth.js'; 
import { groupOwnerMiddleware } from '../helper/groupOwnerMiddleware.js';
import { 
    createGroup, 
    getAllGroups, 
    getGroupDetails, 
    deleteGroup 
} from '../controllers/groupController.js';
import {
    addGroupMember,
    removeGroupMember,
    getGroupMembers,
    checkMembership
} from '../controllers/groupMembershipController.js';

const router = express.Router();

// Group CRUD operations
router.post('/', auth, createGroup);
router.get('/', auth, getAllGroups);
router.get('/:id', auth, getGroupDetails);
router.delete('/:id', auth, groupOwnerMiddleware, deleteGroup);

// Group membership operations
router.post('/:id/members', auth, addGroupMember);
router.delete('/:id/members', auth, removeGroupMember);
router.get('/:id/members', auth, getGroupMembers);
router.get('/:id/membership', auth, checkMembership);

export default router;
