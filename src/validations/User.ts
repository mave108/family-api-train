import { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import CustomError from '../utils/Error';
const prisma = new PrismaClient();

export const isUserInDB = (fieldName: string = 'userId') => body(fieldName)
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
    })