import express from 'express';
import { body } from 'express-validator';
import { getMembers, addMembers } from '../controllers/Members';
import { PrismaClient } from '@prisma/client'
import CustomError from '../utils/Error';
const prisma = new PrismaClient();

const router = express.Router();

router.put('/add', [
    body('owner')
        .notEmpty()
        .withMessage('Please enter valid owner')
        .custom(async ownerId => {
            var user = prisma.users.findUnique({
                select: {
                    id: true
                },
                where: {
                    id: ownerId
                }
            });
            if (!user) {
                return new CustomError("Invalid owner")
                    .setStatusCode(400)
                    .throw();
            }
        }),
    body('member')
        .notEmpty()
        .withMessage('Please enter valid member')
        .custom(async memberId => {
            var user = prisma.users.findUnique({
                select: {
                    id: true
                },
                where: {
                    id: memberId
                }
            });
            if (!user) {
                return new CustomError("Invalid member")
                    .setStatusCode(400)
                    .throw();
            }
        })
], addMembers);
router.get('/', getMembers);
export default router;