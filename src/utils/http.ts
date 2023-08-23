import { ValidationError, Result } from 'express-validator';
import { Request } from 'express';

export const sendHttpResponse = <T = any>(
    isSuccess: boolean,
    error?: Result<ValidationError> | { error: string | any } | null,
    data?: T
) => ({
    status: isSuccess ? 'success' : 'error',
    ...(isSuccess && { data }),
    ...(!isSuccess && { ...error })
})

export interface CustomRequest extends Request {
    userId?: number
    uid?: string
}

export interface Token {
    email: string
    uid: string,
    id: number
}

export { Response, NextFunction } from 'express'

export const getUserId = (req: CustomRequest): number => req?.userId ?? 1