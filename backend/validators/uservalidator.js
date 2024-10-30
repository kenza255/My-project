import { body, validationResult } from 'express-validator'

export const registerValidator = [
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('email')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password do not match');
    }
    return true;
        }),
        body('role')
    .isIn(['jobseeker', 'recruiter']).withMessage('Role must be either jobseeker or recruiter'), 
    ];


export const loginValidator = [
    body('email')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Invalid password'),
];