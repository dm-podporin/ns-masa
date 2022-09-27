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

const getWithDelay =  async (req: Request, res: Response, next: NextFunction) => {
    //Read the delay in seconds from requsted parameters
    const secondsStringParameter: string = req.params.seconds;
    
    if(isNaN(Number(secondsStringParameter))) {
        // //Error response with an error message
        // return res.status(406).json({
        //     error: "Incorrect seconds parameter value"
        // });

        //Error response without a message
        
        return res.sendStatus(406);
    }

    else {
        //All is good
    let delayInSeconds: number = parseInt(req.params.seconds)    
    setTimeout(() => {
    return res.status(200).json({
        message: `Timeout in ${delayInSeconds} seconds`
    });
}, delayInSeconds * 1000);
};
};


export default {getHelloWorld, getWithTimeout, getWithDelay};