import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod"
import { ResponseError } from "../error/response-error";

/**
 * A middleware function to handle errors in the application.
 *
 * If the error is a ResponseError, it will return a JSON response with the error message and the status code.
 * If the error is a ZodError, it will return a JSON response with the error message and a 400 status code.
 * If the error is anything else, it will console.error the error and return a JSON response with the message "Internal Server Error" and a 500 status code.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    // console.error(err);
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            message: err.message
        });
    } else if (err instanceof ZodError) {
        res.status(400).json({
            message: err.issues[0].message
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}