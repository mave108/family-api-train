import express from 'express';
import { body } from 'express-validator';
import { getMembers, addMembers, addProfile } from '../controllers/Members';
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
router.put('/profile', [
    body('userId')
        .notEmpty()
        .custom(async userId => {
            const user = await prisma.users.findFirst({
                select: {
                    id: true
                },
                where: {
                    id: userId
                }
            });
            if (!user) {
                return new CustomError("Invalid user")
                    .setStatusCode(400)
                    .throw();
            }
        }),
    body('firstName')
        .notEmpty()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid first name.')
        .escape(),
    body('middleName')
        .optional()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid middle name.')
        .escape(),
    body('lastName')
        .optional()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid last name.')
        .escape(),
    body('nickName')
        .optional()
        .isAlpha()
        .isLength({ max: 8 })
        .escape()
        .withMessage('Invalid nick name.'),
    body('gender')
        .notEmpty()
        .isIn(['MALE', 'FEMALE'])
        .withMessage('Invalid gender.'),
    body('dob')
        .notEmpty()
        .isDate()
        .withMessage('Invalid DOB'),
    body('phone')
        .optional()
        .isNumeric()
        .isLength({ max: 10, min: 10 })
        .withMessage('Invalid phone number.'),
    body('addressLine1')
        .optional()
        .isAlphanumeric()
        .escape()
        .withMessage('Invalid phone address line 1.'),
    body('addressLine2')
        .optional()
        .isAlphanumeric()
        .escape()
        .withMessage('Invalid phone address line 2.'),
    body('city')
        .optional()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid city.')
        .escape(),
    body('state')
        .optional()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid state.')
        .escape(),
    body('country')
        .optional()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid country.')
        .escape()
], addProfile)
export default router;