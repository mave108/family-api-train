import { validationResult } from 'express-validator';
import { CustomRequest, Response, NextFunction } from '../utils/http';
import { PrismaClient } from '@prisma/client'
import { sendHttpResponse } from '../utils/http';
import CustomError from '../utils/Error';


const prisma = new PrismaClient();
export const addProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(sendHttpResponse(false, { error: errors.array() }));
    }
    const { userId, firstName, middleName, lastName, nickName, gender, dob, phone, addressLine1, addressLine2, city, state, country } = req.body;

    try {
        const profileResp = await prisma.profile.create({
            data: {
                userId,
                firstName,
                middleName,
                lastName,
                nickName,
                gender,
                dob: new Date(dob).toISOString(),
                phone,
                addressLine1,
                addressLine2,
                city,
                state,
                country
            }
        })

        if (profileResp) {
            res.status(201).json(sendHttpResponse(true, null, profileResp));
        } else {
            next(
                new CustomError('Something Went wrong.')
                    .setStatusCode(500)
            )
        }
    } catch (err) {
        console.log("profileResp", err)
        next(
            new CustomError('Something Went wrong.')
                .setStatusCode(500)
                .setData(String(err))
        )
    }

}

export const updateProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(sendHttpResponse(false, { error: errors.array() }));
    }
}