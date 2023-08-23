import { validationResult } from 'express-validator';
import { Request } from 'express';
import { CustomRequest, Response, NextFunction, getUserId } from '../utils/http';

import { PrismaClient } from '@prisma/client'
import { sendHttpResponse } from '../utils/http';


const prisma = new PrismaClient();


export const addMembers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(sendHttpResponse(false, { error: errors.array() }));
    }
    const { owner, member } = req.body;
    const memberRes = await prisma.members.create({
        data: {
            owner_id: owner,
            member_id: member,
            createdBy: getUserId(req)
        }
    })

    if (!memberRes) {
        res.status(500).json(sendHttpResponse(false, { error: member.array() }));
    }

    res.status(201).json(sendHttpResponse(true, null, {
        msg: 'Record created successfully.'
    }));
}
export const addProfile = (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(sendHttpResponse(false, { error: errors.array() }));
    }

}
export const getMembers = async (req: Request, res: Response) => {

    const data = await prisma.members.findMany({
        select: {
            owner_id: true,
            member_id: true,
            user: {
                select: {
                    uid: true,
                    email: true,
                }
            }
        },
        where: {
            owner_id: 1
        }
    });

    res.send({
        data
    })
}