import express from 'express';
import { body } from 'express-validator';
import { addProfile, updateProfile } from '../controllers/Profiles';
import { isUserInDB } from '../validations/User'

const router = express.Router();
router.put('/', [
    isUserInDB(),
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
        .isDate({ format: 'yyyy-mm-dd' })
        .withMessage('Invalid date format, allowed format is yyyy-mm-dd'),
    body('phone')
        .optional()
        .isNumeric()
        .isLength({ max: 10, min: 10 })
        .withMessage('Invalid phone number.'),
    body('addressLine1')
        .optional()
        .escape(),
    body('addressLine2')
        .optional()
        .escape(),
    body('city')
        .optional()
        .isLength({ max: 16 })
        .withMessage('Invalid city.')
        .escape(),
    body('state')
        .optional()
        .isLength({ max: 16 })
        .withMessage('Invalid state.')
        .escape(),
    body('country')
        .optional()
        .isLength({ max: 16 })
        .withMessage('Invalid country.')
        .escape()
], addProfile)

router.patch('/', [
    isUserInDB(),
    body('firstName')
        .optional()
        .isAlpha()
        .isLength({ max: 16 })
        .withMessage('Invalid first name.')
        .escape()
], updateProfile)

export default router;