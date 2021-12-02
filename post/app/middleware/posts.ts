import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const createValidationFor = (route: string) => {
    switch (route) {
        case 'posts_put':
            return [
                check('title').matches(/^[A-Za-z\s]+$/).withMessage('Title must be alphabetic.'),
                check('body').matches(/^[A-Za-z\s]+$/).withMessage('Body must be alphabetic.'),
            ];
        case 'posts':
            return [
                check('title').matches(/^[A-Za-z\s]+$/).withMessage('Title must be alphabetic.'),
                check('body').matches(/^[A-Za-z\s]+$/).withMessage('Body must be alphabetic.'),
            ];
        default:
            return [];
    }
}

function checkValidationResult(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.status(422).json({
        method: req.method,
        status: res.statusCode,
        errors: result.array()
    });
}


export default { createValidationFor, checkValidationResult }