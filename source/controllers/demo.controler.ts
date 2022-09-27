import {Request, Response, NextFunction} from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "Hello world!"
    });
};

const getWithTimeout =  async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
    return res.status(200).json({
        message: "Timeout in 3 sec"
    });
}, 3000);
};

export default {getHelloWorld, getWithTimeout};