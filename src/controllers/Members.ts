import {validationResult} from 'express-validator';
import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client'
import {sendHttpResponse} from '../utils/http';

const prisma = new PrismaClient();

export const getMembers = async (req: Request, res: Response) => {

const data = await prisma.members.findMany({
    select:{
        owner_id: true,
        member_id: true,
        user: {
            select: {
                uid: true,
                email: true,
            }
        }
    },
    where:{
       owner_id: 1
    }
});

res.send({
    data
})
}