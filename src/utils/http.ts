import {ValidationError,Result} from 'express-validator';

export const sendHttpResponse= <T=any> (
    isSuccess: boolean,
    error?: Result<ValidationError> | {error: string} | null,
    data?: T
    ) => ({
        status: isSuccess? 'success': 'error',
        ...(isSuccess && {data}),
        ...(!isSuccess && {...error})
    })